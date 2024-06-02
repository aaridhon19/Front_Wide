"use client";
import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function AddProductComp() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  console.log(name, type, price, stock);

  const addProduct = async (e) => {
    e.preventDefault();
    try {
      console.log(name, type, price);
      await axios.post("http://localhost:4000/product", {
        name,
        type,
        price,
        stock,
      });
      Swal.fire({
        position: "center",
        icon: "success",
        title: `Product ${name} added successfully`,
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
        title: `${error.response.data.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <>
      <form onSubmit={addProduct}>
        <div className="field"></div>
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="input"
            value={type}
            onChange={(e) => setType(e.target.value)}
            placeholder="Type"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="number"
            className="input"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="number"
            className="input"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            placeholder="Stock"
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
