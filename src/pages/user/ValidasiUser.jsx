// ValidasiUser.js
import React from "react";

const ValidasiUser = ({ user }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-4">
      <div className="card">
        <h2 className="mb-4 card-title">Halo {user.name}</h2>
        <div className="card-body">
          <p className="mb-2 text-gray-600">Permohonan Anda sedang diproses.</p>
          <p className="mb-4 text-gray-500">
            Silakan tunggu sampai permohonan Anda divalidasi.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ValidasiUser;
