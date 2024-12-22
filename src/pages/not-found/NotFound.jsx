import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center h-screen dark:bg-gray-900 text-gray-100">
      <div className="text-center dark:bg-gray-800 p-10 rounded-lg shadow-lg">
        <h1 className="text-9xl text-red-500 font-bold mb-4">404</h1>
        <p className="text-lg text-gray-400 mb-6">
          Oops! The page you are looking for does not exist.
        </p>
        <button
          onClick={() => navigate("/")}
          className="text-white bg-red-500 hover:bg-red-600 px-6 py-3 rounded-lg text-xl transition-colors duration-300"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
