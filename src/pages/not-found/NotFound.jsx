import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white text-gray-800">
      <div className="text-center p-8 border border-gray-200 shadow-md rounded-lg max-w-md">
        <h1 className="text-6xl font-extrabold text-blue-600 mb-4">404</h1>
        <p className="text-lg font-medium text-gray-600 mb-6">
          We can't find the page you're looking for.
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Return to Homepage
        </button>
      </div>
    </div>
  );
};

export default NotFound;
