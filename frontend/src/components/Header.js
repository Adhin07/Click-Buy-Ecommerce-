import React, { useState } from "react";
import Logo from "../assest/click & buy.png";
import { GrSearch } from "react-icons/gr";
import { FaShoppingCart } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import ROLE from "../common/role";

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const cartProductCount = useSelector(
    (state) => state?.user?.cartProductCount || 0
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [menuDisplay, setMenuDisplay] = useState(false);
  const [search, setSearch] = useState(
    new URLSearchParams(location?.search).get("q") || ""
  );

  const handleLogout = async () => {
    try {
      const response = await fetch(SummaryApi.logout_user.url, {
        method: SummaryApi.logout_user.method,
        credentials: "include",
      });

      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
        dispatch(setUserDetails(null));
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("An error occurred during logout.");
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearch(query);
    navigate(query ? `/search?q=${query}` : "/search");
  };

  return (
    <header className="h-16 shadow-md bg-white fixed w-full z-40">
      <div className="h-full container mx-auto flex items-center px-4 justify-between">
        {/* Logo */}
        <Link to={"/"}>
        <img src={Logo} alt="logo" width={80} height={80} className="rounded-md"/>
        </Link>

        {/* Search Bar */}
        <div className="hidden lg:flex items-center w-full max-w-md border rounded-full focus-within:shadow-md pl-2">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full outline-none p-2 bg-transparent"
            value={search}
            onChange={handleSearch}
          />
          <div className="text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white">
            <GrSearch />
          </div>
        </div>

        {/* Right Section: User Profile & Cart */}
        <div className="flex items-center gap-6">
          {/* Profile Icon */}
          {user?._id && (
            <div className="relative">
              <button
                className="text-3xl cursor-pointer"
                onClick={() => setMenuDisplay(!menuDisplay)}
              >
                {user?.profilePic ? (
                  <img
                    src={user?.profilePic}
                    className="w-10 h-10 rounded-full"
                    alt={user?.name}
                  />
                ) : (
                  <FaRegCircleUser />
                )}
              </button>

              {menuDisplay && (
                <div className="absolute bg-white shadow-md rounded-md right-0 mt-2 w-40">
                  <nav className="flex flex-col text-sm">
                    {user?.role === ROLE.ADMIN && (
                      <Link
                        to={"admin-panel/all-products"}
                        className="p-2 hover:bg-gray-100"
                      >
                        Admin Panel
                      </Link>
                    )}
                    <Link to={"/order"} className="p-2 hover:bg-gray-100">
                      Orders
                    </Link>
                   
                  </nav>
                </div>
              )}
            </div>
          )}

          {/* Cart Icon */}
          {user?._id && (
            <Link to={"/cart"} className="relative text-2xl">
              <FaShoppingCart />
              {cartProductCount > 0 && (
                <div className="bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full absolute -top-2 -right-3">
                  {cartProductCount}
                </div>
              )}
            </Link>
          )}

          {/* Login Button */}
          {!user?._id ? (
            <Link
              to={"/login"}
              className="px-4 py-1 rounded-full text-white bg-red-600 hover:bg-red-700"
            >
              Login
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
