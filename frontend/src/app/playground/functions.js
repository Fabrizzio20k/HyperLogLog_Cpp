import axios from "axios";

const linkAPI = "http://0.0.0.0:5000/api/v1/hyperloglog/";
const linkUpload = "http://localhost:5001/"

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
