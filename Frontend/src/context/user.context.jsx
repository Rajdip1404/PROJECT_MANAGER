import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Retrieve user from localStorage on initial load
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : "";
  });
  const [loading, setLoading] = useState(true);

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); // Save user data in localStorage
    setLoading(false);
  };

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("user"); // Remove user data from localStorage
    localStorage.removeItem("token"); // Also remove the token
  };

  useEffect(() => {
    // Sync localStorage data when user changes
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      return;
    }
    const accessToken = localStorage.getItem("token");
    if(!accessToken) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
        try{
            const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
            console.log("The response from user.context: ", response);
            const { user } = response.data;
            updateUser(user);
        } catch (error) {
            console.error("Error fetching user:", error);

            clearUser();
        } finally {
            setLoading(false);
        }
    };

    fetchUser();

  }, [user]);

  return (
    <UserContext.Provider value={{ user, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
