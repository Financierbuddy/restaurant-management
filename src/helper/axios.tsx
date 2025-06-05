// lib/axios.ts
import axios, { AxiosError, AxiosResponse } from "axios";
import Cookies from "js-cookie";

// Create axios instance without baseURL initially
const service = axios.create({
  // Optional: timeout can be added
  // timeout: 10000,
});

// Request Interceptor
service.interceptors.request.use(
  (config: any): any => {
    // Dynamically set baseURL on each request to ensure fresh env var
    const baseURL = process.env.NEXT_PUBLIC_API_URL || "https://api.gratisgenieten.nl/api/v1/";
    config.baseURL = baseURL;
    
    if (typeof window !== "undefined") {
      const authToken = Cookies.get("token");
      if (authToken) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${authToken}`,
        };
      }
    }
    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  }
);

// Response Interceptor
service.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  (error: any): Promise<AxiosError> => {
    if (typeof window !== "undefined") {
      const message = error?.response?.data?.message;
      if (message === "Unauthenticated.") {
        Cookies.remove("token");
        console.warn("🔒 Token removed due to unauthenticated response.")
      }
    }

    return Promise.reject(error);
  }
);

export default service;
