import React, { useEffect, useState } from "react";
import { formatDate } from "../utils/helper";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getMe } from "../features/authSlice";
import axios from "axios";

const SlipUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);
  const [SubsAdmin, setSubsAdmin] = useState([]);

  const [lihat, setLihat] = useState(null);

  const { id } = useParams();

  const getSubbyId = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/slips/user/${userId}`
      );
      setSubsAdmin(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, user, navigate]);
  const [total, setTotal] = useState([]);
  useEffect(() => {
    getSubbyId(id);
  }, [id]);


  const hapus = async (idSlip) => {
    try {
        await axios.delete(`http://localhost:5000/slips/${idSlip}`);
        getSubbyId(id);
    } catch (error) {
        console.log(error);
    }
  }
  return (
    <>
      <div className="">
        {user && user.role === "admin" && (
          <>
            <Link to={"/riwayatslip"} className="btn break-normal">
              Kembali
            </Link>
            <div className="w-full mt-8 overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Nama</th>
                    <th>NIP</th>
                    <th>Status</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {SubsAdmin.map((item, index) => (
                    <React.Fragment key={item.uuid}>
                      <tr className="items-center">
                        <td>{index + 1}</td>
                        <td>{item && item.user && item.user.name}</td>
                        <td>{item && item.user && item.user.nip}</td>
                        {/* <td>ha</td> */}
                        <td>
                          <p
                            className={` ${
                              item.status === "Diterima"
                                ? "badge p-2 bg-green-600 text-white"
                                : item.status === "Ditolak"
                                ? "badge p-2 bg-red-600 text-white"
                                : "badge p-2 bg-yellow-600 text-white"
                            }`}
                          >
                            {item.status}
                          </p>
                        </td>
                        <td className="flex items-center gap-3 ">
                          <Link
                            className="btn btn-secondary"
                            to={item && item.url}
                          >
                            Lihat
                          </Link>
                          <button type="button" className="btn btn-primary"
                          onClick={()=> hapus(item && item.id)}>
                            Hapus
                          </button>
                        </td>
                      </tr>
                     
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SlipUser;
