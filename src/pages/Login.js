import React, {useState} from 'react';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import {getDatabase, ref, get} from 'firebase/database'; // Import the correct functions
import {useNavigate} from 'react-router-dom';

const Login = ({onLoginSuccess}) => {
  let navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const auth = getAuth(); // Initialize the auth module
      const db = getDatabase(); // Initialize the database
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      const userSnapshot = await get(ref(db, 'users/' + user.uid)); // Use the correct syntax for the Realtime Database SDK
      const userData = userSnapshot.val();

      if (userData) {
        if (userData.role === 'content provider') {
          onLoginSuccess();
          //   navigate('dashboard');
          // Redirect to your dashboard or other authorized content
          // Example: window.location.href = '/dashboard';
        } else {
          setError('You do not have permission to access this dashboard.');
        }
      } else {
        setError('Failed to fetch user data.');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {error && <p style={{color: 'red'}}>{error}</p>}
    </div>
  );
};

export default Login;
