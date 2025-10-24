import React from "react";

export default function ProductCard({ p, onClick }) {
  return (
    <div className="card h-100 shadow-sm hover-shadow" onClick={onClick} style={{ cursor: "pointer" }}>
      <img
        src={p.imageUrl || "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=480&q=80"}
        className="card-img-top"
        alt={p.name}
        style={{ height: "200px", objectFit: "cover" }}
      />
      <div className="card-body">
        <h5 className="card-title">{p.name}</h5>
        <p className="card-text mb-1">₹{Number(p.price).toFixed(2)}</p>
        <p className="card-text mb-1">SKU: {p.sku}</p>
        <p className="card-text mb-1">Rating: {p.rating} ⭐</p>
        <span className={`badge ${p.status === "Available" ? "bg-success" : p.status === "Out of Stock" ? "bg-danger" : "bg-warning"}`}>
          {p.status}
        </span>
      </div>
    </div>
  );
}
