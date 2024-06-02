"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function ListCart() {
  const [cart, setCart] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);

  useEffect(() => {
    getCart();
    checkLoginStatus();
  }, []);

  const getCart = async () => {
    try {
      const response = await axios.get("http://localhost:4000/cart");
      setCart(response.data);
    } catch (error) {
      console.log("Error fetching cart data:", error);
    }
  };

  const deleteCart = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/cart/${id}`);
      getCart();
    } catch (error) {
      console.log(error);
    }
  };

  const checkLoginStatus = () => {
    const loggedInStatus = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(loggedInStatus === "true");
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(value);
  };

  const handleCheckboxChange = (item) => {
    setCheckedItems((prevCheckedItems) =>
      prevCheckedItems.includes(item)
        ? prevCheckedItems.filter((i) => i !== item)
        : [...prevCheckedItems, item]
    );

    // Tampilkan CartId ketika checklist diklik
    console.log("CartId:", item.id);
  };

  const getTotalPrice = () => {
    return checkedItems.reduce((total, item) => {
      return total + item.Product.price * item.quantity;
    }, 0);
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    try {
      if (checkedItems.length === 0) {
        Swal.fire({
          icon: "error",
          title: "No items selected",
          text: "Please select at least one item to place an order",
        });
        return;
      }

      const cartIds = checkedItems.map((item) => item.id);
      await axios.post("http://localhost:4000/order", {
        CartId: cartIds,
      });
      // Tampilkan SweetAlert2 setelah pesanan berhasil ditempatkan
      Swal.fire({
        icon: "success",
        title: `Order placed successfully`,
        showConfirmButton: false,
        timer: 1500,
      }),
        // Bersihkan item yang dipilih setelah pesanan berhasil ditempatkan
        setCheckedItems([]);
    } catch (error) {
      console.log("Error placing order:", error);
      Swal.fire({
        icon: "error",
        title: "Place Order Must Be One Item Selected",
        text: `Please try again.`,
      });
    }
  };

  return (
    <div className="overflow-x-auto">
      {cart.length > 0 && (
        <>
          <h1 className="ml-3 mb-2">Customer : {cart[0]?.User?.username}</h1>
          <h1 className="ml-3 mb-2">Address : {cart[0]?.User?.address}</h1>
        </>
      )}
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>Checklist</th>
            <th>No.</th>
            <th>Name</th>
            <th>Type</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item, index) => (
            <tr key={item.id}>
              <td>
                <input
                  type="checkbox"
                  checked={checkedItems.includes(item)}
                  onChange={() => handleCheckboxChange(item)}
                />
              </td>
              <td>{index + 1}</td>
              <td>{item.Product.name}</td>
              <td>{item.Product.type}</td>
              <td>{formatCurrency(item.Product.price)}</td>
              <td>{item.quantity}</td>
              <td>{formatCurrency(item.Product.price * item.quantity)}</td>
              <td>
                <button
                  onClick={() => deleteCart(item.id)}
                  className="button is-small is-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4">
        <h2 className="ml-4 mb-2">
          Total Price: {formatCurrency(getTotalPrice())}
        </h2>
        <button
          className="btn btn-active btn-primary ml-4"
          onClick={placeOrder}
        >
          Place Order
        </button>
      </div>
    </div>
  );
}
