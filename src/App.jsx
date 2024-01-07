import 'dotenv/config'
console.log(process.env)
import { useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [search, setSearch] = useState('')


  function handleSubmit(e) {
    e.preventDefault();
  }

  async function getArtist() {
    try {
      const apiKey = process.env.REACT_APP_CLIENT_ID;
      const response = await axios.get()
      console.log(response)
    } catch (error) {
      console.log(error)
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
          <input type="text" name="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search" /><br />
          <button type="submit" onClick={handleSubmit}>Search</button>
        </form>
      </div>
      <div>
        <p>{search}</p>
        <p>Search object goes here</p>
      </div>
    </>
  )
}

export default App
