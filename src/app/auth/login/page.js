"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "admin") {
      setError("");
      router.push("/main");
    } else {
      setError("Invalid credentials. Try admin/admin.");
    }
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "6rem auto",
        background: "rgba(255,255,255,0.95)",
        borderRadius: 12,
        boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
        padding: "2.5rem 2rem",
        textAlign: "center",
      }}
    >
      <h2 style={{ color: "#1976d2", fontWeight: 900 }}>Login</h2>
      <form
        onSubmit={handleLogin}
        style={{ display: "flex", flexDirection: "column", gap: 18 }}
      >
        <label style={{ fontWeight: 600, textAlign: "left" }}>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            padding: "0.5rem",
            borderRadius: 6,
            border: "1px solid #bbb",
          }}
          autoFocus
        />
        <label style={{ fontWeight: 600, textAlign: "left" }}>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: "0.5rem",
            borderRadius: 6,
            border: "1px solid #bbb",
          }}
        />
        {error && <div style={{ color: "red", fontWeight: 600 }}>{error}</div>}
        <button
          type="submit"
          style={{
            background: "#1976d2",
            color: "#fff",
            fontWeight: 700,
            border: "none",
            borderRadius: 8,
            padding: "0.7rem",
            fontSize: "1.1rem",
            marginTop: 8,
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}
