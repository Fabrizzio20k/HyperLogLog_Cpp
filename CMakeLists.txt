cmake_minimum_required(VERSION 3.26)
project(HyperLogLog_Cpp)

set(CMAKE_CXX_STANDARD 14)

include_directories(include)
include_directories(lib)
include_directories(lib/boost_1_83_0)

add_executable(HyperLogLog_Cpp
        include/hyperloglog.h
        lib/MurmurHash3/MurmurHash3.cpp
        lib/MurmurHash3/MurmurHash3.h
        src/main.cpp
        lib/crow.h
        lib/crow/app.h)
