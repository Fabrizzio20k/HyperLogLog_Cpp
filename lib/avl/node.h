#pragma once
#include <iostream>

template <typename T>
struct NodeBT
{
    T data;
    NodeBT<T> *left;
    NodeBT<T> *right;
    int height{};

    explicit NodeBT(T data)
    {
        this->data = data;
        this->left = nullptr;
        this->right = nullptr;
        this->height = 0;
    }

    NodeBT(T data, NodeBT<T> *left, NodeBT<T> *right)
    {
        this->data = data;
        this->left = left;
        this->right = right;
        this->height = 0;
    }

    void killSelf()
    {
        if (this->left != nullptr)
            this->left->killSelf();
        if (this->right != nullptr)
            this->right->killSelf();
        delete this;
    }
};
