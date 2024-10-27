"use client";

import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Fetch client list from the backend API
  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://www.devnexlab.com/teddymart/clienti_app.php', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await response.json();
        setClients(data.clients || []);
      } catch (error) {
        console.error('Error fetching clients:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  // Sparkling animation effect
  const handleButtonClick = () => {
    const button = document.getElementById('sparkleButton');
    button.classList.add('sparkle');

    setTimeout(() => {
      button.classList.remove('sparkle');
    }, 1000); // Duration of sparkle effect
  };

  return (
    <div style={styles.container}>
      <h1>Welcome to the Dashboard</h1>

      <button id="sparkleButton" onClick={handleButtonClick} style={styles.sparkleButton}>
        ✨ Click Me ✨
      </button>

      {loading ? (
        <p>Loading clients...</p>
      ) : (
        <ul style={styles.clientList}>
          {clients.map((client) => (
            <li key={client.id}>{client.name}</li>
          ))}
        </ul>
      )}

      <style jsx>{`
        #sparkleButton.sparkle {
          animation: sparkle 1s ease-in-out forwards;
        }

        @keyframes sparkle {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); filter: brightness(1.5); }
        }
      `}</style>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  },
  sparkleButton: {
    padding: '15px 30px',
    fontSize: '18px',
    backgroundColor: '#007BFF',
    color: 'white',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    transition: 'transform 0.3s, filter 0.3s',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
  },
  clientList: {
    marginTop: '20px',
    padding: '0',
    listStyleType: 'none',
  },
};
