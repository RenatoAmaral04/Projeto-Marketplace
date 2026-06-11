import axios from 'axios';

export const api = axios.create({
  // Trocando localhost por 127.0.0.1 para evitar bugs de IPv6 do Windows
  baseURL: 'http://127.0.0.1:8080/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});