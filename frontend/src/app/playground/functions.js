import axios from "axios";

const linkAPI = "http://18.211.189.214:5000/api/v1/hyperloglog/";
const linkUpload = "http://18.211.189.214:5001/"

export const createHLL = async (p) => {
    try {
        const pdata = {
            "p": p,
        };
        const { data } = await axios.post(linkAPI + "create", pdata);
        return data;
    } catch (error) {
        console.log(error);
    }
};

export const insertHLL = async (value) => {
    try {
        const pdata = {
            "value": value,
        };
        const { data } = await axios.post(linkAPI + "insert", pdata);
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const infoHLL = async () => {
    try {
        const { data } = await axios.get(linkAPI + "info");
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const resetHLL = async () => {
    try {
        const { data } = await axios.post(linkAPI + "reset");
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const countHLL = async () => {
    try {
        const { data } = await axios.get(linkAPI + "count");
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const uploadHLLFile = async (file_formData) => {
    try {
        const { data } = await axios.post(linkUpload + "upload", file_formData);
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const listCSVFiles = async () => {
    try {
        const { data } = await axios.get(linkUpload + "listFiles");
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const countCSVHLL = async (filename, column) => {
    try {
        const pdata = {
            "nombreArchivo": "../mock/" + filename,
            "nombreColumna": column,
        };
        const { data } = await axios.post(linkAPI + "csv_hll", pdata);
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const countCSVCompare = async (filename, column) => {
    try {
        const pdata = {
            "nombreArchivo": "../mock/" + filename,
            "nombreColumna": column,
        };
        const { data } = await axios.post(linkAPI + "csv_comparation", pdata);
        return data;
    } catch (error) {
        console.log(error);
    }
}