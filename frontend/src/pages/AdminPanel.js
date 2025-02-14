import React, { useEffect } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import ROLE from "../common/role";

function AdminPanel() {
  const { name, role, profilePic } = useSelector((state) => state?.user?.user) || {};
  const navigate = useNavigate();

  useEffect(() => {
    if (role !== ROLE.ADMIN) navigate("/");
  }, [role, navigate]);

  return (
    <div className="min-h-[calc(100vh-120px)] md:flex hidden">
      {/* Sidebar */}
      <aside className="bg-white w-full max-w-56 shadow-md">
        <div className="h-32 flex flex-col justify-center items-center">
          {profilePic ? (
            <img src={profilePic} className="w-20 h-20 rounded-full" alt={name} />
          ) : (
            <FaRegCircleUser className="text-5xl" />
          )}
          <p className="capitalize text-lg font-semibold">{name}</p>
          <p className="text-sm">{role}</p>
        </div>

        {/* Navigation */}
        <nav className="grid p-4 space-y-2">
          {["All Users", "All Products", "All Orders"].map((item, index) => (
            <Link
              key={index}
              to={item.toLowerCase().replace(/\s+/g, "-")}
              className="px-2 py-1 hover:bg-slate-100 rounded-md transition"
            >
              {item}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="w-full h-full p-4">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminPanel;
