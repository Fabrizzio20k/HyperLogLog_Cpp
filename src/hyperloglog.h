#ifndef HYPERLOGLOG
#define HYPERLOGLOG

#include <iostream>
#include <vector>
#include <cmath>
#include <bitset>
#include "MurmurHash3.h"

using namespace std;

bitset<32> hash_bin(const string &data)
{
    uint32_t hash;
    MurmurHash3_x86_32(data.c_str(), data.size(), 0, &hash);

    bitset<32> hash_bin(hash);

    return hash_bin;
}

class HyperLogLog
{
private:
    int p;         // Valor de precision de acuerdo al paper
    int m;         // 2^p buckets a crear de acuerdo al paper - cantidad total de buckets
    vector<int> M; // Vector de buckets
    double alpha;  // Valor de correccion de acuerdo al paper

    int get_rho(bitset<32> hash_bin) // Nos da la cantidad de ceros consecutivos antes del primer 1
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
    HyperLogLog(int _p) // Los valores de p van desde 4 hasta 16 segun el paper
    {
        this->p = _p;                // Valor de precision
        this->m = 1 << p;            // 2^p buckets, movemos 1 p veces a la izquierda para obtener el valor de 2^p
        this->M = vector<int>(m, 0); // Inicializamos el vector de buckets con 0

        alpha = (m == 16) ? 0.673 : (m == 32) ? 0.697
                                : (m == 64)   ? 0.709
                                              : 0.7213 / (1 + 1.079 / m); // Valor de correccion de acuerdo al paper

        cout << "p: " << p << endl;
        cout << "m: " << m << endl;
        cout << "alpha: " << alpha << endl;
    }

    double estimate() // Calcula la estimacion de acuerdo al paper
    {
        double Z = 0;
        for (int i = 0; i < m; i++)
        {
            Z += pow(2, -M[i]);
        }

        double E = alpha * m * m / Z;

        if (E <= 5.0 / 2.0 * m) // Pequeño rango de correccion
        {
            int V = countZeroRegisters();
            if (V != 0)
            {
                E = m * log((double)m / (double)V);
            }
        }
        else if (E > 1.0 / 30.0 * pow(2, 32)) // Gran rango de correccion
        {
            E = -pow(2, 32) * log(1 - E / pow(2, 32));
        }

        return E;
    }

    void add(const string &data) // Agrega un elemento al vector de buckets
    {
        bitset<32> hash_final = hash_bin(data);
        uint32_t idx = hash_final.to_ulong() >> (32 - p);           // Tomamos los p bits mas significativos del hash
        uint32_t w = hash_final.to_ulong() & ((1 << (32 - p)) - 1); // Tomamos los 32 - p bits menos significativos del hash
        int rho = get_rho(w);
        M[idx] = max(M[idx], rho);
    }
    void merge(const HyperLogLog &hll) // Mergea dos HyperLogLog
    {
        for (int i = 0; i < m; i++)
        {
            M[i] = max(M[i], hll.M[i]);
        }
    }
};

#endif // !HYPERLOGLOG