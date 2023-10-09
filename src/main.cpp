#include "hyperloglog.h"

int main()
{
    HyperLogLog hll(16);
    hll.count_from_csv("../mock/esas_mehsullar.csv", "satish_kodu");
    cout << hll.count() << endl;

    return 0;
}
