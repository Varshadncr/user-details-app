import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './UserDetail.css';

const UserDetail = () => {
  const { id } = useParams(); // Get the user id from the URL
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user details based on the ID from the URL
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user details');
        }
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="user-detail">
      {user ? (
        <>
          <h1>{user.name}</h1>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Company:</strong> {user.company.name}</p>
          <p><strong>Website:</strong> {user.website}</p>

          {/* Centered Go Back button */}
          <Link to="/" className="back-button">Go Back</Link>
        </>
      ) : (
        <p>User not found</p>
      )}
    </div>
  );
};

export default UserDetail;
