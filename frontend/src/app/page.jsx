"use client"

import './Content.css'
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Page() {

    const router = useRouter();

    const goToInformation = () => {
        router.push('/information');
    }

    return (
        <div className="mainInformation">
            <Image src="/hll_logo.png" alt="logo" width={500} height={500} className='img2'/>
            <h1>HyperLogLog C++</h1>
            <p>
                This is one of the best implementations of HyperLogLog structure, 
                based on the paper <strong>&quot;HyperLogLog: the analysis of a near-optimal cardinality estimation algorithm&quot; by Philippe Flajolet, 
                Éric Fusy, Olivier Gandouet and Frédéric Meunier. </strong>

                Also, part of the code is based on the original algorithm of the paper
                <strong> &quot;HyperLogLog in Practice: Algorithmic Engineering of a State of The Art Cardinality Estimation Algorithm&quot; 
                by Stefan Heule, Marc Nunkesser and Alexander Hall.</strong>
                 
                <br></br><br></br>

                Anyways, if you want to know more about the algorithm, you can go to the information page, of if
                you want to try it, you can go to the playground page.
            </p>

            <div className="links">
                <button className="custom-button" onClick={goToInformation}>Get started now!</button>
            </div>


        </div>
    );
}