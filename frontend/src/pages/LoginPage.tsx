import { FormEvent, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../state/AuthContext";

export function LoginPage() {
  const [email, setEmail] = useState("demo@fluxon.shop");
  const [password, setPassword] = useState("demo123");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await login({ email, password });
      navigate((location.state as { from?: string } | null)?.from ?? "/account");
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "Unable to login");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="auth-shell">
      <form className="panel auth-card" onSubmit={handleSubmit}>
        <span className="eyebrow">Login</span>
        <h1>Sign in to continue checkout</h1>
        <p>Use the demo credentials or any email/password while mock auth is enabled.</p>
        <label>
          Email
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        </label>
        <label>
          Password
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
        </label>
        {error ? <p className="error-text">{error}</p> : null}
        <button type="submit" disabled={submitting}>
          {submitting ? "Signing in..." : "Login"}
        </button>
        <p className="muted">
          No account yet? <Link to="/register">Create one</Link>
        </p>
      </form>
    </section>
  );
}
