import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { formatDate } from "../utils/helper";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";
import axios from "axios";

const SubmissionPage = () => {
  const [Subs, setSubs] = useState([]);
  const [SubsAdmin, setSubsAdmin] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [lihat, setLihat] = useState(null);
  const { isError, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
    
  }, [isError, user, navigate]);

  const id = user && user.id;

  const getSubbyId = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/submissions/user/${userId}`
      );
      setSubs(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getSub = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/submissions/`);
      setSubsAdmin(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user && user.role === "user") {
      getSubbyId(id);
    } else if (user && user.role === "admin") {
      getSub();
    }
  }, [id, user]);

  const statusOrder = {
    Diproses: 1,
    Diterima: 2,
    Ditolak: 3,
  };

  const sortedSubs = Subs.sort(
    (a, b) => statusOrder[a.status] - statusOrder[b.status]
  );

  const sortedSubsAdmin = SubsAdmin.sort(
    (a, b) => statusOrder[a.status] - statusOrder[b.status]
  );

  const TolakSub = async (subId) => {
    try {
      await axios.patch(`http://localhost:5000/submissions/tolak/${subId}`);
      getSub();
    } catch (error) {
      console.log(error);
    }
  };

  const AccSub = async (subId, idUser) => {
    try {
      await axios.patch(`http://localhost:5000/submissions/terima/${subId}`, {
        id: idUser,
      });
      getSub();
    } catch (error) {
      console.log(error);
    }
  };

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
                {sortedSubs.map((sub, index) => (
                  <tr key={index} className="p-2">
                    <th>{index + 1}</th>
                    <td>
                      Fotokopi KTP, Surat Rekomendasi dan Surat Permohonan
                    </td>
                    <td
                      className={` ${
                        sub.status === "Diterima"
                          ? "badge bg-green-600 text-white"
                          : sub.status === "Ditolak"
                          ? "badge bg-red-600 text-white"
                          : "badge bg-yellow-600 text-white"
                      }`}
                    >
                      {sub.status}
                    </td>
                    <td>{formatDate(sub.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {user && user.role === "admin" && (
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama</th>
                  <th>Terakhir diperbarui</th>
                  <th className="text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {sortedSubsAdmin.filter((sub) => sub.status === "Diproses")
                  .length > 0 ? (
                  sortedSubsAdmin
                    .filter((sub) => sub.status === "Diproses")
                    .map((sub, index) => (
                      <React.Fragment key={index}>
                        <tr className="p-2 items-center">
                          <th>{index + 1}</th>
                          <td>{sub && sub.user && sub.user.name}</td>
                          <td>{formatDate(sub.createdAt)}</td>
                          <td className="flex items-center space-x-2 place-content-center">
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={() => AccSub(sub.id, sub.user.id)}
                            >
                              Terima
                            </button>
                            <button
                              type="button"
                              className="btn btn-error"
                              onClick={() => TolakSub(sub.id)}
                            >
                              Tolak
                            </button>
                            <button
                              type="button"
                              className="btn btn-secondary"
                              onClick={() =>
                                setLihat(lihat === index ? null : index)
                              }
                            >
                              {lihat === index ? "Tutup" : "Lihat"}
                            </button>
                          </td>
                        </tr>
                        {lihat === index && (
                          <tr>
                            <td colSpan="6">
                              <div className="flex  gap-2">
                                <Link
                                  className="btn btn-secondary"
                                  to={sub && sub.ktpUrl}
                                >
                                  FK KTP
                                </Link>
                                <Link
                                  className="btn btn-secondary"
                                  to={sub && sub.recommendationLetterUrl}
                                >
                                  FK Surat Rekomendasi SKPD
                                </Link>
                                <Link
                                  className="btn btn-secondary"
                                  to={sub && sub.applicationLetterUrl}
                                >
                                  Surat Permohonan
                                </Link>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">
                      Tidak ada data pengajuan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SubmissionPage;
