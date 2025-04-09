import axios from "axios";
import { BASE_URL } from "./apiPaths";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    
    if (accessToken) {
      //   console.log("🔹 Attaching Token:", accessToken); // Debugging
      config.headers.Authorization = `Bearer ${accessToken}`;
    } else {
      console.warn("⚠️ No token found in localStorage");
    }

    return config;
  },
  (error) => {
    console.error("❌ Request Interceptor Error:", error);
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    console.log("✅ Response Received:", response); // Debugging
    return response;
  },
  (error) => {
    if (!error.response) {
      console.error("❌ Network Error: Request not sent", error.message);
      return Promise.reject(new Error("Network error. Please try again."));
    }

    console.error(
      `❌ API Error (${error.response.status}):`,
      error.response.data
    );

    if (error.response.status === 401) {
      console.warn("🔄 Unauthorized! Redirecting to login...");
      localStorage.removeItem("token"); // Clear token if expired
      window.location.href = "/login";
    } else if (error.response.status === 500) {
      console.error(
        "⚠️ Server Error:",
        error.response.data?.message || "Internal Server Error"
      );
    } else if (error.code === "ECONNABORTED") {
      console.error("⚠️ Request Timeout. Please try again.");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
