import axios from 'axios';

//ajustar a URL da API
export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333',
    withCredentials: true,
});
