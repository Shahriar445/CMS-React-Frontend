import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeLayout from "../Layout/HomeLayout";

const Guard = ({ children }) => {
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
      navigate("/login");
      return;
    }

    switch (role?.toLowerCase()) {
      case "admin":
        navigate("/admin/dashboard");
        break;
      case "importer":
        navigate("/importer/dashboard");
        break;
      case "exporter":
        navigate("/exporter/dashboard");
        break;
      case "customs officer":
        navigate("/customs-officer/dashboard");
        break;
      default:
        setAuthorized(false);
        break;
    }

    setAuthorized(true);
  }, [navigate]);

  if (!authorized) {
    return <HomeLayout />;
  }

  return <>{children}</>;
};

export default Guard;
