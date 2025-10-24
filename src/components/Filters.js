// src/components/Filters.js
import React, { useState } from "react";

export default function Filters({ categories = [], brands = [], onChange }) {
  const [state, setState] = useState({
    q: "", category: "", brand: "", status: "", priceMin: "", priceMax: "", sort: ""
  });

  function update(key, value) {
    const next = { ...state, [key]: value };
    setState(next);
    onChange && onChange(next);
  }

  return (
    <div className="filters">
      <input placeholder="Search by name..." value={state.q} onChange={e => update("q", e.target.value)} />
      <select value={state.category} onChange={e => update("category", e.target.value)}>
        <option value="">All Categories</option>
        {categories.map(c => <option key={c} value={c}>{c}</option>)}
      </select>
      <select value={state.brand} onChange={e => update("brand", e.target.value)}>
        <option value="">All Brands</option>
        {brands.map(b => <option key={b} value={b}>{b}</option>)}
      </select>

      <select value={state.status} onChange={e => update("status", e.target.value)}>
        <option value="">All Status</option>
        <option>Available</option>
        <option>Out of Stock</option>
        <option>Coming Soon</option>
      </select>

      <input type="number" placeholder="Min price" value={state.priceMin} onChange={e => update("priceMin", e.target.value)} />
      <input type="number" placeholder="Max price" value={state.priceMax} onChange={e => update("priceMax", e.target.value)} />

      <select value={state.sort} onChange={e => update("sort", e.target.value)}>
        <option value="">Sort by rating</option>
        <option value="rating_desc">Rating high → low</option>
        <option value="rating_asc">Rating low → high</option>
      </select>
    </div>
  );
}
