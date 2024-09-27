import React, { useState } from 'react';
import './AuthPage.css';
import Header from './Header';
import Footer from './Footer';

const AuthPage = () => {
  // State to track the active panel and form data
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // Only for sign-up
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Toggle between sign-up and sign-in panels
  const togglePanel = () => {
    setIsSignUp(!isSignUp);
    setError('');
    setSuccess('');
  };

  // Handle form submission for sign-up and sign-in
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`http://localhost:5000/auth/${isSignUp ? 'signup' : 'login'}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          ...(isSignUp && { name }), // Send name only in sign-up
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      // If login/signup is successful, store the token and redirect to home page
      if (data.token) {
        localStorage.setItem('token', data.token); // Store the JWT token
        setSuccess(`Successfully ${isSignUp ? 'signed up' : 'logged in'}!`);

        // Redirect to the home page after successful login/signup
        window.location.href = '/home';  // Redirect to home page
      } else {
        setError('Failed to retrieve token.');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <Header />
      <div className={`container ${isSignUp ? 'right-panel-active' : ''}`} id="container">
        {/* Sign-up Form */}
        <div className="form-container sign-up-container">
          <form onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            <div className="social-container">
              <a href="http://localhost:5000/auth/google" className="social"><i className="fab fa-google-plus-g"></i></a>
              <a href="http://localhost:5000/auth/facebook" className="social"><i className="fab fa-facebook-f"></i></a>
              <a href="http://localhost:5000/auth/linkedin" className="social"><i className="fab fa-linkedin-in"></i></a>
            </div>
            <span>or use your email for registration</span>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required={isSignUp}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Sign Up</button>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
          </form>
        </div>

        {/* Sign-in Form */}
        <div className="form-container sign-in-container">
          <form onSubmit={handleSubmit}>
            <h1>Sign in</h1>
            <div className="social-container">
              <a href="http://localhost:5000/auth/google" className="social"><i className="fab fa-google-plus-g"></i></a>
              <a href="http://localhost:5000/auth/facebook" className="social"><i className="fab fa-facebook-f"></i></a>
              <a href="http://localhost:5000/auth/linkedin" className="social"><i className="fab fa-linkedin-in"></i></a>
            </div>
            <span>or use your account</span>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <a href="#">Forgot your password?</a>
            <button type="submit">Sign In</button>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
          </form>
        </div>

        {/* Overlay Section */}
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button className="ghost" onClick={togglePanel}>Sign In</button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start your journey with us</p>
              <button className="ghost" onClick={togglePanel}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AuthPage;
