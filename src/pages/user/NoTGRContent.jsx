import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NoTGRContent = ({ user }) => {
  const navigate = useNavigate();
  const [ktp, setKtp] = useState(null);
  const [msg, setMsg] = useState("");
  const [rekom, setRekom] = useState(null);
  const [app, setApp] = useState(null);

  const loadRekom = (e) => {
    const selectedFile = e.target.files[0];
    setRekom(selectedFile);
  };

  const loadApp = (e) => {
    const selectedFile = e.target.files[0];
    setApp(selectedFile);
  };

  const loadKtp = (e) => {
    const selectedFile = e.target.files[0];
    setKtp(selectedFile);
  };

  const uploadSubmission = async (e) => {
    e.preventDefault();
    if (!ktp || !app || !rekom) {
      setMsg("Pilih file terlebih dahulu");
      return;
    }
    const formData = new FormData();
    formData.append("ktpFileName", ktp);
    formData.append("recommendationLetterFileName", rekom);
    formData.append("applicationLetterFileName", app);

    try {
      const response = await axios.post(
        "http://localhost:5000/submissions",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 201) {
        navigate("/dashboard");
        window.location.reload();
      } else {
        setMsg("Gagal membuat submission");
      }
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      } else {
        setMsg("Gagal membuat submission");
      }
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-4">
      <form onSubmit={uploadSubmission}>
        <div className="card">
          <h2 className="mb-4 card-title">Halo {user.name}</h2>
          <div className="card-body">
            {msg && <p className="mb-4 text-red-500">{msg}</p>}
            <p className="mb-2 text-gray-600">Anda sudah tidak ada TGR</p>
            <p className="mb-4 text-gray-500">
              Silahkan mengunggah dokumen yang diperlukan:
            </p>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="ktp"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  FK KTP:
                </label>
                <input
                  type="file"
                  id="ktp"
                  name="ktp"
              accept="application/pdf"
                  onChange={loadKtp}
                  className="w-full max-w-xs file-input file-input-bordered"
                />
              </div>
              <div>
                <label
                  htmlFor="recommendationLetter"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  FK Surat Rekomendasi SKPD:
                </label>
                <input
                  type="file"
                  id="recommendationLetter"
                  name="recommendationLetter"
              accept="application/pdf"
                  onChange={loadRekom}
                  className="w-full max-w-xs file-input file-input-bordered"
                />
              </div>
              <div>
                <label
                  htmlFor="applicationLetter"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Surat Permohonan:
                </label>
                <input
                  type="file"
                  id="applicationLetter"
                  name="applicationLetter"
              accept="application/pdf"
                  onChange={loadApp}
                  className="w-full max-w-xs file-input file-input-bordered"
                />
              </div>
            </div>
          </div>
          <div className="card-actions">
            <button type="submit" className="w-full btn b btn-primary">
              Simpan
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NoTGRContent;
