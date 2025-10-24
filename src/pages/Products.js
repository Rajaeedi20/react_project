// src/pages/Products.js
import React, { useMemo, useState } from "react";
import { useProducts } from "../contexts/ProductContext";
import ProductCard from "../components/ProductCard";
import Filters from "../components/Filters";
import Pagination from "../components/Pagination";
import Modal from "../components/Modal";
import Spinner from "../components/Spinner";
import DOMPurify from "dompurify";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function Products() {
  const { products, categories, brandList, loading } = useProducts();
  const [filter, setFilter] = useState({});
  const [page, setPage] = useState(1);
  const perPage = 20;
  const [selected, setSelected] = useState(null);
  const [qSeen, setQSeen] = useState("");
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    if (!products) return [];
    let out = products.slice();
    const f = filter || {};

    // search (sanitize)
    if (f.q && f.q.trim() !== "") {
      const q = DOMPurify.sanitize(f.q.trim()).toLowerCase();
      out = out.filter(p => p.name.toLowerCase().includes(q));
      setQSeen(q);
    } else setQSeen("");

    if (f.category) out = out.filter(p => p.category === f.category);
    if (f.brand) out = out.filter(p => p.brand === f.brand);
    if (f.status) out = out.filter(p => p.status === f.status);
    if (f.priceMin) out = out.filter(p => Number(p.price) >= Number(f.priceMin));
    if (f.priceMax) out = out.filter(p => Number(p.price) <= Number(f.priceMax));

    if (f.sort === "rating_desc") out.sort((a, b) => b.rating - a.rating);
    if (f.sort === "rating_asc") out.sort((a, b) => a.rating - b.rating);

    return out;
  }, [products, filter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageData = filtered.slice((page - 1) * perPage, page * perPage);

  if (loading) return <Spinner />;

  return (
    
    <div className="container my-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-1">
        <h2 className="text-primary fs-4">Sky Goal</h2>
        <button className="btn btn-success btn-sm" onClick={() => navigate("/add-product")}>
          + Add Product
        </button>
      </div>

      {/* Filters */}
      <Filters
        categories={categories}
        brands={brandList}
        onChange={(f) => {
          setFilter(f);
          setPage(1);
        }}
      />

      <p className="text-muted mb-3">
        Showing {pageData.length} of {filtered.length} {qSeen ? `(search: "${qSeen}")` : ""}
      </p>

      {/* Products Grid */}
      <div className="row g-3">
        {pageData.map((p) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={p.id}>
            <ProductCard p={p} onClick={() => setSelected(p)} />
          </div>
        ))}
      </div>

      {/* Pagination */}
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />

      {/* Modal */}
      <Modal open={!!selected} onClose={() => setSelected(null)}>
        {selected && (
          <div className="row g-3 p-3">
            <div className="col-12 col-md-6">
              <img
                src={selected.imageUrl || "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=480&q=80"}
                alt={selected.name}
                className="img-fluid rounded"
              />
            </div>
            <div className="col-12 col-md-6">
              <h3>{selected.name}</h3>
              <p><strong>Price:</strong> ₹{selected.price.toFixed(2)}</p>
              <p><strong>Category:</strong> {selected.category}</p>
              <p><strong>Brand:</strong> {selected.brand}</p>
              <p><strong>SKU:</strong> {selected.sku}</p>
              <p><strong>Status:</strong> {selected.status}</p>
              <p><strong>Quantity:</strong> {selected.quantity}</p>
              <p><strong>Rating:</strong> {selected.rating} ⭐</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
