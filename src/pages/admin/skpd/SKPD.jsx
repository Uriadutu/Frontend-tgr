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

  useEffect(() => {
    fetchSKPD();
  }, []);

  const handleEdit = (itemId) => {
    setId(itemId);
    setIsOpenModalEdit(true);
  };

  const handleDelete = (itemId) => {
    setId(itemId);
    setIsOpenModalDelete(true);
  };

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
            {data.map((item, index) => (
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
      </div>
    </Layout>
  );
};

export default SKPD;
