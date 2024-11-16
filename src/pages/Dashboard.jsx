import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getMatches } from '../services/authService';
import Loading from '../components/Loading'; // Import the Loading component

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchMatches = async () => {
      setLoading(true); // Start loading before fetching
      try {
        const data = await getMatches(user.id);
        setMatches(data || []); // Ensure matches are set to an empty array if no data
      } catch (error) {
        console.error('Failed to fetch matches:', error);
      } finally {
        setLoading(false); // Stop loading after fetch completes
      }
    };

    fetchMatches();
  }, [user.id]);

  if (loading) {
    return <Loading />; // Display the Loading component
  }

  return (
    <div>
      <h2>Welcome, {user.name}</h2>
      <p>Email: {user.email}</p>
      <button onClick={logout}>Logout</button>

      <h3>Matched Roommates:</h3>
      {matches.length > 0 ? (
        <ul>
          {matches.map((match) => (
            <li key={match.id}>
              <h4>{match.name} - {match.matchPercentage}% Match</h4>
              <p>{match.reason}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No matches found yet.</p>
      )}
    </div>
  );
};

export default Dashboard;
