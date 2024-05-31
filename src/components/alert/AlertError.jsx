import React from "react";

const AlertError = ({ message }) => {
  return (
    <div className="fixed flex items-center px-4 py-3 font-semibold text-center transform -translate-x-1/2 -translate-y-1/2 rounded-md w-max z-index-top top-10 left-1/2">
      <div role="alert" className="text-white alert alert-error">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 stroke-current shrink-0"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>{message}</span>
      </div>
    </div>
  );
};

export default AlertError;
