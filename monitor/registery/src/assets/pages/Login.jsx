import React, { useState } from "react"

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (event) => {
    event.preventDefault()

    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })

    if (response.ok) {
      // Handle successful login
      const data = await response.json()
      localStorage.setItem("authToken", data.token)
      console.log("Login successful:", data)
      // Call the onLoginSuccess callback function
      onLoginSuccess()
    } else {
      // Handle failed login
      setErrorMessage("Invalid username or password")
      console.error("Login failed:", response.status)
    }
  }

  return (
    <div
      className='main'
      style={{
        height: "100vh",
        backgroundImage: "linear-gradient(to right, #4facfe 0%, #00f2fe 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          color: "black",
          padding: "30px",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <h1>Admin Login</h1>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <label htmlFor='username'>Username:</label>
            <input
              type='text'
              id='username'
              name='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
              required
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label htmlFor='password'>Password:</label>
            <input
              type='password'
              id='password'
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
              required
            />
          </div>
          <button
            type='submit'
            style={{
              backgroundColor: "#007bff",
              color: "#fff",
              padding: "12px 25px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              width: "100%",
            }}
          >
            Login
          </button>
        </form>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </div>
    </div>
  )
}

export default Login
