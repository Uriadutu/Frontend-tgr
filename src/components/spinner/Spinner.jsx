import React from "react";

const Spinner = ({ percentage }) => {
  return (
    <>
      <div className="relative w-20 h-20">
        <svg
          className="w-full h-full"
          width="36"
          height="36"
          viewBox="0 0 36 36"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="18"
            cy="18"
            r="16"
            fill="none"
            className="text-gray-200 stroke-current dark:text-gray-700"
            strokeWidth="2"
          ></circle>
          <g className="origin-center transform -rotate-90">
            <circle
              cx="18"
              cy="18"
              r="16"
              fill="none"
              className="text-red-600 stroke-current "
              strokeWidth="2"
              strokeDasharray="100"
              strokeDashoffset={100 - percentage}
            ></circle>
          </g>
        </svg>
        <div className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 start-1/2">
          <span className="text-lg font-bold text-center text-gray-800 dark:text-white">
            {percentage}%
          </span>
        </div>
      </div>
    </>
  );
};

export default Spinner;
