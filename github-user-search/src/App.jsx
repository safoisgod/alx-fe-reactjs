import { useState } from 'react'
import { fetchUserData } from './services/githubService';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './components/About'
import Search from './components/Search'

function App() {
  const [user, setUser] = useState(null)


  return (
    <div>
      <h1>Github User Search</h1>
      <Search />
    <BrowserRouter>
     <Routes>
      <Route path="/" element= {<Home />} />
      <Route path="/about" element= {<About />} />
     </Routes> 
    </BrowserRouter>
    </div>
  )
}

const Home = () => (
  <div>
    
  </div>
)


export default App
