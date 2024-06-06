import React, { useEffect, useState } from "react";
import Layout from "../../Layout";
import ModalAddSKPD from "../../../components/modal/ModalAddSKPD";
import ModalEdiSKPD from "../../../components/modal/ModalEditSKPD";
import axios from "axios";
import ModalDeleteSKPD from "../../../components/modal/ModalDeleteSKPD";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../../../features/authSlice";
import { useNavigate } from "react-router-dom";

const SKPD = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);
  const [isOpenModalAdd, setIsOpenModalAdd] = useState(false);
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [id, setId] = useState("");
  const [data, setData] = useState([]);
  const [userPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [total, setTotalSkpd] = useState([])

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
    if (user && user.role !== "admin") {
      navigate("/dashboard");
    }
  }, [isError, user, navigate]);
  const fetchSKPD = async () => {
    try {
      const response = await axios.get("http://localhost:5000/skpd");
      setData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };
  
   const getTotalskpd = async () => {
     const response = await fetch("http://localhost:5000/users");
     const data = await response.json();
     setTotalSkpd(data.length);
   };

  useEffect(() => {
    fetchSKPD();
    getTotalskpd();
  }, []);

  const handleEdit = (itemId) => {
    setId(itemId);
    setIsOpenModalEdit(true);
  };

  const handleDelete = (itemId) => {
    setId(itemId);
    setIsOpenModalDelete(true);
  };
   useEffect(() => {
     setCurrentPage(1);
   }, [searchText]);


  const filterCariUser = data.filter((item) => {
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
    <Layout>
      {isOpenModalAdd && (
        <ModalAddSKPD
          setIsOpenModalAdd={setIsOpenModalAdd}
          fetchSKPD={fetchSKPD}
        />
      )}
      {isOpenModalEdit && (
        <ModalEdiSKPD
          setIsOpenModalAdd={setIsOpenModalEdit}
          id={id}
          fetchSKPD={fetchSKPD}
        />
      )}
      {isOpenModalDelete && (
        <ModalDeleteSKPD
          setIsOpenModalDelete={setIsOpenModalDelete}
          id={id}
          fetchSKPD={fetchSKPD}
        />
      )}
      <div className="flex justify-end">
        <button
          onClick={() => setIsOpenModalAdd(true)}
          className="btn btn-primary"
        >
          Tambah SKPD
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Nama</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentUser.map((item, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{item.name}</td>
                <td className="flex items-center justify-center space-x-4">
                  <button className="btn" onClick={() => handleEdit(item.uuid)}>
                    Edit
                  </button>
                  <button
                    className="btn btn-error"
                    onClick={() => handleDelete(item.uuid)}
                  >
                    Hapus
                  </button>
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
    </Layout>
  );
};

export default SKPD;
