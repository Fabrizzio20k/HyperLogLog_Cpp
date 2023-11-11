#ifndef HYPERLOGLOG_CPP_COMPARATIVE_H
#define HYPERLOGLOG_CPP_COMPARATIVE_H

#include <string>
#include <map>
#include "avl/avl.h"
#include "chainHash/chainHash.h"

using namespace std;

class comparative{
private:
    AVLTree<string> avl_tree;
    ChainHash<string, string> chain_hash;

public:
    comparative() = default;
    void insert(const string& value){
        avl_tree.insert(value);
        chain_hash.insert(value, value);
    }
    void clear(){
        avl_tree.clear();
        chain_hash.clear();
    }

    double count_from_csv_chainHash(const string& nombreArchivo, const string& nombreColumna){

        chrono::high_resolution_clock::time_point start_time;
        chrono::high_resolution_clock::time_point end_time;

        start_time = std::chrono::high_resolution_clock::now();

        chain_hash.clear();

        ifstream archivo(nombreArchivo);
        if (!archivo.is_open()) {
            cout << "No se pudo abrir el archivo" << std::endl;
            return 0;
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
            return 0;
        }

        while (getline(archivo, linea)) {
            istringstream ss_2(linea);
            string valor;
            for (int i = 0; i <= indiceColumna; i++) {
                getline(ss_2, valor, ',');
            }
            chain_hash.insert(valor, valor);
        }

        archivo.close();

        end_time = std::chrono::high_resolution_clock::now();

        chrono::duration<double, milli> duration = end_time - start_time;

        double elapsed_milliseconds = duration.count();

        return elapsed_milliseconds;
    }

    double count_from_csv_set(const string& nombreArchivo, const string& nombreColumna){

        chrono::high_resolution_clock::time_point start_time;
        chrono::high_resolution_clock::time_point end_time;

        start_time = std::chrono::high_resolution_clock::now();

        avl_tree.clear();

        ifstream archivo(nombreArchivo);
        if (!archivo.is_open()) {
            cout << "No se pudo abrir el archivo" << std::endl;
            return 0;
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
            return 0;
        }

        while (getline(archivo, linea)) {
            istringstream ss_2(linea);
            string valor;
            for (int i = 0; i <= indiceColumna; i++) {
                getline(ss_2, valor, ',');
            }
            avl_tree.insert(valor);
        }

        archivo.close();

        end_time = std::chrono::high_resolution_clock::now();

        chrono::duration<double, milli> duration = end_time - start_time;

        double elapsed_milliseconds = duration.count();

        return elapsed_milliseconds;
    }

    size_t get_count(){
        return avl_tree.size();
    }

    map<string, size_t> get_info_size(){
        map<string, size_t> info;
        info["values_vector"] = chain_hash.getSize();
        info["values_set"] = avl_tree.size();
        return info;
    }

    map<string, double> get_info_memory(){
        map<string, double> info;
        info["memory_vector_kb"] = chain_hash.getMemoryUsedKB();
        info["memory_set_kb"] = avl_tree.getMemoryUsedKB();
        return info;
    }

    ~comparative(){
        avl_tree.clear();
        chain_hash.clear();
    }

};

#endif
