import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const FormEditUser = () => {
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
        isTGR: Tgr,
        amountTGR: Tgr ? amountTGR : 0,
        role: Role,
        status: Tgr ? "tgr" : "NULL", // Mengubah status menjadi "tgr" jika Tgr dipilih
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
                <label className="label">Ada TGR?</label>
                <div className="control">
                  <select
                    className="w-full input input-bordered"
                    value={Tgr ? "1" : "0"}
                    onChange={(e) => {
                      const isTGR = e.target.value === "1";
                      setTgr(isTGR);
                      if (!isTGR) {
                        setAmountTGR("");
                      }
                      setStatus(isTGR ? "tgr" : "NULL"); // Mengatur status sesuai dengan nilai Tgr
                    }}
                  >
                    <option value="0">Tidak</option>
                    <option value="1">Ya</option>
                  </select>
                </div>
              </div>
              {Tgr && (
                <div className="field">
                  <label className="label">Jumlah TGR</label>
                  <div className="control">
                    <input
                      type="number"
                      className="w-full input input-bordered"
                      value={amountTGR}
                      onChange={(e) => setAmountTGR(e.target.value)}
                      placeholder="0"
                    />
                  </div>
                </div>
              )}
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
              <div className="field">
                <label className="label">Role</label>
                <div className="control">
                  <select
                    className="w-full input input-bordered"
                    value={Role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
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

export default FormEditUser;
