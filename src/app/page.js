"use client";








import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Ensure this line is present

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter(); // Initialize router here

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://www.devnexlab.com/eddycart_nuova2024/login-expo3.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, expo_push_token: '' }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('codice_agente', data.codice_agente);
      
      // Redirect to the dashboard page after login
      router.replace('/dashboard');
    } catch (error) {
      console.error('Login error:', error.message);
      alert('An error occurred during login: ' + error.message);
    }
  };





  return (
    <div style={styles.container}>
      <div style={styles.innerContainer}>
        <img src="/logo.png" alt="Logo" style={styles.image} /> {/* Replace with your logo path */}
        <h1 style={styles.logo}>EDDYCART</h1>

        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.inputContainer}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.inputContainer}>
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
            <span
              onClick={() => setPasswordVisible(!passwordVisible)}
              style={styles.icon}
            >
              {passwordVisible ? "👁️" : "🙈"} {/* Icon representation */}
            </span>
          </div>
          <button type="submit" style={styles.loginButton}>Accedi</button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#001D93',
    padding: '20px',
  },
  innerContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: '400px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
  },
  image: {
    width: '100px',
    height: '100px',
    marginBottom: '20px',
  },
  logo: {
    fontSize: '28px',
    color: 'white',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    marginBottom: '15px',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: '8px',
    padding: '10px',
  },
  input: {
    flex: 1,
    backgroundColor: 'transparent',
    border: 'none',
    outline: 'none',
    color: 'white',
    fontSize: '16px',
  },
  icon: {
    marginLeft: '10px',
    cursor: 'pointer',
    color: 'gray',
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#007BFF',
    padding: '15px',
    borderRadius: '8px',
    color: 'white',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
    border: 'none',
    outline: 'none',
    transition: 'background-color 0.3s',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
  },
};
