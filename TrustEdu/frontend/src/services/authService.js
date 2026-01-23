import axios from "axios";

// Access the API_URL from window.env if available, or default to localhost
const API_URL = "http://localhost:5000/api/auth";

const register = async (name, username, password) => {
    const response = await axios.post(API_URL + "/register", {
        name,
        username,
        password,
    });

    if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
};

const login = async (username, password) => {
    const response = await axios.post(API_URL + "/login", {
        username,
        password,
    });

    if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
};

const logout = () => {
    localStorage.removeItem("user");
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

const authService = {
    register,
    login,
    logout,
    getCurrentUser,
};

export default authService;
