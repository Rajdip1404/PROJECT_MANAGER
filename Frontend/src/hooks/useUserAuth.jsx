import { useContext, useEffect } from "react";
import { UserContext } from "../context/user.context";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

export const useUserAuth = () => {
  const { user, loading, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if(loading) return;
    if(user) return;

    if(!user) {
        clearUser();
        navigate("/login");
    }
  }, [user, navigate, loading, clearUser]);
};
