import React, { useEffect, useState } from "react";
import { formatDate } from "../utils/helper";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";
import axios from "axios";

const Riwayatitem = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);
  const [SubsAdmin, setSubsAdmin] = useState([]);
  const id = user && user.id;

   const getSubbyId = async (userId) => {
     try {
       const response = await axios.get(
         `http://localhost:5000/submissions/user/${userId}`
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

  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [userPage] = useState(10);
  const [total, setTotal] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getUsers();
    getTotalUser();
    getSubbyId(id);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchText]);

  const getUsers = async () => {
    const response = await axios.get("http://localhost:5000/users/role/user");
    setUsers(response.data);
  };

  const getTotalUser = async () => {
    const response = await fetch("http://localhost:5000/users");
    const data = await response.json();
    const jumlahUser = data.filter((item) => item.role === "user").length;

    setTotal(jumlahUser);
  };

  const filterCariUser = users.filter((item) => {
    const lowerCaseSearchText = searchText.toLowerCase();
    return (
      item.name.toLowerCase().includes(lowerCaseSearchText) ||
      (item.username &&
        item.username.toLowerCase().includes(lowerCaseSearchText))
    );
  });

  const indexOfLastUser = currentPage * userPage;
  const indexOfFirstUser = indexOfLastUser - userPage;
  const currentUser = filterCariUser.slice(indexOfFirstUser, indexOfLastUser);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filterCariUser.length / userPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
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
                {SubsAdmin.map((item, index) => (
                  <tr key={index} className="p-2">
                    <th>{index + 1}</th>
                    <td>
                      Fotokopi KTP, Surat Rekomendasi dan Surat Permohonan
                    </td>
                    <td
                      className={` ${
                        item.status === "Diterima"
                          ? "badge bg-green-600 text-white"
                          : item.status === "Ditolak"
                          ? "badge bg-red-600 text-white"
                          : "badge bg-yellow-600 text-white"
                      }`}
                    >
                      {item.status}
                    </td>
                    <td>{formatDate(item.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {user && user.role === "admin" && (
          <>
            <div className="flex items-center justify-start">
              <div>
                <input
                  type="text"
                  placeholder="Cari..."
                  className="w-full input input-bordered"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full mt-8 overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Nama</th>
                    <th>NIP</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {currentUser.map((user, index) => (
                    <tr key={user.uuid}>
                      <td>{index + 1}</td>
                      <td>{user.name}</td>
                      <td>{user.nip}</td>
                      <td className="flex items-center space-x-2 place-content-center">
                        <Link
                          to={`/users/lihat/${user && user.id}`}
                          className="btn btn-secondary"
                        >
                          Lihat
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <nav
                className="flex justify-between items-center mt-4"
                role="navigation"
                aria-label="pagination"
              >
                <p className="font-semibold">Total User : {total}</p>
                <ul className="flex gap-4 items-center">
                  {pageNumbers.map((number) => (
                    <li key={number}>
                      <a
                        className={`pagination-link ${
                          currentPage === number
                            ? "btn btn-primary"
                            : "btn break-normal"
                        }`}
                        aria-label={`Page ${number}`}
                        onClick={() => paginate(number)}
                      >
                        {number}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Riwayatitem;
