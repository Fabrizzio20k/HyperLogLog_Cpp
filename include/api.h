#ifndef HYPERLOGLOG_CPP_API_H
#define HYPERLOGLOG_CPP_API_H

#include "Crow/crow.h"
#include "hyperloglog.h"

class Api {
    public:
        Api();
        void run();
        HyperLogLog* hll = nullptr;
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

        crow::json::wvalue response;

        response["status"] = "ok";
        response["message"] = "HyperLogLog created";

        auto x = hll->get_info_structure();

        for(const auto& i:x){
            response["info"][i.first] = i.second;
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

        crow::json::wvalue response;

        response["status"] = "ok";
        response["message"] = "Value inserted";

        auto x = hll->get_info_structure();

        for(const auto& i:x){
            response["info"][i.first] = i.second;
        }

        return crow::response(response);
    });

    CROW_ROUTE(app, "/api/v1/hyperloglog/info").methods("GET"_method)
    ([this](const crow::request& req) {
        if (hll == nullptr)
            return crow::response(400);

        crow::json::wvalue response;

        response["status"] = "ok";
        response["message"] = "Info";

        auto x = hll->get_info_structure();

        for(const auto& i:x){
            response["info"][i.first] = i.second;
        }

        return crow::response(response);
    });

    CROW_ROUTE(app, "/api/v1/hyperloglog/reset").methods("POST"_method)
    ([this](const crow::request& req){
        if (hll == nullptr)
            return crow::response(400);

        hll->clear();

        crow::json::wvalue response;

        response["status"] = "ok";
        response["message"] = "HyperLogLog reseted";

        auto x = hll->get_info_structure();

        for(const auto& i:x){
            response["info"][i.first] = i.second;
        }

        return crow::response(response);
    });

    CROW_ROUTE(app, "/api/v1/hyperloglog/count").methods("GET"_method)
    ([this](const crow::request& req) {
        if (hll == nullptr)
            return crow::response(400);

        crow::json::wvalue response;

        response["status"] = "ok";
        response["message"] = "Count";

        auto x = hll->count();

        response["count"] = x["count"];
        response["time"] = x["time"];

        auto y = hll->get_info_structure();

        for(const auto& i:y){
            response["info"][i.first] = i.second;
        }

        return crow::response(response);
    });

    CROW_ROUTE(app,"/api/v1/hyperloglog/csv").methods("POST"_method)
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

        auto x = hll->count();

        response["count"] = x["count"];
        response["time"] = x["time"];

        auto y = hll->get_info_structure();

        for(const auto& i:y){
            response["info"][i.first] = i.second;
        }

        return crow::response(response);
    });


}

void Api::run() {
    app.port(5000).multithreaded().run();
}

#endif //HYPERLOGLOG_CPP_API_H
