import axios, { Axios } from 'axios';
import { API_URL } from "@/config";

export const BaseClient = axios.create({
    baseURL: API_URL,
    headers: {
        // 'Content-type': 'application/json',
        'Accept': 'application/json'
    }
});
  
BaseClient.interceptors.request.use(async (config) => {
    const value = localStorage.getItem('AuthorizationKey');
    if (value !== null) {
        config.headers['Authorization'] = `Bearer ${value}`;
    }
  
    return config;
});