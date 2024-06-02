"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ListOrder() {
  const [order, setOrder] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    getOrder();
  }, []);

  const getOrder = async () => {
    try {
      const response = await axios.get("http://localhost:4000/order");
      const formattedOrder = response.data.map((order) => {
        return {
          ...order,
        };
      });
      setOrder(formattedOrder);
    } catch (error) {
      console.log(error);
    }
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

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(value);
  };

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>No.</th>
            <th>Nama</th>
            <th>Type</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Address</th>
            <th>Total</th>
            <th>Ordered</th>
            <th>Estimation</th>
          </tr>
        </thead>
        <tbody>
          {order.map((item, index) => {
            return (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.Cart.Product.name}</td>
                <td>{item.Cart.Product.type}</td>
                <td>{formatCurrency(item.Cart.Product.price)}</td>
                <td>{item.Cart.quantity}</td>
                <td>{item.Cart.User.address}</td>
                <td>
                  {formatCurrency(item.Cart.Product.price * item.Cart.quantity)}
                </td>
                <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                <td>
                  {new Date(
                    new Date(item.createdAt).getTime() + 5 * 24 * 60 * 60 * 1000
                  ).toLocaleDateString()}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
