import React, { useEffect, useState, useContext } from 'react';
import { ThemeContext } from './ThemeContext'; // Import the ThemeContext for theme switching
import './Home.css';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const { theme, toggleTheme } = useContext(ThemeContext); // Accessing theme state

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedUsers = filteredUsers.sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(sortedUsers.length / usersPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className={`container ${theme}`}>
      {/* Header with Toggle */}
      <header className="header">
        <h1>User Directory</h1>
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
        </button>
      </header>

      {/* Search Bar */}
      <div className="search-sort-container">
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
          Sort {sortOrder === 'asc' ? 'Z-A' : 'A-Z'}
        </button>
      </div>

      {/* User List */}
      <div className="user-list">
        {currentUsers.map(user => (
          <div
            key={user.id}
            className="user-card"
            onClick={() => setSelectedUser(user.id === selectedUser ? null : user.id)} // Toggle user details view
          >
            <p className="user-name">{user.name}</p>
            <p>{user.email}</p>
            <p>{user.address.city}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
      </div>

      {/* User Details Modal */}
      {selectedUser && (
        <div className="user-details-modal">
          <button onClick={() => setSelectedUser(null)} className="close-button">X</button>
          <h2>Details for User</h2>
          {/* Find the selected user */}
          {users.map(user => {
            if (user.id === selectedUser) {
              return (
                <div key={user.id}>
                  <p><strong>Name:</strong> {user.name}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Phone:</strong> {user.phone}</p>
                  <p><strong>Company:</strong> {user.company.name}</p>
                  <p><strong>Website:</strong> <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer">{user.website}</a></p>
                </div>
              );
            }
            return null;
          })}
        </div>
      )}
    </div>
  );
};

export default Home;
