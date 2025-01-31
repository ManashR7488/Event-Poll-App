import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api/auth",
    withCredentials: true, // Important for sending cookies
  });

  // Check if the user is already logged in (via cookies)
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get("/profile");
        setUser(res.data.user);
      } catch (error) {
        // console.error(
        //   "Error fetching profile:",
        //   error.response?.data || error.message
        // );
      }
    };

    fetchProfile();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const res = await axiosInstance.post("/login", { email, password });
      setUser({ name: res.data.name });
      // Navigate("/dashboard");
    } catch (error) {
      // console.error("Login failed:", error.response?.data || error.message);
      Navigate("/login");
      return error;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await axiosInstance.post("/logout");
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
