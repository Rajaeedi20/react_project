// src/pages/Signup.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Spinner from "../components/Spinner";

export default function Signup() {
  const { signup } = useAuth();
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
      await signup(email, password);
      navigate("/products");
    } catch (error) {
      setErr(error.message || "Failed to signup");
    }
    setLoading(false);
  }

  return (
    <div className="auth-card">
      <h2>Signup</h2>
      {err && <div className="error">{err}</div>}
      <form onSubmit={handleSubmit}>
        <input required placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input required placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button disabled={loading}>{loading ? <Spinner /> : "Create account"}</button>
      </form>
      <div className="muted">Already have an account? <Link to="/login">Login</Link></div>
    </div>
  );
}
