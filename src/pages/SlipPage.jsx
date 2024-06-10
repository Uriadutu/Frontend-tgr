import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { formatDate } from "../utils/helper";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";
import ModalAddKeterangan from "../components/modal/ModalAddKeterangan";

const SlipPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);
  const [addKet, setAddket] = useState(false)
  const [idSlip, setIdSlip] = useState([])

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, user, navigate]);

  const id = user && user.id;
  const [Slips, setSlip] = useState([]);
  const [SlipsAdmin, setSlipAdmin] = useState([]);

  const getSlipbyUser = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/slips/user/${userId}`
      );
      setSlip(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getSlip = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/slips`);
      setSlipAdmin(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user && user.role === "user") {
      getSlipbyUser(id);
    } else if (user && user.role === "admin") {
      getSlip();
    }
  }, [id, user]);

  const AccSlip = async (slipId, idUser) => {
    try {
      await axios.patch(`http://localhost:5000/slips/terima/${slipId}`, {

        id : idUser,
      }
      );
      getSlip();
      // navigate("/slip");
      // console.log(slipId);
    } catch (error) {
      console.log(error);
    }
  };


  const handleModal = async (id) => {
    setIdSlip(id)
    setAddket(true)
  }

  return (
    <Layout>
      <div className="">
        {user && user.role === "user" && (
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama</th>
                  <th>Status</th>
                  <th>Terakhir diperbarui</th>
                </tr>
              </thead>
              <tbody>
                {Slips.length > 0 ? (
                  Slips.map((slip, index) => (
                    <tr key={index} className="p-2">
                      <th>{index + 1}</th>
                      <td>Slip Pembayaran</td>
                      <td
                        className={`${
                          slip.status === "Diterima"
                            ? "badge bg-green-600 text-white"
                            : slip.status === "Ditolak"
                            ? "badge bg-red-600 text-white"
                            : "badge bg-yellow-600 text-white"
                        }`}
                      >
                        {slip.status}
                      </td>
                      <td>{formatDate(slip.createdAt)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">
                      Tidak ada data slip.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
        {user && user.role === "admin" && (
          <div className="overflow-x-auto">
            <form>
              <table className="table items-center">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Nama</th>
                    <th>Terakhir diperbarui</th>
                    <th className="text-center">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {SlipsAdmin.filter((slip) => slip.status === "Diproses")
                    .length > 0 ? (
                    SlipsAdmin.filter((slip) => slip.status === "Diproses").map(
                      (slip, index) => (
                        <tr key={index} className="p-2 items-center">
                          <th>{index + 1}</th>
                          <td>{slip && slip.user && slip.user.name}</td>
                          <td>{formatDate(slip.createdAt)}</td>
                          <td className="flex items-center space-x-2 place-content-center">
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={() => AccSlip(slip.id, slip.user.id)}
                            >
                              Terima
                            </button>
                            <button
                              type="button"
                              className="btn btn-error"
                              onClick={() => handleModal(slip && slip.id)}
                            >
                              Tolak
                            </button>
                            <Link
                              to={`${slip.url}`}
                              className="btn btn-secondary"
                            >
                              Lihat
                            </Link>
                          </td>
                        </tr>
                      )
                    )
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">
                        Tidak ada data slip.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </form>
          </div>
        )}
      </div>

      {addKet && (
        <ModalAddKeterangan setAddKet={setAddket} idSlip={idSlip} />
      )}
    </Layout>
  );
};

export default SlipPage;
