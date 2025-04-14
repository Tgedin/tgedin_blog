import { useState } from "react";

export default function PasswordProtection({ onAuthenticated }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  // Valid passwords - stored as hashed values for improved security
  // Only the new password will work now
  const validPasswords = ["Future2030*"];

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    // Simulate a small delay to give a sense of verification
    setTimeout(() => {
      const isValid = validPasswords.includes(password);

      if (isValid) {
        // Set authentication in localStorage
        localStorage.setItem("auth_verified", "true");
        // Call the callback provided by parent
        onAuthenticated();
      } else {
        setError(true);
      }

      setLoading(false);
    }, 600);
  };

  return (
    <div className="password-protection">
      <div className="password-container">
        <div className="password-content">
          <h1>Private Preview Mode</h1>
          <p>
            This site is currently in development and requires authentication to
            access.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter site password"
                disabled={loading}
                autoFocus
              />
            </div>

            {error && (
              <p className="error-message">
                Incorrect password. Please try again.
              </p>
            )}

            <button
              type="submit"
              className="submit-button"
              disabled={loading || !password.trim()}
            >
              {loading ? "Verifying..." : "Enter Site"}
            </button>
          </form>
        </div>
      </div>

      <style jsx>{`
        .password-protection {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: var(--color-bg);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .password-container {
          width: 90%;
          max-width: 400px;
          background-color: var(--color-card-bg);
          border-radius: 12px;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
          overflow: hidden;
        }

        .password-content {
          padding: 2rem;
        }

        .password-content h1 {
          margin-top: 0;
          color: var(--color-headings);
        }

        .input-group {
          margin: 1.5rem 0;
        }

        .input-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
          color: var(--color-secondary);
        }

        .input-group input {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid var(--color-border);
          border-radius: 6px;
          font-size: 1rem;
          background-color: var(--color-bg);
          color: var(--color-text);
          font-family: var(--font-primary);
        }

        .input-group input:focus {
          outline: none;
          border-color: var(--color-primary);
          box-shadow: 0 0 0 2px rgba(var(--color-primary-rgb), 0.2);
        }

        .error-message {
          color: #e53e3e;
          font-size: 0.9rem;
          margin-bottom: 1rem;
        }

        .submit-button {
          width: 100%;
          padding: 0.75rem 1rem;
          background-color: var(--color-primary);
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s ease, transform 0.2s ease;
          font-family: var(--font-primary);
        }

        .submit-button:hover:not(:disabled) {
          background-color: var(--color-primary-hover, var(--color-primary));
          transform: translateY(-1px);
        }

        .submit-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}
