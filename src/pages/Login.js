// src/pages/Login.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Spinner from "../components/Spinner";
import { auth } from "../firebase";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/products");
    } catch (error) {
      setErr(error.message || "Failed to login");
    }
    setLoading(false);
  }

  return (
    <div className="auth-card mt-5">
      <h3 className="text-center">Login</h3>
      {err && <div className="error">{err}</div>}
      <form onSubmit={handleSubmit}>
        <input required placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input required placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button
          type="submit"
          className="btn btn-primary w-10 mx-auto d-block"
          disabled={loading}
        >
          {loading ? <Spinner /> : "Login"}
        </button>
      </form>
      <div className="text-center mt-3 text-muted">
        Don't have an account? <Link to="/signup" className="text-decoration-none">Signup</Link>
      </div>    </div>
  );
}
