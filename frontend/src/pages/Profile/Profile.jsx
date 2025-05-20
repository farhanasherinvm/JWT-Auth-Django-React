
import './Profile.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../services/api';

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({ username: '', email: '' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) return;

    axios.get('profile/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      setProfile(res.data);
    })
    .catch((err) => {
      console.error('Failed to fetch profile:', err);
    });
  }, []);

  const handleUsernameChange = (e) => {
    setProfile({ ...profile, username: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put('profile/', { username: profile.username }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      alert('Username updated!');
      setIsEditing(false);
    } catch (err) {
      console.error('Update error:', err);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete your account?')) return;

    try {
      await axios.delete('profile/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      localStorage.clear();
      navigate('/login');
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>My Profile</h2>
        <div className="profile-info">
          <p><strong>Email:</strong> {profile.email}</p>
          <p>
            <strong>Username:</strong>
            {isEditing ? (
              <>
                <input
                  type="text"
                  name="username"
                  value={profile.username}
                  onChange={handleUsernameChange}
                />
                <button onClick={handleUpdate}>Update</button>
              </>
            ) : (
              <>
                {profile.username}
                <button onClick={() => setIsEditing(true)} style={{ marginLeft: '30px' }}>
                  ✏️
                </button>
              </>
            )}
          </p>
        </div>
        <div className="profile-actions">
          <button className="delete-btn" onClick={handleDelete}>Delete Account</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
