"use client"

import './styles.css'
import Circlegraph from '@/components/Circlegraph';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title } from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';
import { useState } from 'react';
import Image from 'next/image';
import { createHLL, insertHLL, infoHLL } from './functions';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title);

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

const labels = ['HyperLogLog', 'Vector', 'Set'];

const dataMemory = {
  labels,
  datasets: [
    {
      label: 'Memory(kb)',
      data: [697.5, 6543.32, 2435.32],
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
      data: [434.52,360000.32,1423.42],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
};



export default function Page() {

    const [operationType, setOperation] = useState('new_hll');
    const [selectedP, setSelectedP] = useState(4);

    // States
    const [P, setP] = useState(4);
    const [M, setM] = useState(0.0);
    const [Alpha, setAlpha] = useState(0.0);
    const [MemoryHLL, setMemoryHLL] = useState(0.0);
    const [InsertedElements, setInsertedElements] = useState(0);

    //value
    const [value, setValue] = useState("");


    const mainHLLData={
      hll:{
        p: P,
        m: M,
        alpha: Alpha,
        memory: MemoryHLL,
        insertedElements: InsertedElements,
      },
      comparative:{
        memory_set: 697.5,
      },
    }

    function operationHLL(type) {
      return async () => {
        
        let data = null;

        if (type === "create") {
          data = await createHLL(selectedP);
        } else if (type === "insert") {
          data = await insertHLL(value);
        } else if (type === "info") {
          data = await infoHLL();
        }

        setP(data.info_hll.p);
        setM(data.info_hll.m);
        setAlpha(data.info_hll.alpha);
        setMemoryHLL(data.info_hll.memory_kb);
        setInsertedElements(data.info_hll.total_inserted_elements);
        setOperation(type);
      }
    }

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


            </div>

            <div className='graphic-panel'>
              <div className={`create ${(operationType === "new_hll") ? "":"nonactive"}`}>
                  <h1>Nothing here ツ. Why don&apos;t you start by creating a new HLL?</h1>
                  <br/>
                  <div className='create-content'>
                    <br/><br/>
                      <Image 
                        src='/new_file.png'
                        alt='structure'
                        width={300}
                        height={300}
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
                      <div className='features'>
                        <h2>➡️ P (accuracy value) : {mainHLLData.hll.p}</h2>
                        <h2>➡️ M (number of buckets) : {mainHLLData.hll.m}</h2>
                        <h2>➡️ Alpha (bias correction factor) : {mainHLLData.hll.alpha}</h2>
                        <h2>➡️ Memory : {mainHLLData.hll.memory} Kb</h2>
                        <h2>➡️ Inserted elements: {mainHLLData.hll.insertedElements}</h2>
                      </div>
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

              <div className='reset nonactive'>
                <h1>HyperLogLog was restored successfully !!!</h1>
                  <br/>
                  <div className='create-content'>
                    <h1>HLL information:</h1>

                    <div className='features'>
                      <h2>➡️ P (accuracy value) : 4</h2>
                      <h2>➡️ M (number of buckets) : 32</h2>
                      <h2>➡️ Alpha (bias correction factor) : 0.673</h2>
                      <h2>➡️ Memory : 233.18 Kb</h2>
                      <h2>➡️ Inserted elements: 0</h2>
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

              <div className='count nonactive'>
                  <h3>Total count of elements: 1</h3>
                  <h1>⬇️ Total count of HyperLogLog ⬇️</h1>
                  <h1>👉🏻 99872.423 elements</h1>
                  <Circlegraph percentage={0.45} color={"skyblue"} message = {`${0.45}% accuracy compared to <vector> and <set> structures`}/>
                  <br/><br/>
                  <h1>👾 Memory used (kb) 👾</h1>
                  <div className='graph-1'>
                      <Doughnut data={dataMemory} />
                  </div>
                  <br/><br/>
                  <h1>⏱️ Execution time (HLL)⏱️</h1>
                  <h1>👉🏻 0.52 ms</h1>
              </div>

              <div className='count-hll nonactive'>
                <h1>HyperLogLog CSV-Insertion</h1>
                <br/>
                <h1>⬇️ Total count of HyperLogLog ⬇️</h1>
                  <h1>👉🏻 99872.423 elements</h1>
                    
                    <div className='create-content'>
                      <h1>HLL information:</h1>

                      <div className='features'>
                        <h2>➡️ P (accuracy value) : 4</h2>
                        <h2>➡️ M (number of buckets) : 32</h2>
                        <h2>➡️ Alpha (bias correction factor) : 0.673</h2>
                        <h2>➡️ Memory : 233.18 Kb</h2>
                        <h2>➡️ Inserted elements: 109090</h2>
                      </div>
                    </div>
                  
                  <h1>⏱️ Execution time (HLL)⏱️</h1>
                  <h1>👉🏻 0.52 ms</h1>

                  <br/><br/>
                        <Image 
                          src='/csv_logo.png'
                          alt='structure'
                          width={300}
                          height={300}
                        />
              </div>

              <div className='comparative nonactive'>
                  <h3>Total count of elements: 100000</h3>
                  <h1>⬇️ Total count of HyperLogLog ⬇️</h1>
                  <h1>👉🏻 99872.423 elements</h1>
                  <Circlegraph percentage={79.82} color={"skyblue"} message = {`${79.82}% accuracy compared to <vector> and <set> structures`}/>
                  <br/><br/>
                  <h1>👾 Memory used (kb) 👾</h1>
                  <div className='graph-1'>
                      <Doughnut data={dataMemory} />
                  </div>
                  <br/><br/>
                  <h1>⏱️ Execution time (ms) ⏱️</h1>
                  <div className='graph-1'>
                      <Line options={options} data={dataTime} />;
                  </div>
              </div>
            </div>
        </div>
    );
}