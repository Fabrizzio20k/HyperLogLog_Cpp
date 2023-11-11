#ifndef HYPERLOGLOG_CPP_COMPARATIVE_H
#define HYPERLOGLOG_CPP_COMPARATIVE_H

#include <vector>
#include <string>
#include <map>
#include <set>
#include "avl/avl.h"

using namespace std;

class comparative{
private:
    vector<string> values;
    set<string> set_values;
    AVLTree<string> avl_tree;

    void insert_diferent(const string& value){
        bool is_diferent = true;
        for (const auto& i: values){
            if (i == value){
                is_diferent = false;
                break;
            }
        }
        if (is_diferent){
            values.push_back(value);
        }
    }

public:
    comparative() = default;
    void insert(const string& value){
        insert_diferent(value);
        set_values.insert(value);
        avl_tree.insert(value);
    }
    void clear(){
        values.clear();
        set_values.clear();
        avl_tree.clear();
    }

    double count_from_csv_vector(const string& nombreArchivo, const string& nombreColumna){

        chrono::high_resolution_clock::time_point start_time;
        chrono::high_resolution_clock::time_point end_time;

        start_time = std::chrono::high_resolution_clock::now();

        values.clear();

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
            insert_diferent(valor);
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
        return set_values.size();
    }

    map<string, size_t> get_info_size(){
        map<string, size_t> info;
        info["values_vector"] = values.size();
        info["values_set"] = avl_tree.size();
        return info;
    }

    map<string, double> get_info_memory(){
        map<string, double> info;
        info["memory_vector_kb"] = (double) (sizeof(string) * values.size() + sizeof(values))/1000;
        info["memory_set_kb"] = avl_tree.getMemoryUsedKB();
        return info;
    }

    ~comparative(){
        values.clear();
        set_values.clear();
        avl_tree.clear();
    }

};

#endif
