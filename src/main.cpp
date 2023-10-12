#include "hyperloglog.h"

int main()
{
    HyperLogLog hll(4);

    for (int i = 0; i < 1000000; ++i) {
        hll.insert(to_string(i));
    }

    cout << "Estimación de elementos: " << hll.count() << endl;
}