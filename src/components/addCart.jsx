"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function AddCartComp(props) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const { id } = props;

  const getProductById = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/product/${id}`);
      const productData = response.data;
      setName(productData.name);
      setType(productData.type);
      setPrice(productData.price);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      getProductById();
    }
  }, [id]);

  const addProductToCart = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem("userId");
    //   console.log("UserId:", userId); // Log UserId
      console.log(name, type, price, quantity);
      await axios.post("http://localhost:4000/cart", {
        UserId: userId,
        ProductId: id,
        quantity,
      });
      Swal.fire({
        position: "center",
        icon: "success",
        title: `Product ${name} added to cart successfully`,
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        window.location.href = "/";
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: `${error.response?.data?.message || 'Error adding product to cart'}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <>
      <form onSubmit={addProductToCart}>
        <div className="field"></div>
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="input"
            value={name}
            placeholder="Name"
            readOnly
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="input"
            value={type}
            placeholder="Type"
            readOnly
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="number"
            className="input"
            value={price}
            placeholder="Price"
            readOnly
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="number"
            className="input"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Quantity"
          />
        </label>
        <button type="submit" className="btn btn-active btn-primary">
          Submit
        </button>
        <div />
      </form>
    </>
  );
}
