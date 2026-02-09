/**
 * Login component for authenticating users
 * Handles the login form and authentication flow
 */

import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password');
      return;
    }

    const success = login(username.trim(), password);
    if (!success) {
      setError('Invalid username or password');
    } else {
      // Redirect to home page after successful login
      navigate('/', { replace: true });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="stack">
        <div className="card">
          <div className="image">
            <form onSubmit={handleSubmit} className="h-full flex flex-col justify-center space-y-4 p-4">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-black mb-2"
                >
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 bg-white border-2 border-black rounded-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none transition text-black placeholder:text-black/50"
                  placeholder="Enter your username"
                  autoComplete="username"
                  aria-required="true"
                  aria-invalid={error ? 'true' : 'false'}
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-black mb-2"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white border-2 border-black rounded-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none transition text-black placeholder:text-black/50"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  aria-required="true"
                  aria-invalid={error ? 'true' : 'false'}
                />
              </div>

              {error && (
                <div
                  className="bg-red-50 border-2 border-red-500 text-red-700 px-4 py-3 rounded-none text-sm"
                  role="alert"
                  aria-live="polite"
                >
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-3 px-4 rounded-none transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 border-2 border-black"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
