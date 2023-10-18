# HyperLogLog_Cpp
This is the implementation of HyperLogLog algorithm in C++.
To start, you have to install the dependences with the following command:

```bash
sudo sh ./install.sh
```

Then, with any IDE that supports CMake, you can compile the project and use it as a server.

## Usage

To use the server, just compile it and make the request to http://0.0.0.0:5000/api/v1/hyperloglog with the following parameters:

- **/create (POST)** - Create a new HyperLogLog with number of buckets 2^p. **p** is between 4 and 16.
    ```json
    {
      "p": 16
    }
    ```
- **/insert (POST)** - Add a new key to the HyperLogLog.
    ```json
    {
      "value": "key"
    }
    ```
- **/count (GET)** - Return the number of unique keys in the HyperLogLog.
- **/reset (POST)** - Reset the HyperLogLog counter.
- **/csv (POST)**
    ```json
    {
      "nombreArchivo": "../mock/esas_mehsullar.csv",
      "nombreColumna": "satish_kodu"
    }
    ```
- 



