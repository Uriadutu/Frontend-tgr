import React from "react";
import axios from "axios";
import ToastNotification from "../toast/toast-notification";

const ModalDeleteSKPD = ({ setIsOpenModalDelete, id, fetchSKPD }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`http://localhost:5000/skpd/${id}`);
      setIsOpenModalDelete(false);
      fetchSKPD();
      ToastNotification.success("Data berhasila dihapus");
    } catch (error) {
      console.error(error);
      ToastNotification.error("Data gagal dihapus");
    }
  };

  return (
    <div
      id="default-modal"
      tabIndex="-1"
      aria-hidden="true"
      className="fixed inset-0 flex items-center justify-center bg-gray-500 z-top bg-opacity-30"
    >
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-between p-4 border-b rounded-t">
          <h3 className="text-xl font-semibold text-gray-900">Edit SKPD</h3>
          <button
            onClick={() => setIsOpenModalDelete(false)}
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
          <p className="text-xl text-gray-500">
            Apakah anda yakin ingin menghapus SKPD ini?
          </p>
        </div>
        <div className="flex items-center justify-end p-4 space-x-3 border-t border-gray-200 rounded-b">
          <button
            data-modal-hide="default-modal"
            type="button"
            onClick={(e) => handleSubmit(e)}
            className="btn btn-primary"
          >
            Ya
          </button>
          <button
            onClick={() => setIsOpenModalDelete(false)}
            data-modal-hide="default-modal"
            type="button"
            className="btn"
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDeleteSKPD;
