import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ToastNotification from "./toast/toast-notification";

const FormAddUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    nip: "",
    password: "",
    isTGR: false,
    amountTGR: 0,
    confirmPassword: "",
    role: "",
    skpdId: 3,
    status: "NULL",
  });

  const navigate = useNavigate();
  const [skpdData, setSkpdData] = useState([]);

  useEffect(() => {
    const fetchSKPD = async () => {
      try {
        const response = await axios.get("http://localhost:5000/skpd");
        setSkpdData(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSKPD();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      let updatedValue = name === "isTGR" ? value === "ya" : value;
      let updatedStatus = prevData.status;

      if (name === "isTGR") {
        updatedStatus = value === "ya" ? "tgr" : "NULL";
      }

      return {
        ...prevData,
        [name]: updatedValue,
        status: updatedStatus,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, nip, password, confirmPassword, role, isTGR, amountTGR } =
      formData;

    if (
      !name ||
      !nip ||
      !password ||
      !confirmPassword ||
      !role ||
      (isTGR && !amountTGR)
    ) {
      ToastNotification.error("Semua data harus diisi");
      return;
    }

    if (password !== confirmPassword) {
      ToastNotification.error("Password tidak sama");
      return;
    }

    try {
      await axios.post("http://localhost:5000/users", formData);
      navigate("/users");
    } catch (error) {
      if (error.response) {
        ToastNotification.error(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <h2 className="">Tambah Pengguna Baru</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={handleSubmit}>
              <div className="field">
                <label className="label">Nama</label>
                <div className="control">
                  <input
                    type="text"
                    name="name"
                    className="w-full input input-bordered"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Nama"
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">NIP</label>
                <div className="control">
                  <input
                    type="text"
                    name="nip"
                    className="w-full input input-bordered"
                    value={formData.nip}
                    onChange={handleChange}
                    placeholder="123456789"
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">SKPD</label>
                <div className="control">
                  <select
                    name="skpdId"
                    className="w-full input input-bordered"
                    value={formData.skpdId}
                    onChange={handleChange}
                  >
                    {skpdData.map(
                      (skpd) =>
                        skpd.name !== "NULL" && (
                          <option key={skpd.id} value={skpd.id}>
                            {skpd.name}
                          </option>
                        )
                    )}
                  </select>
                </div>
              </div>

              <div className="field">
                <label className="label">Ada TGR?</label>
                <div className="control">
                  <select
                    name="isTGR"
                    className="w-full input input-bordered"
                    value={formData.isTGR ? "ya" : "tidak"}
                    onChange={handleChange}
                  >
                    <option value="tidak">Tidak</option>
                    <option value="ya">Ya</option>
                  </select>
                </div>
              </div>

              {formData.isTGR && (
                <div className="field">
                  <label className="label">Jumlah TGR</label>
                  <div className="control">
                    <input
                      type="number"
                      name="amountTGR"
                      className="w-full input input-bordered"
                      value={formData.amountTGR}
                      onChange={handleChange}
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
                    name="password"
                    className="w-full input input-bordered"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="******"
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Konfirmasi Kata Sandi</label>
                <div className="control">
                  <input
                    type="password"
                    name="confirmPassword"
                    className="w-full input input-bordered"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="******"
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Role</label>
                <div className="control">
                  <select
                    name="role"
                    className="w-full input input-bordered"
                    value={formData.role}
                    onChange={handleChange}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormAddUser;
