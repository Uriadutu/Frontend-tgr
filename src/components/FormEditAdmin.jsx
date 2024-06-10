import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const FormEditAdmin = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const [Nama, setNama] = useState("");
  const [Nip, setNip] = useState("");
  const [Tgr, setTgr] = useState(false);
  const [amountTGR, setAmountTGR] = useState("");
  const [Password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [Role, setRole] = useState("");
  const [Status, setStatus] = useState("NULL"); // Tambahkan state untuk status

  const getUserById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/users/${id}`);
      const userData = response.data;
      setNama(userData.name);
      setNip(userData.nip);
      setTgr(userData.isTGR);
      setAmountTGR(userData.amountTGR || "");
      setPassword(""); // Tidak memuat kata sandi pengguna untuk keamanan
      setconfirmPassword(""); // Tidak memuat kata sandi pengguna untuk keamanan
      setRole(userData.role);
      setStatus(userData.status); // Atur status dari data pengguna
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    getUserById(id);
  }, [id]);

  const updateUser = async (e) => {
    e.preventDefault();

    try {
      await axios.patch(`http://localhost:5000/users/${id}`, {
        name: Nama,
        nip: Nip,
        password: Password,
        confirmPassword: confirmPassword,
      });
      navigate("/users");
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.msg || "Error updating user");
      } else {
        setMessage("Error updating user");
      }
      console.error("Error updating user:", error);
    }
  };

  return (
    <div>
      <h2 className="">Edit Data Pengguna</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={updateUser}>
              <div className="field">
                <label className="label">Nama</label>
                <div className="control">
                  <input
                    type="text"
                    className="w-full input input-bordered"
                    value={Nama}
                    onChange={(e) => setNama(e.target.value)}
                    placeholder="Nama"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">NIP</label>
                <div className="control">
                  <input
                    type="text"
                    className="w-full input input-bordered"
                    value={Nip}
                    onChange={(e) => setNip(e.target.value)}
                    placeholder="123456789"
                  />
                </div>
              </div>
              
              <div className="field">
                <label className="label">Kata Sandi</label>
                <div className="control">
                  <input
                    type="password"
                    className="w-full input input-bordered"
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="******"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Konfirmasi Kata Sandi</label>
                <div className="control">
                  <input
                    type="password"
                    className="w-full input input-bordered"
                    value={confirmPassword}
                    onChange={(e) => setconfirmPassword(e.target.value)}
                    placeholder="******"
                  />
                </div>
              </div>

              <div className="mt-8">
                <div className="control">
                  <button type="submit" className="btn btn-primary">
                    Simpan
                  </button>
                </div>
              </div>
            </form>
            {message && <p className="has-text-danger">{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormEditAdmin;
