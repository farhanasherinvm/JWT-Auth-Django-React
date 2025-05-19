import React from 'react';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove token or any auth data
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <h2>Dashboard</h2>
        <nav>
          <ul>
            <li onClick={() => navigate('/profile')}>Profile</li>
            <li onClick={() => navigate('/settings')}>Settings</li>
            <li onClick={handleLogout}>Logout</li>
          </ul>
        </nav>
      </aside>

      <main className="dashboard-main">
        <h1>Welcome, Farhana 👋</h1>
        <p>This is your dashboard content area.</p>
      </main>
    </div>
  );
};

export default Dashboard;
