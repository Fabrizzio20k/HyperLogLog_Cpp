#ifndef HYPERLOGLOG_CPP_API_H
#define HYPERLOGLOG_CPP_API_H

#include "Crow/crow.h"
#include "hyperloglog.h"

class Api {
    public:
        Api();
        void run();
    private:
        crow::SimpleApp app;
};

Api::Api() {
CROW_ROUTE(app, "/api/v1/hyperloglog")
    ([](){
        crow::json::wvalue x;

        auto * hll = new HyperLogLog(16);
        hll->insert("Hello, World!1");
        hll->insert("Hello, World!2");
        hll->insert("Hello, World!3");
        hll->insert("Hello, World!4");
        hll->insert("Hello, World!5");
        hll->insert("Hello, World!6");
        hll->insert("Hello, World!7");
        hll->insert("Hello, World!8");
        hll->insert("Hello, World!9");
        hll->insert("Hello, World!10");

        x["status"] = "ok";
        x["message"] = "Hello, World!";
        x["cardinality"] = hll->count();

        map<string, string> info = hll->get_info_structure();

        for (auto & i : info) {
            x[i.first] = i.second;
        }

        delete hll;
        return x;
    });
}

void Api::run() {
    app.port(18080).multithreaded().run();
}

#endif //HYPERLOGLOG_CPP_API_H
