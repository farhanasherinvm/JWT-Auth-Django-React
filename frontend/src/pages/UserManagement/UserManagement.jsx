// src/pages/UserCRUD.jsx
import React, { useEffect, useState } from 'react';
import api from '../services/api';

const UserCRUD = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', email: '' });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await api.get('users/');
    setUsers(res.data);
  };

  const handleCreate = async () => {
    if (!newUser.username || !newUser.email) return;
    await api.post('users/', newUser);
    setNewUser({ username: '', email: '' });
    fetchUsers();
  };

  const handleUpdate = async (id, updatedUser) => {
    await api.put(`users/${id}/`, updatedUser);
    fetchUsers();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this user?')) {
      await api.delete(`users/${id}/`);
      fetchUsers();
    }
  };

  return (
    <div>
      <h2>User CRUD</h2>
      <div>
        <input
          placeholder="Username"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
        />
        <input
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <button onClick={handleCreate}>Create</button>
      </div>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <input
              value={user.username}
              onChange={(e) =>
                setUsers(users.map((u) => u.id === user.id ? { ...u, username: e.target.value } : u))
              }
            />
            <input
              value={user.email}
              onChange={(e) =>
                setUsers(users.map((u) => u.id === user.id ? { ...u, email: e.target.value } : u))
              }
            />
            <button onClick={() => handleUpdate(user.id, user)}>Update</button>
            <button onClick={() => handleDelete(user.id)} style={{ color: 'red' }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserCRUD;
