//maidat304
import axios from "axios";
import { refreshToken } from "../services/authService";

const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true, // Gửi Cookie chứa refresh token
});

// Thêm interceptor để đính kèm access token vào request
instance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("access_token");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Xử lý refresh token khi gặp lỗi 401
let isRefreshing = false;
let failedRequestsQueue = [];

instance.interceptors.response.use(
    (response) => response.data,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve) => {
                    failedRequestsQueue.push((newToken) => {
                        originalRequest.headers.Authorization = `Bearer ${newToken}`;
                        resolve(instance(originalRequest));
                    });
                });
            }

            isRefreshing = true;
            originalRequest._retry = true;

            try {
                const newAccessToken = await refreshToken();
                if (newAccessToken) {
                    failedRequestsQueue.forEach((callback) => callback(newAccessToken));
                    failedRequestsQueue = [];

                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return instance(originalRequest);
                }
            } catch (refreshError) {
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default instance;
