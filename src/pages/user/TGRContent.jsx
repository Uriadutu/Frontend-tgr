import React, { useState } from "react";
import axios from "axios";
import ToastNotification from "../../components/toast/toast-notification";

const TGRContent = ({ user }) => {
  const [slip, setSlip] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setSlip(file);
    } else {
      e.target.value = null;
      ToastNotification.error("Tolong unggah file PDF.");
    }
  };

  const uploadSlip = async (e) => {
    e.preventDefault();
    if (!slip) {
      ToastNotification.error("Tolong unggah file PDF sebelum mengirim.");
      return;
    }

    const formData = new FormData();
    formData.append("file", slip);
    formData.append("userId", user.id);

    try {
      await axios.post("http://localhost:5000/slips", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      ToastNotification.success("File berhasil diunggah.");
      window.location.reload();
    } catch (error) {
      console.error("Kesalahan saat mengunggah file:", error);
      ToastNotification.error(
        "Terjadi kesalahan saat mengunggah file. Silakan coba lagi."
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-4">
      <form onSubmit={uploadSlip}>
        <div className="w-full max-w-md p-6 bg-white rounded-lg ">
          <div className="card-title">
            <h3 className="mb-4 text-xl font-semibold">Halo, {user.name}</h3>
          </div>
          <div className="card-body">
            <p className="mb-2 text-gray-600">
              Anda masih memiliki TGR berjumlah Rp. {user.amountTGR}
            </p>
            <p className="mb-4 text-gray-500">
              Silakan mengunggah slip pembayaran TGR, jika Anda sudah membayar.
            </p>
            <label
              htmlFor="paymentSlip"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Unggah slip pembayaran TGR (hanya PDF):
            </label>
            <input
              type="file"
              id="paymentSlip"
              name="paymentSlip"
              accept="application/pdf"
              className="w-full max-w-xs mb-4 file-input file-input-bordered"
              onChange={handleFileChange}
            />
          </div>
          <div className="card-actions">
            <button type="submit" className="w-full btn btn-primary">
              Simpan
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TGRContent;
