import React, { useState, useEffect } from 'react';
  import axios from 'axios';
  import '../styles/searchbar.css';

  const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [voiceInput, setVoiceInput] = useState('');
    const [results, setResults] = useState([]);
    const [message, setMessage] = useState('');
    const [csrfToken, setCsrfToken] = useState('');

    useEffect(() => {
      const fetchCsrfToken = async () => {
        try {
          const response = await axios.get(
            'https://8000-firebase-biterush-1751358706245.cluster-c23mj7ubf5fxwq6nrbev4ugaxa.cloudworkstations.dev/api/get-csrf-token/',
            { withCredentials: true }
          );
          setCsrfToken(response.data.csrfToken);
          console.log('CSRF token fetched:', response.data.csrfToken);
          console.log('Cookies after CSRF fetch:', document.cookie);
        } catch (error) {
          console.error('Failed to fetch CSRF token:', error.response?.data || error.message);
          setMessage('Failed to fetch CSRF token. Please refresh.');
        }
      };
      fetchCsrfToken();
    }, []);

    const handleTextSearch = async () => {
      try {
        const response = await axios.post(
          'https://8000-firebase-biterush-1751358706245.cluster-c23mj7ubf5fxwq6nrbev4ugaxa.cloudworkstations.dev/api/restaurant-search/',
          { query },
          {
            withCredentials: true,
            headers: { 'X-CSRFToken': csrfToken, 'Content-Type': 'application/json' }
          }
        );
        setResults(response.data.results || []);
        setMessage('');
      } catch (error) {
        setMessage('Failed to fetch search results');
        console.error('Text search error:', error.response?.data || error.message);
      }
    };

    const handleVoiceSearch = async () => {
      if (!voiceInput) {
        setMessage('Please provide a voice input');
        return;
      }
      try {
        const response = await axios.post(
          'https://8000-firebase-biterush-1751358706245.cluster-c23mj7ubf5fxwq6nrbev4ugaxa.cloudworkstations.dev/api/voice-search/',
          { voice_input: voiceInput },
          {
            withCredentials: true,
            headers: { 'X-CSRFToken': csrfToken, 'Content-Type': 'application/json' }
          }
        );
        setResults(response.data.results || []);
        setMessage('Voice search completed!');
      } catch (error) {
        setMessage('Failed to process voice search');
        console.error('Voice search error:', error.response?.data || error.message);
      }
    };

    const startVoiceRecording = () => {
      // Placeholder for Web Speech API
      if ('webkitSpeechRecognition' in window) {
        const recognition = new window.webkitSpeechRecognition();
        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setVoiceInput(transcript);
          handleVoiceSearch();
        };
        recognition.start();
      } else {
        setMessage('Voice recognition not supported in this browser');
      }
    };

    return (
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search restaurants or menus..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleTextSearch} disabled={!csrfToken}>Text Search</button>
        <button onClick={startVoiceRecording} disabled={!csrfToken}>Voice Search</button>
        {message && <p>{message}</p>}
        <div className="results">
          {results.map((result, index) => (
            <div key={index}>
              <h3>{result.restaurant}</h3>
              <ul>
                {result.menu_items.map((item, i) => (
                  <li key={i}>{item.name} - ${item.price}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    );
  };

  export default SearchBar;