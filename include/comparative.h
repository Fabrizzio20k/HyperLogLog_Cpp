#ifndef HYPERLOGLOG_CPP_COMPARATIVE_H
#define HYPERLOGLOG_CPP_COMPARATIVE_H

#include <vector>
#include <string>
#include <set>
#include <map>

using namespace std;

class comparative{
private:
    vector<string> values;
    set<string> set_values;

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
    }
    void clear(){
        values.clear();
        set_values.clear();
    }

    double count_from_csv_vector(const string& nombreArchivo, const string& nombreColumna){

        chrono::high_resolution_clock::time_point start_time;
        chrono::high_resolution_clock::time_point end_time;

        start_time = std::chrono::high_resolution_clock::now();

        clear();

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

        clear();

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
            set_values.insert(valor);
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
        info["values_set"] = set_values.size();
        return info;
    }

    map<string, double> get_info_memory(){
        map<string, double> info;
        info["memory_vector_kb"] = (double) (sizeof(values[0]) * values.size() + sizeof(values))/1000;
        info["memory_set_kb"] = (double) (sizeof(set_values) + sizeof(set_values.begin()) * set_values.size())/1000;
        return info;
    }

};

#endif
