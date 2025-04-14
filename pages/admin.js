import { useState, useEffect } from "react";
import MainLayout from "../layouts/MainLayout";

export default function AdminPage() {
  const [isProtected, setIsProtected] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [authorized, setAuthorized] = useState(false);
  const [error, setError] = useState("");

  // Admin password - customize this with your own secure password
  const ADMIN_PASSWORD = "Future2030*";

  // Check if user is authorized to access admin
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Check if admin is already authenticated
      const isAdmin = localStorage.getItem("admin_auth") === "true";
      setAuthorized(isAdmin);

      // Check current protection state
      const protectionEnabled =
        localStorage.getItem("protection_enabled") === "true";
      setIsProtected(protectionEnabled);
    }
  }, []);

  // Admin login
  const handleAdminLogin = (e) => {
    e.preventDefault();

    if (adminPassword === ADMIN_PASSWORD) {
      setAuthorized(true);
      localStorage.setItem("admin_auth", "true");
      setError("");
    } else {
      setError("Invalid admin password");
    }
  };

  // Toggle site protection
  const toggleProtection = () => {
    const newProtectionState = !isProtected;
    localStorage.setItem("protection_enabled", newProtectionState.toString());
    setIsProtected(newProtectionState);
  };

  // Clear credentials and log out
  const handleLogout = () => {
    localStorage.removeItem("admin_auth");
    setAuthorized(false);
  };

  if (!authorized) {
    return (
      <MainLayout title="Admin Login">
        <div className="admin-login">
          <h1>Admin Access</h1>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleAdminLogin}>
            <div className="form-group">
              <label htmlFor="adminPassword">Admin Password</label>
              <input
                type="password"
                id="adminPassword"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="form-button">
              Login
            </button>
          </form>
        </div>

        <style jsx>{`
          .admin-login {
            max-width: 400px;
            margin: 2rem auto;
            padding: 2rem;
            background-color: var(--color-card-bg);
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          }

          .error-message {
            background-color: rgba(220, 38, 38, 0.1);
            color: rgb(220, 38, 38);
            padding: 0.75rem;
            border-radius: 6px;
            margin-bottom: 1rem;
          }
        `}</style>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Admin Controls">
      <div className="admin-panel">
        <div className="admin-header">
          <h1>Site Administration</h1>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>

        <div className="admin-section">
          <h2>Site Visibility Controls</h2>
          <p>Toggle between public and password-protected modes.</p>

          <div className="toggle-container">
            <span className={`toggle-label ${isProtected ? "muted" : ""}`}>
              Public
            </span>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={isProtected}
                onChange={toggleProtection}
              />
              <span className="toggle-slider"></span>
            </label>
            <span className={`toggle-label ${!isProtected ? "muted" : ""}`}>
              Password Protected
            </span>
          </div>

          <div className="status-message">
            {isProtected ? (
              <div className="protected-message">
                <p>
                  <strong>Site is currently password protected.</strong>{" "}
                  Visitors will need to enter a password to access any page.
                </p>
                <p className="hint">
                  The visitor password is one of: "TheoBlog2025",
                  "FromBricksToBytes", "DataJourney"
                </p>
              </div>
            ) : (
              <div className="public-message">
                <p>
                  <strong>Site is currently public.</strong> Anyone can access
                  your site without a password.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="admin-section">
          <h2>Keyboard Shortcuts</h2>
          <p>
            You can also toggle protection mode with <code>Ctrl+Shift+P</code>{" "}
            from any page.
          </p>
        </div>
      </div>

      <style jsx>{`
        .admin-panel {
          max-width: 800px;
          margin: 0 auto;
        }

        .admin-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .logout-button {
          padding: 0.5rem 1rem;
          background-color: var(--color-card-bg);
          color: var(--color-text);
          border: 1px solid var(--color-border);
          border-radius: 4px;
          cursor: pointer;
        }

        .admin-section {
          background-color: var(--color-card-bg);
          padding: 1.5rem;
          border-radius: 8px;
          margin-bottom: 2rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .toggle-container {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin: 1.5rem 0;
        }

        .toggle-label {
          font-weight: 500;
        }

        .toggle-label.muted {
          opacity: 0.6;
        }

        .toggle-switch {
          position: relative;
          display: inline-block;
          width: 60px;
          height: 30px;
        }

        .toggle-switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .toggle-slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: var(--color-muted);
          transition: 0.4s;
          border-radius: 34px;
        }

        .toggle-slider:before {
          position: absolute;
          content: "";
          height: 22px;
          width: 22px;
          left: 4px;
          bottom: 4px;
          background-color: var(--color-bg);
          transition: 0.4s;
          border-radius: 50%;
        }

        input:checked + .toggle-slider {
          background-color: var(--color-primary);
        }

        input:checked + .toggle-slider:before {
          transform: translateX(30px);
        }

        .status-message {
          padding: 1rem;
          border-radius: 6px;
          background-color: var(--color-bg);
          margin-top: 1rem;
        }

        .protected-message {
          color: var(--color-primary);
        }

        .public-message {
          color: var(--color-text);
        }

        .hint {
          font-size: 0.85rem;
          margin-top: 0.5rem;
          opacity: 0.8;
        }
      `}</style>
    </MainLayout>
  );
}
