import axios from "axios";

const linkAPI = "http://0.0.0.0:5000/api/v1/hyperloglog/";

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