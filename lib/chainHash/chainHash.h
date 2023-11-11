#pragma once

#include <vector>
#include <forward_list>
#include <iostream>

using namespace std;

const int maxColision = 3;
const float maxFillFactor = 0.5;

template <typename TK, typename TV>
class ChainHash
{
private:
    struct Entry
    {
        TK key;
        TV value;
        size_t hashcode;

        Entry(TK _key, TV _value, size_t _hashcode)
        {
            key = _key;
            value = _value;
            hashcode = _hashcode;
        }

        Entry()
        {
            key = TK();
            value = TV();
            hashcode = 0;
        }

        bool operator==(const Entry &other)
        {
            return key == other.key;
        }

        bool operator!=(const Entry &other)
        {
            return key != other.key;
        }
    };
    forward_list<Entry> *array; // array de listas enlazadas
    int capacity;               // tamanio del array
    int size;                   // cantidad de elementos totales

public:
    explicit ChainHash(int _cap = 10)
    {
        capacity = _cap;
        array = new forward_list<Entry>[capacity];
        size = 0;
    }

    void insert(TK key, TV value)
    {
        if (fillFactor() >= maxFillFactor)
            rehashing();
        size_t hashcode = getHashCode(key);
        int index = hashcode % capacity;
        for (auto &entry : array[index])
        {
            if (entry.key == key)
            {
                entry.value = value;
                return;
            }
        }
        array[index].push_front({key, value, hashcode});
        size++;
    }

    TV find(TK key)
    {
        size_t hashcode = getHashCode(key);
        int index = hashcode % capacity;
        for (auto &entry : array[index])
        {
            if (entry.key == key)
            {
                return entry.value;
            }
        }
        throw std::runtime_error("Key not found");
    }

    void remove(TK key)
    {
        size_t hashcode = getHashCode(key);
        int index = hashcode % capacity;
        for (auto &entry : array[index])
        {
            if (entry.key == key)
            {
                array[index].remove(entry);
                size--;
                return;
            }
        }
        throw std::runtime_error("Key not found");
    }

    TV &operator[](TK key)
    {
        size_t hashcode = getHashCode(key);
        int index = hashcode % capacity;
        for (auto &entry : array[index])
        {
            if (entry.key == key)
            {
                return entry.value;
            }
        }
        array[index].push_front({key, TV(), hashcode});
        size++;
        return array[index].front().value;
    }

    bool contains(TK key)
    {
        size_t hashcode = getHashCode(key);
        int index = hashcode % capacity;
        for (auto &entry : array[index])
        {
            if (entry.key == key)
            {
                return true;
            }
        }
        return false;
    }

    int getSize()
    {
        return size;
    }

    int getCapacity()
    {
        return capacity;
    }

    double getMemoryUsedKB()
    {
        return (sizeof(Entry) * size) / 1024.0;
    }

    void clear()
    {
        delete[] array;
        capacity = 10;
        array = new forward_list<Entry>[capacity];
        size = 0;
    }

    void print()
    {
        for (int i = 0; i < capacity; i++)
        {
            cout << i << ": ";
            for (auto &entry : array[i])
            {
                cout << entry.key << " ";
            }
            cout << endl;
        }
    }

    int bucketCount()
    {
        return capacity;
    }

    ~ChainHash()
    {
        delete[] array;
    }

private:
    double fillFactor()
    {
        return (double) size / (capacity * maxColision);
    }

    size_t getHashCode(TK key)
    {
        std::hash<TK> ptr_hash;
        return ptr_hash(key);
    }

    void rehashing()
    {
        int oldCapacity = capacity;
        capacity *= 2;
        auto *newArray = new forward_list<Entry>[capacity];
        for (int i = 0; i < oldCapacity; i++)
        {
            for (auto &entry : array[i])
            {
                int newIndex = entry.hashcode % capacity;
                newArray[newIndex].push_front(entry);
            }
        }
        delete[] array;
        array = newArray;
    }
};

