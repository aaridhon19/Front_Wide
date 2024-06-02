"use client";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const username = localStorage.getItem("username");

  // Function to handle logout
  const logout = () => {
    // Clear login status and redirect to login page
    Swal.fire({
      title: "Yakin?",
      text: "Mau Keluar!!!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Tidak",
      confirmButtonText: "Iya, Logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Logout!",
          text: "Berhasil Logout.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          localStorage.removeItem("isLoggedIn");
          localStorage.removeItem("username");
          setIsLoggedIn(false);
          window.location.href = "/login";
        });
      }
    });
  };

  // Function to check login status
  const checkLoginStatus = () => {
    const loggedInStatus = localStorage.getItem("isLoggedIn");
    if (loggedInStatus === "true") {
      setIsLoggedIn(true);
    }
  };

  // Call checkLoginStatus when component mounts
  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a href="/">Home</a>
            </li>
            {isLoggedIn && (
              <li>
                <a href="/product/add">Add Product</a>
              </li>
            )}
            {isLoggedIn && (
              <li>
                <a href="/cart">Cart</a>
              </li>
            )}
            {isLoggedIn && (
              <li>
                <a href="/order">Order</a>
              </li>
            )}
          </ul>
        </div>
        <div className="flex mr-2">
          {/* <span className="mr-4">{isLoggedIn ? `Halo, ${username}` : "Selamat Datang"}</span> */}
          {isLoggedIn ? (
            <button onClick={logout}>Logout</button>
          ) : (
            <a href="/login">Login</a>
          )}
        </div>
      </div>
    </>
  );
}
