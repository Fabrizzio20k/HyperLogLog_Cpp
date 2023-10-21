"use client"

import './styles.css'
import Circlegraph from '@/components/Circlegraph';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title } from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';
import Image from 'next/image';

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

const data = {
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

const data2 = {
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

const operation_type = "create";

export default function Page() {

    return (
        <div className='playground-page'>
            <div className='control-panel'>
              <h1>Hello world</h1>
              <h1>Hello world aassa as sa sa as as as as sasa</h1>
            </div>
            <div className='graphic-panel'>
              <div className='create'>
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

              <div className='create nonactive'>
                <h1>The HyperLogLog Structure was created successfully !!!</h1>
                <br/>
                <div className='create-content'>
                  <h1>HyperLogLog features:</h1>

                  <div className='features'>
                    <h2>➡️ P (accuracy value) : 4</h2>
                    <h2>➡️ M (number of buckets) : 32</h2>
                    <h2>➡️ Alpha (bias correction factor) : 0.673</h2>
                    <h2>➡️ Memory : 233.18 Kb</h2>
                    <h2>➡️ Inserted elements: 0</h2>
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

              <div className='insert nonactive'>
                <h1>The element was inserted to HLL successfully !!!</h1>
                  <br/>
                  <div className='create-content'>
                    <h1>HLL information:</h1>

                    <div className='features'>
                      <h2>➡️ P (accuracy value) : 4</h2>
                      <h2>➡️ M (number of buckets) : 32</h2>
                      <h2>➡️ Alpha (bias correction factor) : 0.673</h2>
                      <h2>➡️ Memory : 233.18 Kb</h2>
                      <h2>➡️ Inserted elements: 1</h2>
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

              <div className='info nonactive'>
                <h1>HyperLogLog main information for everyone</h1>
                  <br/>
                  <div className='create-content'>
                    <h1>HLL information:</h1>

                    <div className='features'>
                      <h2>➡️ P (accuracy value) : 4</h2>
                      <h2>➡️ M (number of buckets) : 32</h2>
                      <h2>➡️ Alpha (bias correction factor) : 0.673</h2>
                      <h2>➡️ Memory : 233.18 Kb</h2>
                      <h2>➡️ Inserted elements: 1</h2>
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
                      <Doughnut data={data} />
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
                      <Doughnut data={data} />
                  </div>
                  <br/><br/>
                  <h1>⏱️ Execution time (ms) ⏱️</h1>
                  <div className='graph-1'>
                      <Line options={options} data={data2} />;
                  </div>
              </div>
            </div>
        </div>
    );
}