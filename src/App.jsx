import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import debounce from 'lodash.debounce'

const clientId = import.meta.env.VITE_REACT_APP_CLIENT_ID;
const clientSecret = import.meta.env.VITE_REACT_APP_CLIENT_SECRET;


const getToken = async () => {
  const result = await axios.post('https://accounts.spotify.com/api/token', `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`,
    {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
  const data = await result.data;
  return data.access_token
}


function App() {
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [token, setToken] = useState('')

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getToken();
      setToken(token)
    }
    fetchToken();
  }, []);


  const getResult = async (searchQuery) => {
    try {
      const response = await axios.get(`https://api.spotify.com/v1/search`, {
        params: {
          q: searchQuery,
          type: 'artist'
          },
          
          headers: {
            'Authorization': `Bearer ${token}`
          }
      });
      setSearchResult(response.data.artists.items)
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  }
console.log(searchResult)
  const debouncedGetResult = debounce(getResult, 300);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (value) {
      debouncedGetResult(value)
    } else {
      setSearchResult(null)
    }
  }

  return (
    <>
      <h1>
        Spotify Project
      </h1>
      <div>
        <form>
          <label htmlFor="search">Search</label><br />
          <input
            type="text"
            name="search"
            id="search"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search" /><br />
        </form>
      </div>
      <div>
        {searchResult && searchResult.map((artist, index) => (
          <div key={index}>
            <p>{artist.name}</p>
            <img src={artist.images[0].url}></img>
          </div>
        ))}
      </div>
    </>
  )
}


export default App
