"use client"

import './styles.css'
import Circlegraph from '@/components/Circlegraph';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title} from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { createHLL, insertHLL, infoHLL, resetHLL, countHLL, uploadHLLFile, listCSVFiles, countCSVHLL, countCSVCompare } from './functions';
import { Suspense } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: false,
    },
  },
};

const labels = ['HyperLogLog', 'Hash Table', 'AVL Tree'];

export default function Page() {

    //values to send to backend
    const [operationType, setOperation] = useState('new_hll');
    const [selectedP, setSelectedP] = useState(4);
    const [value, setValue] = useState("");
    const [upload, setUpload] = useState(false);
    const [filesList, setFilesList] = useState([]);
    const [selectedFile, setSelectedFile] = useState("MOCK_DATA.csv");
    const [column, setColumn] = useState("email");
    const [isCreated, setCreated] = useState(false);
    const [isPossibleCount, setPossibleCount] = useState(false);
    const [isLoading, setLoading] = useState(false);

    // States
    const [P, setP] = useState(4);
    const [M, setM] = useState(0.0);
    const [Alpha, setAlpha] = useState(0.0);
    const [MemoryHLL, setMemoryHLL] = useState(0.0);
    const [InsertedElements, setInsertedElements] = useState(0);
    const [Precision, setPrecision] = useState(0.0);
    const [TimeHLL, setTimeHLL] = useState(0.0);
    const [CountHLL, setCountHLL] = useState(0.0);
    const [CountVector, setCountVector] = useState(0.0);
    const [CountSet, setCountSet] = useState(0.0);
    const [MemoryVector, setMemoryVector] = useState(0.0);
    const [MemorySet, setMemorySet] = useState(0.0);
    const [TimeAVL, setTimeAVL] = useState(0.0);
    const [TimeHash, setTimeHash] = useState(0.0);

    //main data
    const mainHLLData={
      hll:{
        p: P,
        m: M,
        alpha: Alpha,
        memory: MemoryHLL,
        insertedElements: InsertedElements,
        count_hll: CountHLL,
        time_hll: TimeHLL,
        precision: Precision,
      },
      comparative:{
        memory_set: MemorySet,
        memory_vector: MemoryVector,
        count_set: CountSet,
        count_vector: CountVector,
        time_avl: TimeAVL,
        time_hash: TimeHash,
      },
    }

    //data for graphics
    const dataMemory = {
      labels,
      datasets: [
        {
          label: 'Memory (Kb)',
          data: [mainHLLData.hll.memory, mainHLLData.comparative.memory_vector, mainHLLData.comparative.memory_set],
          backgroundColor: [
            'rgba(0, 195, 255, 0.2)',
            'rgba(0, 255, 21, 0.2)',
            'rgba(255, 0, 234, 0.2)',
          ],
          borderColor: [
            'rgba(0, 183, 255, 1)',
            'rgba(0, 255, 21, 1)',
            'rgba(255, 0, 234, 1)',
          ],
          borderWidth: 2,
        },
      ],
    };
    
    const dataTime = {
      labels,
      datasets: [
        {
          label: 'Execution time (ms)',
          data: [mainHLLData.hll.time_hll,mainHLLData.comparative.time_hash,mainHLLData.comparative.time_avl],
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    };

    async function uploadCSV(event) {
        const selectedFile = event.target.files[0];

        const formData = new FormData();

        formData.append("file", selectedFile);

        const data = await uploadHLLFile(formData);

        if (data) {
          if (data.status === "success") {

            setUpload(true);
            
            const dataFiles = await getCSVFiles();
            if (dataFiles){
              setFilesList(dataFiles);
            }
    
            setTimeout(() => {
              setUpload(false);
            }, 3000);
          }
        }
    }

    async function getCSVFiles() {
      const data = await listCSVFiles();
      if (data){
        return data.files;
      }
      return [];
    }

    function operationHLL(type) {
      return async () => {
        
        let data = null;

        if (type === "create") {
          setLoading(true);
          data = await createHLL(selectedP);
          setCreated(true);
          setLoading(false);
        } else if (type === "insert") {
          setLoading(true);
          data = await insertHLL(value);
          setPossibleCount(true);
          setLoading(false);
        } else if (type === "info") {
          setLoading(true);
          data = await infoHLL();
          setLoading(false);
        } else if (type === "count"){
          setLoading(true);
          data = await countHLL();
          setLoading(false);
        } else if (type === "reset"){
          setLoading(true);
          data = await resetHLL();
          setCreated(false);
          setPossibleCount(false);
          setOperation("new_hll");
          setLoading(false);
          return;
        } else if (type === "csv_hll"){
          setLoading(true);
          data = await countCSVHLL(selectedFile, column);
          setPossibleCount(false);
          setLoading(false);
        } else {
          setLoading(true);
          data = await countCSVCompare(selectedFile, column);
          setPossibleCount(false);
          setLoading(false);
        }

        if (type !== "count" && type !== "csv_hll" && type !== "comparative") {
          setP(data.info_hll.p);
          setM(data.info_hll.m);
          setAlpha(data.info_hll.alpha);
          setMemoryHLL(data.info_hll.memory_kb);
          setInsertedElements(data.info_hll.total_inserted_elements);
        }
        
        else{
          setP(data.hll.info_hll.p);
          setM(data.hll.info_hll.m);
          setAlpha(data.hll.info_hll.alpha);
          setMemoryHLL(data.hll.info_hll.memory_kb);
          setInsertedElements(data.hll.info_hll.total_inserted_elements);
          setCountHLL(data.hll.count_hll);
          setTimeHLL(data.hll.time_hll);
        }

        if (type !== "csv_hll" && type !== "create" && type !== "insert" && type !== "info" && type !== "reset"){
          setPrecision(data.hll.precision.toFixed(2));
          setCountVector(data.comparative.info_comp.values_vector);
          setCountSet(data.comparative.info_comp.values_set);
          setMemoryVector(data.comparative.info_comp.memory_vector_kb);
          setMemorySet(data.comparative.info_comp.memory_set_kb);
        }

        if (type === "comparative"){
          setTimeAVL(data.comparative.time_set);
          setTimeHash(data.comparative.time_vector);
        }

        setOperation(type);

      } 
    }

    useEffect(() => {
      async function setFilesArray(){
        const data = await getCSVFiles();
        if (data){
          setFilesList(data);
        }
      }
      setFilesArray();
    }, []);

    return (
        <div className='playground-page'>
            <div className='control-panel'>
              <h1>Create a new HLL object here 📝</h1>
              <div className='new-hll'>
                <h2>Select value for &quot;P&quot; (accuracy value) ➡️ </h2>
                <select name="p" id="p" value={selectedP} onChange={(e) => setSelectedP(e.target.value)}>
                  {[4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((value) => (
                    <option key={value} value={value}>{value}</option>
                  ))}
                  </select>
              </div>
              <div className='create-controls'>
                  <button type="button" onClick={operationHLL('create')}>Create</button>
              </div>

              <div className={`after-create ${isCreated ? "":"nonactive"}`}> 
                <h1>Insert elements to HLL here ⚡</h1>
                <div className='new-hll'>
                  <h2>Write any value to insert ➡️ </h2>
                  <input
                    type="text"
                    name="insert"
                    id="insert"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                  />
                </div>
                <div className='create-controls skyblue'>
                    <button type="button" onClick={operationHLL('insert')}>Insert</button>
                </div>

                <h1>Get information about your HLL object here 📢</h1>
                <div className='create-controls yellow'>
                    <button type="button" onClick={operationHLL('info')}>Get it</button>
                </div>
                
                <h1 className={`${mainHLLData.hll.insertedElements > 0 && isPossibleCount === true ? "":"nonactive"}`}>Count the elements of your HLL here ✨</h1>
                <div className={`create-controls purple ${mainHLLData.hll.insertedElements > 0 && isPossibleCount === true ? "":"nonactive"}`}>
                    <button type="button" onClick={operationHLL('count')}>Count now</button>
                </div>

                <h1>Upload a new .csv file to count different elements from that here 📄</h1>
                <div className='create-controls green'>
                  <input type="file" id="file" name="file" accept=".csv" onChange={uploadCSV} />
                  <label htmlFor="file" id="file-label">Upload csv</label>
                  <span className={`selected-file-name ${upload ? "" : "nonupload"}`}>
                    {upload ? "The file was uploaded successfully" : "Any .csv file uploaded yet"}
                  </span>
                </div>

                <h1>Or select a .csv File from our repository, select a Column Name and see the magic here 🔥</h1>
                <div className='new-hll'>
                  <h2>Select a &quot;.csv&quot; file ➡️ </h2>
                  <select name="file" id="file" value={selectedFile} onChange={(e) => setSelectedFile(e.target.value)}>
                    {filesList.map((value) => (
                      <option key={value} value={value}>{value}</option>
                    ))}
                    </select>
                </div>
                <div className='new-hll'>
                  <h2>Write the name of the column ➡️ </h2>
                  <input
                    className='green-input'
                    type="text"
                    name="insert"
                    id="insert"
                    value={column}
                    onChange={(e) => setColumn(e.target.value)}
                  />
                </div>
                <div className='create-controls'>
                    <button type="button" onClick={operationHLL('csv_hll')}>Count HLL</button>
                </div>
                
                <div className='create-controls'>
                  <button type="button" onClick={operationHLL('comparative')}>Compare count</button>
                </div>

                <h1>Reset your HLL here 🫧</h1>
                <div className='create-controls red'>
                    <button type="button" onClick={operationHLL('reset')}>Reset now</button>
                </div>
              </div>
            </div>

            <div className='graphic-panel'>
              <div className={`loader ${isLoading ? "":"nonactive"}`}>
                <div id="preloader">
                  <div id="loader"></div>
                </div>
              </div>
              <div className={`content ${isLoading ? "nonactive":""}`}>
                <div className={`create ${(operationType === "new_hll") ? "":"nonactive"}`}>
                    <h1>Nothing here ツ. Why don&apos;t you start by creating a new HLL?</h1>
                    <br/>
                    <div className='create-content'>
                      <br/><br/>
                        <Image 
                          src='/new_file.png'
                          alt='structure'
                          width={200}
                          height={200}
                        />
                    </div>

                  </div>

                <div className={`create ${(operationType === "create") ? "":"nonactive"}`}>
                  <h1>The HyperLogLog Structure was created successfully !!!</h1>
                  <br/>
                  <div className='create-content'>
                    <h1>HyperLogLog features:</h1>

                    <div className='features'>
                      <h2>➡️ P (accuracy value) : {mainHLLData.hll.p}</h2>
                      <h2>➡️ M (number of buckets) : {mainHLLData.hll.m}</h2>
                      <h2>➡️ Alpha (bias correction factor) : {mainHLLData.hll.alpha}</h2>
                      <h2>➡️ Memory : {mainHLLData.hll.memory} Kb</h2>
                      <h2>➡️ Inserted elements: {mainHLLData.hll.insertedElements}</h2>
                    </div>
                    <br/><br/>
                      <Image 
                        src='/structure.png'
                        alt='structure'
                        width={300}
                        height={300}
                      />
                  </div>
                </div>

                <div className={`insert ${(operationType === "insert") ? "":"nonactive"}`}>
                  <h1>The element was inserted to HLL successfully !!!</h1>
                    <br/>
                    <div className='create-content'>
                      <h1>HLL information:</h1>

                      <div className='features'>
                        <h2>➡️ P (accuracy value) : {mainHLLData.hll.p}</h2>
                        <h2>➡️ M (number of buckets) : {mainHLLData.hll.m}</h2>
                        <h2>➡️ Alpha (bias correction factor) : {mainHLLData.hll.alpha}</h2>
                        <h2>➡️ Memory : {mainHLLData.hll.memory} Kb</h2>
                        <h2>➡️ Inserted elements: {mainHLLData.hll.insertedElements}</h2>
                      </div>
                        <br/><br/>
                        <Image 
                          src='/insert.png'
                          alt='structure'
                          width={300}
                          height={300}
                        />
                    </div>
                </div>

                <div className={`info ${(operationType === "info") ? "":"nonactive"}`}>
                  <h1>HyperLogLog main information for everyone</h1>
                    <br/>
                    <div className='create-content'>
                      <h1>HLL information:</h1>
                        <div className='features'>
                          <h2>➡️ P (accuracy value) : {mainHLLData.hll.p}</h2>
                          <h2>➡️ M (number of buckets) : {mainHLLData.hll.m}</h2>
                          <h2>➡️ Alpha (bias correction factor) : {mainHLLData.hll.alpha}</h2>
                          <h2>➡️ Memory : {mainHLLData.hll.memory} Kb</h2>
                          <h2>➡️ Inserted elements: {mainHLLData.hll.insertedElements}</h2>
                        </div>
                        <br/><br/>
                        <Image 
                          src='/information.png'
                          alt='structure'
                          width={450}
                          height={300}
                        />
                    </div>
                </div>

                <div className={`reset ${(operationType === "reset") ? "":"nonactive"}`}>
                  <h1>HyperLogLog was restored successfully !!!</h1>
                    <br/>
                    <div className='create-content'>
                      <h1>HLL information:</h1>

                      <div className='features'>
                        <h2>➡️ P (accuracy value) : {mainHLLData.hll.p}</h2>
                        <h2>➡️ M (number of buckets) : {mainHLLData.hll.m}</h2>
                        <h2>➡️ Alpha (bias correction factor) : {mainHLLData.hll.alpha}</h2>
                        <h2>➡️ Memory : {mainHLLData.hll.memory} Kb</h2>
                        <h2>➡️ Inserted elements: {mainHLLData.hll.insertedElements}</h2>
                      </div>
                        <br/><br/>
                        <Image 
                          src='/restore.png'
                          alt='structure'
                          width={350}
                          height={350}
                        />
                    </div>
                </div>

                <div className={`count ${(operationType === "count") ? "":"nonactive"}`}>
                    <h3>Total elements inserted: {mainHLLData.hll.insertedElements}</h3>
                    <h3>Total different elements inserted: {mainHLLData.comparative.count_set}</h3>
                    <h1>⬇️ Total count of HyperLogLog ⬇️</h1>
                    <h1>👉🏻 {mainHLLData.hll.count_hll} elements</h1>
                    <Circlegraph percentage={mainHLLData.hll.precision} color={"skyblue"} message = {`${mainHLLData.hll.precision}% accuracy compared to <Hash Table> and <AVL Tree> structures`}/>
                    <br/><br/>
                    <h1>👾 Memory used (kb) 👾</h1>
                    <div className='graph-1'>
                        <Doughnut data={dataMemory} />
                    </div>
                    <br/>
                    <h3>👾 Memory used (HLL) 👾 👉🏻 {mainHLLData.hll.memory} kb</h3>
                    <h3>👾 Memory used (Hash Table) 👾 👉🏻 {mainHLLData.comparative.memory_vector} kb</h3>
                    <h3>👾 Memory used (AVL Tree) 👾 👉🏻 {mainHLLData.comparative.memory_set} kb</h3>
                    <br/><br/>
                    <h1>⏱️ Execution time (HLL)⏱️</h1>
                    <h1>👉🏻 {mainHLLData.hll.time_hll} ms</h1>
                </div>

                <div className={`count ${(operationType === "csv_hll") ? "":"nonactive"}`}>
                  <h1>HyperLogLog CSV-Insertion</h1>
                  <br/>
                  <h1>⬇️ Total count of HyperLogLog ⬇️</h1>
                    <h1>👉🏻 {mainHLLData.hll.count_hll} elements</h1>
                      
                      <div className='create-content'>
                        <h1>HLL information:</h1>

                        <div className='features'>
                          <h2>➡️ P (accuracy value) : {mainHLLData.hll.p}</h2>
                          <h2>➡️ M (number of buckets) : {mainHLLData.hll.m}</h2>
                          <h2>➡️ Alpha (bias correction factor) : {mainHLLData.hll.alpha}</h2>
                          <h2>➡️ Memory : {mainHLLData.hll.memory} Kb</h2>
                          <h2>➡️ Inserted elements: {mainHLLData.hll.insertedElements}</h2>
                        </div>
                      </div>
                    
                    <h1>⏱️ Execution time (HLL)⏱️</h1>
                    <h1>👉🏻 {mainHLLData.hll.time_hll} ms</h1>

                    <br/><br/>
                          <Image 
                            src='/csv_logo.png'
                            alt='structure'
                            width={300}
                            height={300}
                          />
                </div>

                <div className={`comparative ${(operationType === "comparative") ? "":"nonactive"}`}>
                    <h3>Total elements inserted: {mainHLLData.hll.insertedElements}</h3>
                    <h3>Total different elements inserted: {mainHLLData.comparative.count_set}</h3>
                    <h1>⬇️ Total count of HyperLogLog ⬇️</h1>
                    <h1>👉🏻 {mainHLLData.hll.count_hll} elements</h1>
                    <Circlegraph percentage={mainHLLData.hll.precision} color={"skyblue"} message = {`${mainHLLData.hll.precision}% accuracy compared to <Hash Table> and <AVL Tree> structures`}/>
                    <br/><br/>
                    <h1>👾 Memory used (kb) 👾</h1>
                    <div className='graph-1'>
                        <Doughnut data={dataMemory} />
                    </div>
                    <br/>
                    <h3>👾 Memory used (HLL) 👾 👉🏻 {mainHLLData.hll.memory} kb</h3>
                    <h3>👾 Memory used (Hash Table) 👾 👉🏻 {mainHLLData.comparative.memory_vector} kb</h3>
                    <h3>👾 Memory used (AVL Tree) 👾 👉🏻 {mainHLLData.comparative.memory_set} kb</h3>
                    <br/><br/><br/>
                    <h1>⏱️ Execution time (ms) ⏱️</h1>
                    <Suspense fallback={<div>Loading...</div>}>
                      <div className='graph-1'>
                        <Bar options={options} data={dataTime} />
                      </div>
                    </Suspense>

                    <br/><br/>
                    <h3>⏱️ Execution time (HLL) ⏱️ 👉🏻 {mainHLLData.hll.time_hll} ms</h3>
                    <h3>⏱️ Execution time (Hash Table) ⏱️ 👉🏻 {mainHLLData.comparative.time_hash} ms</h3>
                    <h3>⏱️ Execution time (AVL Tree) ⏱️ 👉🏻 {mainHLLData.comparative.time_avl} ms</h3>
                </div>
              </div>
            </div>
        </div>
    );
}