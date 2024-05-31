import React, { useEffect } from "react";
import Layout from "./Layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";
import DashboardUser from "./user/DashboardUser";

const DashboardAdmin = () => {
  return (
    <>
      <h1>Dashboard Admin</h1>
    </>
  );
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError } = useSelector((state) => state.auth);

  let dashboard;

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);

  switch (user && user?.role) {
    case "admin":
      dashboard = <DashboardAdmin />;
      break;
    case "user":
      dashboard = <DashboardUser />;
      break;
    default:
      dashboard = <>404</>;
  }

  return <Layout>{dashboard}</Layout>;
};

export default Dashboard;
