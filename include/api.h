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
}

void Api::run() {
    app.port(5000).multithreaded().run();
}

#endif //HYPERLOGLOG_CPP_API_H
