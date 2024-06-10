import React, { useEffect, useState } from "react";
import axios from "axios";
const ModalKeteranganPengajuan = ({ setModalKeterangan, IdSubs }) => {
  const [subs, setSubs] = useState([]);

  const getSubs = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/submissions/${id}`);
      setSubs(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSubs(IdSubs);
  }, [IdSubs]);

  return (
    <div
      id="default-modal"
      tabIndex="-1"
      aria-hidden="true"
      className="fixed inset-0 flex items-start pt-6 justify-center bg-gray-500 z-top bg-opacity-30"
    >
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-between p-4 border-b rounded-t">
          <h3 className="text-xl font-semibold text-gray-900">Keterangan</h3>
          <button
            onClick={() => setModalKeterangan(false)}
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
          <p>{subs && subs.keterangan}</p>
        </div>
      </div>
    </div>
  );
};

export default ModalKeteranganPengajuan;
