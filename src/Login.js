import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {auth} from './firebase.config'; // Import the Firebase auth instance
import './Login.css'; // Import your custom CSS file for styling
import {signInWithEmailAndPassword} from 'firebase/auth';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async e => {
    e.preventDefault();

    // Check if email and password are provided
    if (!email || !password) {
      setError('Please provide both email and password.');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in successfully');
      navigate('/'); // Redirect to progress page after successful login
    } catch (error) {
      // Handle specific error cases
      if (error.code === 'auth/user-not-found') {
        setError('User not found. Please check your email and try again.');
      } else if (error.code === 'auth/wrong-password') {
        setError('Invalid password. Please try again.');
      } else {
        setError(error.message); // General error message
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        {error && <p className="error-message">{error}</p>}
      </form>
      <p>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
};

export default Login;
