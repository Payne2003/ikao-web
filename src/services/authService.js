//maidat304
import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;
const authInstance = axios.create({ baseURL: API_URL, withCredentials: true });
// Lấy token từ localStorage
// const getToken = () => localStorage.getItem("accessToken");

export const login = async (credentials) => {
    const res = await authInstance.post("/auth/login", credentials);
    localStorage.setItem("access_token", res.data.accessToken);
    return res.data;
};

export const refreshToken = async () => {
    try {
        const res = await authInstance.post("/auth/refresh");
        localStorage.setItem("access_token", res.data.accessToken);
        return res.data.accessToken;
    } catch (error) {
        console.error("Refresh token failed:", error);
        localStorage.removeItem("access_token");
        window.location.href = "/login";
        return null;
    }
};

export const logout = () => {
    localStorage.removeItem("access_token");
    window.location.href = "/login";
};
// // Giải mã token để lấy thông tin người dùng
// export const getUserFromToken = () => {
//     const token = getToken();
//     if (!token) return null;

//     try {
//         return jwtDecode(token);
//     } catch (error) {
//         console.error("Lỗi khi giải mã token:", error);
//         return null;
//     }
// };
