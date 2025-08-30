import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import WelcomeMessage from './components/WelcomeMessage'
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import Header from './components/Header';
import UserProfile from './components/UserProfile'


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
        name = "Alice"
        age = "25"
        bio = "Loves hiking and photography"/>
      
      <UserProfile
        name = "Ama Tina"
        age = "19"
        bio = "Always in the kitchn cooking the best meal you've ever tasted"/>
      

    </>
  )
}

export default App
