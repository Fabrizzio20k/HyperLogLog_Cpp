#include "hyperloglog.h"

int main()
{
    HyperLogLog hll(16);
    hll.count_from_csv("../mock/MOCK_DATA.csv", "email");

    cout << hll.count() << endl;

    return 0;
}
