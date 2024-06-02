"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ListProduct() {
  const [product, setProduct] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    getProduct();
  }, []);

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // Get product
  const getProduct = async () => {
    try {
      const response = await axios.get("http://localhost:4000/product");
      const formattedProduct = response.data.map((product) => {
        return {
          ...product,
          name: capitalize(product.name),
        };
      });
      setProduct(formattedProduct);
    } catch (error) {
      console.log(error);
    }
  };

  // delete product
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/product/${id}`);
      getProduct();
    } catch (error) {
      console.log(error);
    }
  };

  const navigateToAddCart = (id) => {
    window.location.href = `cart/add/${id}`;
  }

  const navigateToEdit = (id) => {
    window.location.href = `product/edit/${id}`;
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
            {/* head */}
            <thead>
                <tr>
                    <th>No.</th>
                    <th>Nama</th>
                    <th>Type</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {product.map((product, index) => (
                    <tr key={product.id}>
                        <td>{index + 1}</td>
                        <td>{product.name}</td>
                        <td>{product.type}</td>
                        <td>{formatCurrency(product.price)}</td>
                        <td>{product.stock}</td>
                        {isLoggedIn && (
                            <td>
                                <button 
                                onClick={() => navigateToAddCart(product.id)}
                                className="button is-small is-info mr-4">
                                    Add To Cart
                                </button>
                                <button
                                    onClick={() => navigateToEdit(product.id)}
                                    className="button is-small is-info mr-4"
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() => deleteProduct(product.id)}
                                    className="button is-small is-danger"
                                >
                                    Delete
                                </button>
                            </td>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);
}
