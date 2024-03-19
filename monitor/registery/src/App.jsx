import React, { useState } from "react"
import Login from "./assets/pages/Login"
import Navbar from "./assets/pages/Navbar"

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLoginSuccess = () => {
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
  }

  return (
    <div id='root-container'>
      {!isLoggedIn ? (
        <Login onLoginSuccess={handleLoginSuccess} />
      ) : (
        <Navbar onLogout={handleLogout} />
      )}
    </div>
  )
}

export default App
