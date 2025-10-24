// src/components/Pagination.js
import React from "react";

export default function Pagination({ page, totalPages, setPage }) {
  if (totalPages <= 1) return null;
  const pages = [];
  for (let i = 1; i <= totalPages; i++) pages.push(i);

  return (
    <div className="pagination">
      <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>Prev</button>
      {pages.map(p => (
        <button key={p} className={p === page ? "active" : ""} onClick={() => setPage(p)}>{p}</button>
      ))}
      <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>Next</button>
    </div>
  );
}
