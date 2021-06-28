import axios from "axios";

// export const baseURL = 'https://neko-back.herokuapp.com/2.0/';
export const baseURL = 'https://cards-friday-back.herokuapp.com/2.0/';

export const instance = axios.create({
    baseURL
});