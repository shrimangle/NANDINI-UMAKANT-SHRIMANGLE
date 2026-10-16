"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [show, setShow] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Login failed.");
      router.replace("/admin");
      router.refresh();
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  };

  return (
    <div className="adm-login-wrap">
      <form className="adm-login" onSubmit={onSubmit}>
        <a href="/" className="adm-back">&larr; Back to website</a>
        <h1>Admin Login</h1>
        <p className="adm-muted">Sign in to manage your portfolio.</p>

        <label>Email</label>
        <input
          type="email"
          autoComplete="username"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <label>Password</label>
        <div className="adm-pass">
          <input
            type={show ? "text" : "password"}
            autoComplete="current-password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <button type="button" onClick={() => setShow(!show)} aria-label="Show or hide password">
            <i className={show ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}></i>
          </button>
        </div>

        {error && <p className="adm-error">{error}</p>}

        <button type="submit" className="btn primary" disabled={busy}>
          {busy ? "Signing in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
