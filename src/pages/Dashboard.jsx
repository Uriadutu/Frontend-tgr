import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";
import DashboardUser from "./user/DashboardUser";

const DashboardAdmin = () => {
  const { user } = useSelector((state) => state.auth);
  const [sub, setJmlhSub] = useState([]);
  const [status, setStatus] = useState({
    diproses: 0,
    diterima: 0,
    ditolak: 0,
  });
  const [slip, setSlip] = useState([]);
  const [statusSlip, setStatuSlip] = useState({
    diproses: 0,
    diterima: 0,
    ditolak: 0,
  });

  const getStatusSlip = async () => {
    try {
      const response = await fetch("http://localhost:5000/slips");
      const data = await response.json();

      const jumlahDiproses = data.filter(
        (item) => item.status === "Diproses"
      ).length;
      const jumlahDiterima = data.filter(
        (item) => item.status === "Diterima"
      ).length;
      const jumlahDitolak = data.filter(
        (item) => item.status === "Ditolak"
      ).length;

      setStatuSlip({
        diproses: jumlahDiproses,
        diterima: jumlahDiterima,
        ditolak: jumlahDitolak,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getStatus = async () => {
    try {
      const response = await fetch("http://localhost:5000/submissions");
      const data = await response.json();

      const jumlahDiproses = data.filter(
        (item) => item.status === "Diproses"
      ).length;
      const jumlahDiterima = data.filter(
        (item) => item.status === "Diterima"
      ).length;
      const jumlahDitolak = data.filter(
        (item) => item.status === "Ditolak"
      ).length;

      setStatus({
        diproses: jumlahDiproses,
        diterima: jumlahDiterima,
        ditolak: jumlahDitolak,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const getSlip = async () => {
    try {
      const response = await fetch("http://localhost:5000/slips");
      const data = await response.json();
      setSlip(data.length);
    } catch (error) {}
  };

  useEffect(() => {
    getSubmissions();
    getStatusSlip();
    getSlip();
    getStatus();
  }, []);

  const getSubmissions = async () => {
    try {
      const response = await fetch("http://localhost:5000/submissions");
      const data = await response.json();
      setJmlhSub(data.length);
    } catch (error) {}
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Dashboard Admin</h1>
      <h3 className="mb-4 text-xl font-semibold">Halo, {user.name}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative bg-white shadow-md rounded-lg p-6">
          <div className="absolute top-0 left-0 h-full w-2 bg-blue-500 rounded-tl-lg rounded-bl-lg"></div>
          <h2 className="text-xl font-semibold mb-2 ml-4"> Jumlah Pengajuan</h2>
          <div className="absolute bottom-2 right-2 font-semibold text-xl">
            <p className="text-gray-700 flex justify-end items-end">{sub}</p>
          </div>
        </div>
        <div className="relative bg-white shadow-md rounded-lg p-6">
          <div className="absolute top-0 left-0 h-full w-2 bg-yellow-500 rounded-tl-lg rounded-bl-lg"></div>
          <h2 className="text-xl font-semibold mb-2 ml-4">
            Pengajuan Diproses
          </h2>
          <div className="absolute bottom-2 right-2 font-semibold text-xl">
            <p className="text-gray-700 flex justify-end items-end">
              {status.diproses}
            </p>
          </div>
        </div>
        <div className="relative bg-white shadow-md rounded-lg p-6">
          <div className="absolute top-0 left-0 h-full w-2 bg-green-500 rounded-tl-lg rounded-bl-lg"></div>
          <h2 className="text-xl font-semibold mb-2 ml-4">
            Pengajuan Diterima
          </h2>
          <div className="absolute bottom-2 right-2 font-semibold text-xl">
            <p className="text-gray-700 flex justify-end items-end">
              {status.diterima}
            </p>
          </div>
        </div>
        <div className="relative bg-white shadow-md rounded-lg p-6">
          <div className="absolute top-0 left-0 h-full w-2 bg-red-500 rounded-tl-lg rounded-bl-lg"></div>
          <h2 className="text-xl font-semibold mb-2 ml-4">Pengajuan Ditolak</h2>
          <div className="absolute bottom-2 right-2 font-semibold text-xl">
            <p className="text-gray-700 flex justify-end items-end">
              {status.ditolak}
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        <div className="relative bg-white shadow-md rounded-lg p-6">
          <div className="absolute top-0 left-0 h-full w-2 bg-blue-500 rounded-tl-lg rounded-bl-lg"></div>
          <h2 className="text-xl font-semibold mb-2 ml-4"> Jumlah Slip</h2>
          <div className="absolute bottom-2 right-2 font-semibold text-xl">
            <p className="text-gray-700 flex justify-end items-end">{slip}</p>
          </div>
        </div>
        <div className="relative bg-white shadow-md rounded-lg p-6">
          <div className="absolute top-0 left-0 h-full w-2 bg-yellow-500 rounded-tl-lg rounded-bl-lg"></div>
          <h2 className="text-xl font-semibold mb-2 ml-4">Slip Diproses</h2>
          <div className="absolute bottom-2 right-2 font-semibold text-xl">
            <p className="text-gray-700 flex justify-end items-end">
              {statusSlip.diproses}
            </p>
          </div>
        </div>
        <div className="relative bg-white shadow-md rounded-lg p-6">
          <div className="absolute top-0 left-0 h-full w-2 bg-green-500 rounded-tl-lg rounded-bl-lg"></div>
          <h2 className="text-xl font-semibold mb-2 ml-4">Slip Diterima</h2>
          <div className="absolute bottom-2 right-2 font-semibold text-xl">
            <p className="text-gray-700 flex justify-end items-end">
              {statusSlip.diterima}
            </p>
          </div>
        </div>
        <div className="relative bg-white shadow-md rounded-lg p-6">
          <div className="absolute top-0 left-0 h-full w-2 bg-red-500 rounded-tl-lg rounded-bl-lg"></div>
          <h2 className="text-xl font-semibold mb-2 ml-4">Slip Ditolak</h2>
          <div className="absolute bottom-2 right-2 font-semibold text-xl">
            <p className="text-gray-700 flex justify-end items-end">
              {statusSlip.ditolak}
            </p>
          </div>
        </div>
      </div>
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
    case "superadmin":
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
