import React, { useState, useEffect } from 'react';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState({
    name: 'Farhana Shareen',
    email: 'farhana@example.com',
  });

  // In real project, fetch user data using JWT token
  // useEffect(() => {
  //   fetchUserProfile();
  // }, []);

  const handleUpdate = () => {
    // Navigate to update form or open a modal
    alert('Update profile clicked!');
  };

  const handleDelete = () => {
    // Confirm and send DELETE request to backend
    const confirmDelete = window.confirm('Are you sure you want to delete your account?');
    if (confirmDelete) {
      alert('Account deleted!');
      // Redirect to register/login
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>My Profile</h2>
        <div className="profile-info">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
        <div className="profile-actions">
          <button className="update-btn" onClick={handleUpdate}>Update Profile</button>
          <button className="delete-btn" onClick={handleDelete}>Delete Account</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
