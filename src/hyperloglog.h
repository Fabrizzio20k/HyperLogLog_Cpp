#ifndef HYPERLOGLOG
#define HYPERLOGLOG

#include <iostream>
#include <vector>
#include <cmath>
#include <bitset>
#include "MurmurHash3.h"

using namespace std;

string hash_to_binary(const string &data)
{
    uint32_t hash;
    MurmurHash3_x86_32(data.c_str(), data.size(), 0, &hash);

    bitset<32> hash_bin(hash);

    return hash_bin.to_string();
}

class HyperLogLog
{
private:
    int m;
    vector<int> M;
};

#endif // !HYPERLOGLOG