import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosInstance } from "../api/api";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check if the user is already logged in (via cookies)
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get("auth/profile");
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
      const res = await axiosInstance.post("auth/login", { email, password });
      setUser(res.data.user);
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
      await axiosInstance.post("auth/logout");
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
