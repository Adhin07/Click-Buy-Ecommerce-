import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import Context from "./context/index.js";
import { fetchUserDetails } from "./apis/fetching.js";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "./common/index.js";
import { setCartProductCount } from "./store/userSlice.js";

function App() {
  const dispatch = useDispatch();
  const cartProductCount = useSelector((state) => state.user.cartProductCount); 


  // Fetch cart product count
  const fetchUserAddToCart = async () => {
    try {
      const dataResponse = await fetch(SummaryApi.addToCartProductCount.url, {
        method: SummaryApi.addToCartProductCount.method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      const data = await dataResponse.json();

      if (data.success) {
        dispatch(setCartProductCount(data.data.count)); 
      }
    } catch (error) {
      console.error("Error fetching cart count:", error);
    }
  };

  useEffect(() => {
    fetchUserDetails({ dispatch });
    fetchUserAddToCart();
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <Context.Provider
        value={{
          fetchUserDetails,
          cartProductCount,
          fetchUserAddToCart,
        }}
      >
        <ToastContainer position="top-center" />
        <Header />
        <main className="min-h-[calc(100vh-120px)] pt-16">
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </div>
  );
}

export default App;
