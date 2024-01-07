import { useState } from 'react'
import './App.css'
import axios from 'axios'

const clientId = import.meta.env.VITE_REACT_APP_CLIENT_ID;
console.log(clientId)
const clientSecret = import.meta.env.VITE_REACT_APP_CLIENT_SECRET;
console.log(clientSecret)


function App() {
  const [search, setSearch] = useState('')


  function handleSubmit(e) {
    e.preventDefault();
  }

  const getToken = async () => {
    const token = await axios
      .get(url,
        {

        headers: {
        
      }}).catch(error => console.log('Error getting token:', error))
  
  }


  getToken()


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
