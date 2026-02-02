import axios from "axios";



const JIKAN_BASE_URL = "https://api.jikan.moe/v4";

export const jikanApi = axios.create({
  baseURL: JIKAN_BASE_URL,
  timeout: 5000,
});
