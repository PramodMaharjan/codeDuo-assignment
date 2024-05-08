import React from "react";
import { NavLink } from "react-router-dom";

const PageNotFound: React.FC = () => {
  return (
    <div className="mt-8 flex flex-col items-center justify-center">
      <h2 className="mb-4 text-3xl font-bold text-red-600">Page Not Found!</h2>
      <p className="text-lg text-gray-700">
        Go to the{" "}
        <NavLink to="/" className="text-blue-500 hover:underline">
          Homepage
        </NavLink>
        .
      </p>
    </div>
  );
};

export default PageNotFound;
