#ifndef HYPERLOGLOG
#define HYPERLOGLOG

#include <iostream>
#include <vector>
#include <cmath>
#include <bitset>
#include <fstream>
#include <sstream>
#include <type_traits>
#include "MurmurHash3/MurmurHash3.h"
#include <map>
#include <chrono>

using namespace std;

class HyperLogLog
{
private:
    int p;         // Valor de precision de acuerdo al paper
    int m;         // 2^p buckets a crear de acuerdo al paper - cantidad total de buckets
    vector<int> M; // Vector de buckets
    double alpha;  // Valor de correccion de acuerdo al paper

    long long total_inserted_elements;

    static int get_rho(bitset<32> hash_bin) // Nos da la cantidad de ceros consecutivos antes del primer 1
    {
        int rho = 0;
        for (int i = 0; i < 32; i++)
        {
            if (hash_bin[i] == 0)
            {
                rho++;
            }
            else
            {
                break;
            }
        }
        return rho;
    }

    int countZeroRegisters() // Cuenta la cantidad de buckets con valor 0
    {
        int count = 0;
        for (int i = 0; i < m; i++)
        {
            if (M[i] == 0)
            {
                count++;
            }
        }
        return count;
    }

    double linearCounting() // Calcula el valor de correccion de acuerdo al paper
    {
        return m * log((double)m / (double)countZeroRegisters());
    }

public:
    explicit HyperLogLog(int _p = 4) // Los valores de p van desde 4 hasta 16 segun el paper
    {
        if (_p < 4 || _p > 16){
            throw invalid_argument("El valor de p debe estar entre 4 y 16");
        }
        this->p = _p;                // Valor de precision
        this->m = 1 << p;            // 2^p buckets, movemos 1 p veces a la izquierda para obtener el valor de 2^p
        this->M = vector<int>(m, 0); // Inicializamos el vector de buckets con 0
        this->total_inserted_elements = 0; // Inicializamos la cantidad de elementos insertados, no es necesario incluir esto

        alpha = (m == 16) ? 0.673 : (m == 32) ? 0.697
                                              : (m == 64)   ? 0.709
                                                            : 0.7213 / (1 + 1.079 / m); // Valor de correccion de acuerdo al paper
    }

    map<string, double> count() // Calcula la estimacion de acuerdo al paper
    {
        chrono::high_resolution_clock::time_point start_time;
        chrono::high_resolution_clock::time_point end_time;

        start_time = std::chrono::high_resolution_clock::now();

        double Z = 0;
        for (int i = 0; i < m; i++)
        {
            Z += pow(2, -M[i]);
        }

        double E = alpha * m * m / Z;

        if (E <= (5.0 / 2.0) * m) // Pequeño rango de correccion
        {
            int V = countZeroRegisters();
            if (V != 0)
            {
                E = linearCounting();
            }
        }
        else if (E > (1.0 / 30.0) * pow(2, 32)) // Gran rango de correccion
        {
            E = -pow(2, 32) * log(1 - E / pow(2, 32));
        }

        end_time = std::chrono::high_resolution_clock::now();

        chrono::duration<double, milli> duration = end_time - start_time;

        double elapsed_milliseconds = duration.count();

        map <string, double> result;

        result["count"] = E * 2;
        result["time"] = elapsed_milliseconds;

        return result;
    }

    void insert(const string &data) // Agrega un elemento al vector de buckets
    {
        uint32_t hash;
        MurmurHash3_x86_32(data.c_str(), data.size(), 313, &hash);

        uint32_t idx = hash >> (32 - p);           // Tomamos los p bits mas significativos del hash
        uint32_t w = hash & ((1 << (32 - p)) - 1); // Tomamos los 32 - p bits menos significativos del hash
        int rho = get_rho(w);
        M[idx] = max(M[idx], rho);

        total_inserted_elements++;
    }

    void merge(const HyperLogLog &hll) // Mergea dos HyperLogLog
    {
        if (hll.p != p)
        {
            throw invalid_argument("Los valores de p deben ser iguales");
        }

        for (int i = 0; i < m; i++)
        {
            M[i] = max(M[i], hll.M[i]);
        }

        total_inserted_elements += hll.total_inserted_elements;
    }

    void clear() // Limpia el vector de buckets
    {
        for (int i = 0; i < m; i++)
        {
            M[i] = 0;
        }

        total_inserted_elements = 0;
    }

    void count_from_csv(const string& nombreArchivo, const string& nombreColumna){

        clear();

        ifstream archivo(nombreArchivo);
        if (!archivo.is_open()) {
            cout << "No se pudo abrir el archivo" << std::endl;
            return;
        }

        string linea;
        getline(archivo, linea);
        istringstream ss(linea);

        vector<string> encabezados;
        string encabezado;
        while (std::getline(ss, encabezado, ',')) {
            encabezados.push_back(encabezado);
        }

        int indiceColumna = -1;
        for (int i = 0; i < encabezados.size(); i++) {
            if (encabezados[i] == nombreColumna) {
                indiceColumna = i;
                break;
            }
        }

        if (indiceColumna == -1) {
            cout << "No se encontró la columna" << std::endl;
            return;
        }

        while (getline(archivo, linea)) {
            istringstream ss_2(linea);
            string valor;
            for (int i = 0; i <= indiceColumna; i++) {
                getline(ss_2, valor, ',');
            }
            insert(valor);
        }

        archivo.close();

    }

    [[nodiscard]] map<string,string> get_info_structure() const{
        map<string,string> info;
        info["p"] = to_string(p);
        info["m"] = to_string(m);
        info["alpha"] = to_string(alpha);
        info["total_inserted_elements"] = to_string(total_inserted_elements);
        return info;
    }
};

#endif // HYPERLOGLOG
