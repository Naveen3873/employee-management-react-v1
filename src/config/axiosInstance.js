import axios from 'axios';

// Create an instance of axios with a custom config
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8088', // Replace with your API base URL
    // timeout: 10000, // Timeout for API requests
    headers: {
        'Content-Type': 'application/json', // Default content type
    },
});

// Interceptor to add authorization token to requests
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
