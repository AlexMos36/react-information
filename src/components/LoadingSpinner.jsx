import React from "react";
import { ClipLoader } from "react-spinners";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <ClipLoader color="#3498db" size={60} />
    </div>
  );
};

export default LoadingSpinner;
