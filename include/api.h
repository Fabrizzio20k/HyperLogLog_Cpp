#ifndef HYPERLOGLOG_CPP_API_H
#define HYPERLOGLOG_CPP_API_H

#include "Crow/crow.h"
#include "hyperloglog.h"
#include "comparative.h"

class Api {
    public:
        Api();
        void run();
        HyperLogLog* hll = nullptr;
        comparative* comp = nullptr;
    private:
        crow::SimpleApp app;
};

Api::Api() {
    CROW_ROUTE(app, "/api/v1/hyperloglog/create").methods("POST"_method)
    ([this](const crow::request& req) {
        auto json = crow::json::load(req.body);
        if (!json)
            return crow::response(400);

        int64_t p = json["p"].i();

        if (p < 4 || p > 16)
            return crow::response(400);

        if (hll != nullptr)
            delete hll;

        hll = new HyperLogLog(p);
        comp = new comparative();

        crow::json::wvalue response;

        response["status"] = "ok";
        response["message"] = "HyperLogLog created";
        response["message_2"] = "Comparative structures created";

        auto x = hll->get_info_structure();

        for(const auto& i:x){
            response["info_hll"][i.first] = i.second;
        }

        auto y = comp->get_info_size();

        for(const auto& i:y){
            response["info_comp"][i.first] = i.second;
        }

        auto z = comp->get_info_memory();

        for(const auto& i:z){
            response["info_comp"][i.first] = i.second;
        }

        return crow::response(response);
    });

    CROW_ROUTE(app, "/api/v1/hyperloglog/insert").methods("POST"_method)
    ([this](const crow::request& req) {
        auto json = crow::json::load(req.body);
        if (!json)
            return crow::response(400);

        if (hll == nullptr)
            return crow::response(400);

        string value = json["value"].s();

        hll->insert(value);
        comp->insert(value);

        crow::json::wvalue response;

        response["status"] = "ok";
        response["message"] = "Value inserted in hyperloglog";
        response["message_2"] = "Value inserted in comparative structures";

        auto x = hll->get_info_structure();

        for(const auto& i:x){
            response["info_hll"][i.first] = i.second;
        }

        auto y = comp->get_info_size();

        for(const auto& i:y){
            response["info_comp"][i.first] = i.second;
        }

        auto z = comp->get_info_memory();

        for(const auto& i:z){
            response["info_comp"][i.first] = i.second;
        }

        return crow::response(response);
    });

    CROW_ROUTE(app, "/api/v1/hyperloglog/info").methods("GET"_method)
    ([this](const crow::request& req) {
        if (hll == nullptr)
            return crow::response(400);

        crow::json::wvalue response;

        response["status"] = "ok";
        response["message"] = "Info hyperloglog and comparative structures";

        auto x = hll->get_info_structure();

        for(const auto& i:x){
            response["info_hll"][i.first] = i.second;
        }

        auto y = comp->get_info_size();

        for(const auto& i:y){
            response["info_comp"][i.first] = i.second;
        }

        auto z = comp->get_info_memory();

        for(const auto& i:z){
            response["info_comp"][i.first] = i.second;
        }

        return crow::response(response);
    });

    CROW_ROUTE(app, "/api/v1/hyperloglog/reset").methods("POST"_method)
    ([this](const crow::request& req){
        if (hll == nullptr)
            return crow::response(400);

        hll->clear();
        comp->clear();

        crow::json::wvalue response;

        response["status"] = "ok";
        response["message"] = "HyperLogLog reseted";
        response["message_2"] = "Comparative structures reseted";

        auto x = hll->get_info_structure();

        for(const auto& i:x){
            response["info_hll"][i.first] = i.second;
        }

        auto y = comp->get_info_size();

        for(const auto& i:y){
            response["info_comp"][i.first] = i.second;
        }

        auto z = comp->get_info_memory();

        for(const auto& i:z){
            response["info_comp"][i.first] = i.second;
        }

        return crow::response(response);
    });

    CROW_ROUTE(app, "/api/v1/hyperloglog/count").methods("GET"_method)
    ([this](const crow::request& req) {
        if (hll == nullptr)
            return crow::response(400);

        crow::json::wvalue response;

        response["status"] = "ok";
        response["message"] = "Count from hyperloglog and comparative structures";

        auto v = hll->count();

        response["hll"]["count_hll"] = v["count"];
        response["hll"]["time_hll"] = v["time"];

        size_t w = comp->get_count();

        double res = (double) ( v["count"] / w) * 100;

        response["hll"]["precision"] = res <= 100 ? res : abs(200 - res);

        auto x = hll->get_info_structure();

        for(const auto& i:x){
            response["hll"]["info_hll"][i.first] = i.second;
        }

        auto y = comp->get_info_size();

        for(const auto& i:y){
            response["comparative"]["info_comp"][i.first] = i.second;
        }

        auto z = comp->get_info_memory();

        for(const auto& i:z){
            response["comparative"]["info_comp"][i.first] = i.second;
        }

        return crow::response(response);
    });

    CROW_ROUTE(app,"/api/v1/hyperloglog/csv_comparation").methods("POST"_method)
    ([this](const crow::request& req) {
        auto json = crow::json::load(req.body);
        if (!json)
            return crow::response(400);

        if (hll == nullptr)
            return crow::response(400);

        string nombreArchivo = json["nombreArchivo"].s();
        string nombreColumna = json["nombreColumna"].s();

        hll->count_from_csv(nombreArchivo, nombreColumna);

        double time_vector = comp->count_from_csv_vector(nombreArchivo, nombreColumna);
        double time_set = comp->count_from_csv_set(nombreArchivo, nombreColumna);

        crow::json::wvalue response;

        response["status"] = "ok";
        response["message"] = "Count from csv";

        response["comparative"]["time_vector"] = time_vector;
        response["comparative"]["time_set"] = time_set;

        auto v = hll->count();

        response["hll"]["count_hll"] = v["count"];
        response["hll"]["time_hll"] = v["time"];

        size_t w = comp->get_count();

        double res = (double) ( v["count"] / w) * 100;

        response["hll"]["precision"] = res <= 100 ? res : abs(200 - res);

        auto x = hll->get_info_structure();

        for(const auto& i:x){
            response["hll"]["info_hll"][i.first] = i.second;
        }

        auto y = comp->get_info_size();

        for(const auto& i:y){
            response["comparative"]["info_comp"][i.first] = i.second;
        }

        auto z = comp->get_info_memory();

        for(const auto& i:z){
            response["comparative"]["info_comp"][i.first] = i.second;
        }

        return crow::response(response);
    });

    CROW_ROUTE(app, "/api/v1/hyperloglog/csv_hll").methods("POST"_method)
    ([this](const crow::request& req) {
        auto json = crow::json::load(req.body);
        if (!json)
            return crow::response(400);

        if (hll == nullptr)
            return crow::response(400);

        string nombreArchivo = json["nombreArchivo"].s();
        string nombreColumna = json["nombreColumna"].s();

        hll->count_from_csv(nombreArchivo, nombreColumna);

        crow::json::wvalue response;

        response["status"] = "ok";
        response["message"] = "Count from csv";

        auto v = hll->count();

        response["hll"]["count_hll"] = v["count"];
        response["hll"]["time_hll"] = v["time"];

        auto x = hll->get_info_structure();

        for(const auto& i:x){
            response["hll"]["info_hll"][i.first] = i.second;
        }

        return crow::response(response);
    });

}

void Api::run() {
    app.port(5000).multithreaded().run();
}

#endif //HYPERLOGLOG_CPP_API_H
