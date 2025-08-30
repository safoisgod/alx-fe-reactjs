import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import WelcomeMessage from './components/WelcomeMessage'
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import Header from './components/Header';
import UserProfile from './components/UserProfiles'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <WelcomeMessage />
      <Header />
      <MainContent />
      <Footer />

      <h1>User Profiles</h1>
      <UserProfile
        name = "Nana Kwesi"
        age = "42"
        bio = "Loves to code in Python"/>
      
      <UserProfile
        name = "Ama Tina"
        age = "19"
        bio = "Always in the kitchn cooking the best meal you've ever tasted"/>
      

    </>
  )
}

export default App
