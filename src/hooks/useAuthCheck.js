import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { getCookie } from "../handlers";

export const useAuthCheck = () => {
  const user = useSelector((state) => state.user.username);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!(user || getCookie("Token"))) navigate("/sign-in", { state: { from: location.pathname }, replace: true });
  }, [user, getCookie]);
};
