// src/contexts/ProductContext.js
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import seedProducts from "../data/seedProducts";

const ProductContext = createContext();
export function useProducts() { return useContext(ProductContext); }

const STORAGE_KEY = "skyglobe_products_v1";

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // seed or load from localStorage
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setProducts(JSON.parse(raw));
      } catch (e) {
        const s = seedProducts();
        setProducts(s);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
      }
    } else {
      const s = seedProducts();
      setProducts(s);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    }
  }, [products, loading]);

  function addProduct(product) {
    setProducts(prev => [product, ...prev]);
  }

  const categories = useMemo(() => {
    return Array.from(new Set(products.map(p => p.category))).filter(Boolean);
  }, [products]);

  const brandList = useMemo(() => {
    return Array.from(new Set(products.map(p => p.brand))).filter(Boolean);
  }, [products]);

  return (
    <ProductContext.Provider value={{ products, addProduct, categories, brandList, loading }}>
      {children}
    </ProductContext.Provider>
  );
}
