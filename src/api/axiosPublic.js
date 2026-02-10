import axios from 'axios';

// Usar variable de entorno o localhost en desarrollo
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const axiosPublic = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default axiosPublic;
