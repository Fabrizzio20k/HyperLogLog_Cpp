"use client"

import './styles.css'
import Circlegraph from '@/components/Circlegraph';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title } from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title);

export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };

const labels = ['HyperLogLog', 'Vector', 'Set'];


export default function Page() {

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

    return (
        <div className='playground-page'>
            <div className='control-panel'>
                <h1>Hello world</h1>
                <h1>Hello world aassa as sa sa as as as as sasa</h1>
            </div>
            <div className='graphic-panel'>
                <div className='comparative'>
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