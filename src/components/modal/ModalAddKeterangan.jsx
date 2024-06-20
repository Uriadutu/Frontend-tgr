import React, { useState } from "react";
import axios from "axios";

const ModalAddKeterangan = ({ idSlip, setAddKet }) => {
  const [keterangan, setKeterangan] = useState("");
  const TolakSlip = async () => {
    try {
      await axios.patch(`http://localhost:5000/slips/tolak/${idSlip}`, {
        keterangan: keterangan,
      });
      setAddKet(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={TolakSlip}>
      <div
        id="default-modal"
        tabIndex="-1"
        aria-hidden="true"
        className="fixed inset-0 flex items-start pt-6 justify-center bg-gray-500 z-top bg-opacity-30"
      >
        <div className="w-full max-w-lg bg-white rounded-lg shadow-lg">
          <div className="flex items-center justify-between p-4 border-b rounded-t">
            <h3 className="text-xl font-semibold text-gray-900">Tambah Keterangan</h3>
            <button
              onClick={() => setAddKet(false)}
              type="button"
              className="inline-flex items-center justify-center w-8 h-8 text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900 ms-auto"
              data-modal-hide="default-modal"
            >
               
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-4 space-y-4">
            <div className="mb-6">
              <label htmlFor="name" className="label">
                Keterangan
              </label>
              <textarea
                rows={8}
                value={keterangan}
                onChange={(e) => setKeterangan(e.target.value)}
                type="text"
                id="name"
                className="w-full input input-bordered resize-none h-[200px]"
              />
            </div>
          </div>
          <div className="flex items-center justify-end p-4 space-x-3 border-t border-gray-200 rounded-b">
            <button
              data-modal-hide="default-modal"
              type="submit"
              className="btn btn-primary"
            >
              Simpan
            </button>
            <button
              onClick={() => setAddKet(false)}
              data-modal-hide="default-modal"
              type="button"
              className="btn"
            >
              Batal
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ModalAddKeterangan;
