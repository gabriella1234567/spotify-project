import { useState } from 'react'
import './App.css'
import axios from 'axios'

const clientId = import.meta.env.VITE_REACT_APP_CLIENT_ID;
const clientSecret = import.meta.env.VITE_REACT_APP_CLIENT_SECRET;


const getToken = async () => {
  const result = await axios.post('https://accounts.spotify.com/api/token', `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`,
    {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
  console.log(result)
  const data = await result.data;
  return data.access_token
}

const token = await getToken();


function App() {
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [token, setToken] = useState('')

  const getResult = async () => {
    try {
      const response = await axios.get(`https://api.spotify.com/v1/search?q=${search}%2520track%3ADoxy%2520artist%3AMiles%2520Davis&type=album%2Cplaylist%2Cartist%2Ctrack%2Cshow%2Cepisode%2Caudiobook`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      if (response.data) {
        const tracks = response.data.tracks.items;
        console.log(tracks);
        const artists = response.data.artists.items;
        console.log(artists);
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
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
            onChange={(e) =>
            setSearch(e.target.value)}
            placeholder="Search" /><br />
        </form>
      </div>
      <div>
        <p>{search}</p>
        <p></p>
        <p></p>
      </div>
    </>
  )
}


export default App
