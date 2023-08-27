import axios from "axios";
import {host} from "../constants"

export const getAllExpenses = async () => {
    const res = await axios.get(`${host}/get-all-expenses`);
    return res.data;
}