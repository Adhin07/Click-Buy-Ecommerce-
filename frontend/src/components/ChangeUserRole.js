import React, { useState } from "react";
import ROLE from "../common/role";
import { IoMdCloseCircle } from "react-icons/io";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const ChangeUserRole = ({ name, email, role, userId, onClose, callFun }) => {
  const [userRole, setUserRole] = useState(role);
  const [loading, setLoading] = useState(false);

  const handleOnChangeSelect = (e) => {
    setUserRole(e.target.value);
  };

  const updateUserRole = async () => {
    setLoading(true);
    try {
      const fetchResponse = await fetch(SummaryApi.updateUser.url, {
        method: SummaryApi.updateUser.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          role: userRole,
        }),
      });

      const responseData = await fetchResponse.json();

      if (responseData.success) {
        toast.success(responseData.message);
        callFun();
        onClose();
      } else {
        toast.error(responseData.message || "Failed to update role");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
      <div className="bg-white shadow-lg p-6 w-full max-w-sm rounded-md relative">
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-2xl text-gray-500 hover:text-red-600"
          onClick={onClose}
        >
          <IoMdCloseCircle />
        </button>

        <h1 className="pb-4 text-xl font-semibold text-gray-800">
          Change User Role
        </h1>
        <p className="text-gray-700">
          <span className="font-medium">Name:</span> {name}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Email:</span> {email}
        </p>

        {/* Role Selection */}
        <div className="flex items-center justify-between my-5">
          <p className="text-gray-800 font-medium">Role:</p>
          <select
            className="border px-4 py-1 rounded-md bg-white cursor-pointer focus:outline-none"
            value={userRole}
            onChange={handleOnChangeSelect}
          >
            {Object.values(ROLE).map((el) => (
              <option value={el} key={el}>
                {el}
              </option>
            ))}
          </select>
        </div>

        {/* Change Role Button */}
        <button
          className="w-full py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition-all"
          onClick={updateUserRole}
          disabled={loading}
        >
          {loading ? "Updating..." : "Change Role"}
        </button>
      </div>
    </div>
  );
};

export default ChangeUserRole;
