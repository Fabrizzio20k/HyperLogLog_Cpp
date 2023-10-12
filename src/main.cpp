#include "hyperloglog.h"

using namespace std;

int main(){
    HyperLogLog hll(16);
    for (int i = 0; i < 100000000; ++i) {
        hll.insert(to_string(i));
    }

    cout << hll.count() << endl;
}

