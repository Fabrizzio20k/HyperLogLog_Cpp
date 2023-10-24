import "./styles.css";
import Image from "next/image";

export default function Page() {
  return (
    <div className="main-content">
        
      <h1>HyperLogLog: Una Introducción</h1>

      <p>HyperLogLog es un algoritmo de estimación de cardinalidad utilizado en análisis de datos para contar la cantidad de elementos distintos en un conjunto de datos grande, en tiempo y espacio sublineales. Su eficiencia lo convierte en una herramienta valiosa para el análisis de datos a gran escala.</p>

      <h2>Complejidades Temporales y Espaciales</h2>

      <h3>Complejidad Temporal</h3>
      <p>La complejidad temporal de HyperLogLog es notablemente baja. El proceso de conteo de elementos distintos en un conjunto de datos se realiza en un tiempo constante O(1), independientemente del tamaño del conjunto. Esto lo hace extremadamente eficiente en términos de tiempo de ejecución.
        Esto es posible gracias a la forma en que HyperLogLog estima la cardinalidad. En lugar de contar cada elemento único en el conjunto de datos (lo cual tendría una complejidad temporal de O(n), donde n es el número de elementos en el conjunto), HyperLogLog utiliza una técnica probabilística. Crea un número pequeño y fijo de contadores y utiliza información sobre los datos de entrada para incrementar estos contadores. Luego, utiliza estos contadores para estimar la cardinalidad total.
        Debido a que el número de contadores es fijo y no depende del tamaño de los datos de entrada, el tiempo que toma actualizar estos contadores y calcular la estimación es constante, es decir, O(1). Esto hace que HyperLogLog sea extremadamente eficiente para estimar la cardinalidad de conjuntos de datos muy grandes
      </p>

      <h3>Complejidad Espacial</h3>
      <p>HyperLogLog también destaca en cuanto a complejidad espacial. Requiere un espacio constante O(log log n), donde &apos;n&apos; es el número de elementos distintos que se están contando. 
        Esto significa que el consumo de memoria es mínimo en comparación con otros métodos de conteo de cardinalidad, como el almacenamiento directo de los elementos.
      El número de contadores que utiliza HyperLogLog es proporcional a 2^m, donde m es el número de bits utilizados para el almacenamiento en el algoritmo. 
      Dado que m es un parámetro fijo, el número total de contadores (y por lo tanto, la cantidad total de memoria utilizada) no crece con el tamaño del conjunto de datos. 
      Sin embargo, dado que cada contador puede tener un valor máximo de log_2(n), donde n es el número total de elementos únicos en el conjunto de datos, la cantidad total de memoria necesaria para almacenar los contadores crece logarítmicamente con el logaritmo del tamaño del conjunto de datos. 
      Por lo tanto, la complejidad espacial del algoritmo HyperLogLog es O(log log n).
      </p>

      <h2>Fórmulas y Cálculos</h2>
      <p>El funcionamiento interno de HyperLogLog se basa en el uso de funciones de hash no correlacionadas y una técnica llamada &quot;agregación geométrica&quot;. Para estimar la cardinalidad, se siguen estos pasos:</p>

      <p>La fórmula para estimar la cardinalidad es la siguiente:</p>
        <center>      
            <Image 
            src='/f1.png'
            alt="Fórmula 1"
            width={380}
            height={100}
            />
      </center>

        
      <p>Donde:</p>
      <ul>
        <li>&apos;m&apos; es el número de registros en la estructura de datos HyperLogLog.</li>
        <li>&apos;M[i]&apos; es el valor máximo de los ceros consecutivos en el hash del elemento &apos;i&apos;.</li>
        <li>Ademas el parametro de normalización se define por: </li>
        <Image
        src='/f2.png'
        alt="Fórmula 2"
        width={630}
        height={100}
        />
      </ul>

      <h2>Implementaciones</h2>
      <p>HyperLogLog tiene varias implementaciones en diferentes lenguajes de programación. Algunas de las implementaciones populares incluyen:</p>

      <ul>
        <li><strong>HyperLogLog++</strong>: Una mejora del algoritmo original que proporciona una mayor precisión en la estimación de la cardinalidad.</li>
        <li><strong>Redis HyperLogLog</strong>: Redis, una popular base de datos en memoria, implementa HyperLogLog como una estructura de datos nativa.</li>
        <li><strong>Apache HLL</strong>: Una implementación de HyperLogLog utilizada en el ecosistema de Big Data de Apache.</li>
      </ul>

      <h2>Conclusiones</h2>
      <p>HyperLogLog es una herramienta esencial en análisis de datos a gran escala debido a su eficiencia en tiempo y espacio. Al comprender sus complejidades temporales y espaciales, así como las fórmulas y las implementaciones disponibles, puedes utilizarlo efectivamente para estimar la cardinalidad de conjuntos de datos masivos.</p>
    </div>
  );
}
