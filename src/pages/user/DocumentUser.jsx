import React, { useState } from "react";
import axios from "axios";
import ToastNotification from "../../components/toast/toast-notification";

const DocumentUser = ({ user }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
    } else {
      e.target.value = null; // Reset the input value
      ToastNotification.error("Tolong unggah file PDF.");
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      ToastNotification.error("Tolong unggah file PDF sebelum mengirim.");
      return;
    }

    const formData = new FormData();
    formData.append("paymentSlip", selectedFile);

    try {
      const response = await axios.post("/upload-endpoint", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("File berhasil diunggah:", response.data);
      alert("Slip pembayaran TGR telah disimpan.");
    } catch (error) {
      console.error("Kesalahan saat mengunggah file:", error);
      ToastNotification.error(
        "Terjadi kesalahan saat mengunggah file. Silakan coba lagi."
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-4">
      <div className="w-full max-w-md p-6 bg-white rounded-lg ">
        <div className="card-title">
          <h3 className="mb-4 text-xl font-semibold">Halo, {user.name}</h3>
        </div>
        <div className="card-body">
          <p className="mb-2 text-gray-600">
            Anda sudah tidak memiliki TGR dan sudah mengajukan permohonan bebas
            TGR.
          </p>
        </div>
        <div className="card-actions">
          <button className="w-full btn btn-primary" onClick={handleSubmit}>
            Unduh dokumen bebas TGR
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentUser;
