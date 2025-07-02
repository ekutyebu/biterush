import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/profile.css';

const Profile = () => {
  const [preferences, setPreferences] = useState({});
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/user-profile/');
        setPreferences(JSON.parse(response.data.preferences));
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/user-profile/', { key, value });
      setPreferences({ ...preferences, [key]: value });
      setMessage('Preference updated!');
      setKey('');
      setValue('');
    } catch (error) {
      setMessage('Error updating preference');
      console.error(error);
    }
  };

  return (
    <div className="profile">
      <h2>User Profile</h2>
      <h3>Preferences</h3>
      <ul>
        {Object.entries(preferences).map(([k, v]) => (
          <li key={k}>{k}: {v}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Preference Key (e.g., favorite_cuisine)"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
        <input
          type="text"
          placeholder="Value (e.g., Italian)"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit">Update Preference</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default Profile;