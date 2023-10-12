#include "hyperloglog.h"

int main()
{
    HyperLogLog hll(15);
    hll.count_from_csv("../mock/esas_mehsullar.csv", "satish_kodu");
    cout << hll.count() << endl;
}