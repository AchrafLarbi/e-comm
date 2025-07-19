import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HomeScreen from "./HomeScreen";
import AdminHomeScreen from "./AdminHomeScreen";

function ConditionalHome() {
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    // If user is admin, redirect to admin home
    if (userInfo && userInfo.isAdmin) {
      // Don't redirect, just show AdminHomeScreen
      return;
    }
  }, [userInfo, navigate]);

  // Show admin home if user is admin, otherwise show regular home
  if (userInfo && userInfo.isAdmin) {
    return <AdminHomeScreen />;
  }

  return <HomeScreen />;
}

export default ConditionalHome;
