#include <fstream>
#include <iostream>
#include <string>

int main()
{
    std::ifstream archivo("miarchivo.csv");

    if (!archivo.is_open())
    {
        std::cout << "No se pudo abrir el archivo" << std::endl;
        return 1;
    }

    std::string linea;
    if (std::getline(archivo, linea))
    {
        std::cout << "La primera línea es: " << linea << std::endl;
    }
    else
    {
        std::cout << "El archivo está vacío o no se pudo leer la línea" << std::endl;
    }

    archivo.close();
    return 0;
}
