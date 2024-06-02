"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function EditProduct(props) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const { id } = props;
  // console.log(props, "><<< di jsx");
  const [productData, setProductData] = useState(null);

  const getProductById = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/product/${id}`);
      setProductData(response.data); // Set user data to state
      // console.log(response.data, "><<< testing"); // Log user data
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(userData, "><<< di jsx user data");

  useEffect(() => {
    getProductById();
  }, [id]); // Ensure getUserById is called when id changes

  useEffect(() => {
    // Set username and password when userData changes
    if (productData) {
      setName(productData.name);
      setType(productData.type);
      setPrice(productData.price);
      setStock(productData.stock);
    }
  }, [productData]); // Run when userData changes

  const updateProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4000/product/${id}`, {
        name: name,
        type: type,
        price: price,
        stock: stock,
      });
      window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={updateProduct}>
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
