cmake_minimum_required(VERSION 3.26)
project(HyperLogLog_Cpp)

set(CMAKE_CXX_STANDARD 17)

include_directories(include)
include_directories(lib/Crow)
include_directories(lib)

add_executable(HyperLogLog_Cpp
        include/hyperloglog.h
        lib/MurmurHash3/MurmurHash3.cpp
        lib/MurmurHash3/MurmurHash3.h
        src/main.cpp
        lib/Crow/crow.h
        include/comparative.h
        include/api.h
        lib/Crow/crow/middlewares/cors.h
        lib/avl/avl.h
        lib/avl/node.h
        lib/chainHash/chainHash.h)