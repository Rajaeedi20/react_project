// src/pages/AddProduct.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../contexts/ProductContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DOMPurify from "dompurify";
import { v4 as uuidv4 } from "uuid";

export default function AddProduct() {
  const { products, addProduct, categories, brandList } = useProducts();
  const navigate = useNavigate();
  const [err, setErr] = useState("");

  const schema = yup.object().shape({
    name: yup.string().required("Name required").matches(/^[a-zA-Z0-9\s\-]+$/, "Only letters, numbers, spaces and - allowed"),
    price: yup.number().typeError("Price must be a number").positive("Must be positive").required(),
    inStock: yup.boolean(),
    category: yup.string().required("Select category"),
    brand: yup.string().required("Brand required"),
    status: yup.string().oneOf(["Available", "Out of Stock", "Coming Soon"]).required(),
    quantity: yup.number().typeError("Quantity must be a number").integer("Must be integer").positive("Must be positive").required(),
    color: yup.string().required(),
    sku: yup.string().required("SKU required"),
    imageUrl: yup.string().url("Image URL must be a valid URL").notRequired()
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { inStock: true, status: "Available" }
  });

  function sanitizeAll(obj) {
    const out = {};
    Object.entries(obj).forEach(([k, v]) => {
      if (typeof v === "string") out[k] = DOMPurify.sanitize(v);
      else out[k] = v;
    });
    return out;
  }

  function isSkuUnique(sku) {
    return !products.some(p => p.sku.toLowerCase() === sku.toLowerCase());
  }

  function onSubmit(raw) {
    setErr("");
    const data = sanitizeAll(raw);
    if (!isSkuUnique(data.sku)) {
      setErr("SKU already exists. Provide a unique SKU.");
      return;
    }

    const newProduct = {
      id: uuidv4(),
      name: data.name,
      price: Number(data.price),
      inStock: !!data.inStock,
      category: data.category,
      brand: data.brand,
      status: data.status,
      quantity: parseInt(data.quantity, 10),
      color: data.color,
      sku: data.sku,
      rating: 0,
      imageUrl: data.imageUrl || ("https://via.placeholder.com/480x320?text=" + encodeURIComponent(data.name))
    };

    addProduct(newProduct);
    navigate("/products");
  }

  return (
    <div className="card-form">
      <h4>Add Product</h4>
      {err && <div className="error">{err}</div>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Name</label>
        <input {...register("name")} />
        <div className="field-error">{errors.name?.message}</div>

        <label>Price</label>
        <input type="number" step="0.01" {...register("price")} />
        <div className="field-error">{errors.price?.message}</div>

        <label>In Stock</label>
        <input type="checkbox" {...register("inStock")} defaultChecked />

        <label>Category</label>
        <select {...register("category")}>
          <option value="">Select</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <div className="field-error">{errors.category?.message}</div>

        <label>Brand</label>
        <input list="brandlist" {...register("brand")} />
        <datalist id="brandlist">
          {brandList.map(b => <option key={b} value={b} />)}
        </datalist>
        <div className="field-error">{errors.brand?.message}</div>

        <label>Product Status</label>
        <select {...register("status")}>
          <option>Available</option>
          <option>Out of Stock</option>
          <option>Coming Soon</option>
        </select>

        <label>Quantity</label>
        <input type="number" {...register("quantity")} />
        <div className="field-error">{errors.quantity?.message}</div>

        <label>Color</label>
        <input {...register("color")} placeholder="e.g. Blue or #0000FF" />
        <div className="field-error">{errors.color?.message}</div>

        <label>SKU</label>
        <input {...register("sku")} />
        <div className="field-error">{errors.sku?.message}</div>

        <label>Image URL (optional)</label>
        <input {...register("imageUrl")} placeholder="https://example.com/image.jpg" />
        <div className="field-error">{errors.imageUrl?.message}</div>

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}
