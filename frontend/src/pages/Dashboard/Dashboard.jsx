import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import axios from '../../services/api';
const Dashboard = () => {
  const navigate = useNavigate();
const handleLogout = async () => {
    
  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");

  if (!accessToken || !refreshToken) {
    console.error("Tokens missing");
    return;
  }

  try {
     const response = await axios.post("logout/",{ refresh: refreshToken },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (response.status === 205) {
      console.log("Logged out successfully");
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      
      navigate('/login', { replace: true });
    } else {
      console.error("Logout failed", response.status);
    }
  } catch (error) {
    console.error("Error logging out", error);
  }
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
        <h1>Welcome, 👋</h1>
        <p>This is your dashboard content area.</p>
      </main>
    </div>
  );
};

export default Dashboard;
