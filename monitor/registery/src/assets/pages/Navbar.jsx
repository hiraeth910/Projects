import React, { useState, useEffect } from "react"
import axios from "axios"
import Userform from "./form/Userform" // Import the Form component
import "./navbar.scss"
import img from "./form/logoo.jpg"

const Navbar = ({ onLogout }) => {
  const [tableVisible, setTableVisible] = useState(false)
  const [insertVisible, setInsertVisible] = useState(false)
  const [userData, setUserData] = useState([])
  const [editData, setEditData] = useState("")
  const [sortField, setSortField] = useState("")
  const [sortOrder, setSortOrder] = useState("asc")
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredData, setFilteredData] = useState([])

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("authToken") // Assuming token is stored in localStorage
      const response = await axios.get("http://localhost:3000/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      // Assuming the server response is an array of user objects with imagePath property
      const userDataWithImagePath = response.data.map((user) => ({
        ...user,
        imagePath: user.image, // Adjust this line according to your response structure
      }))

      setUserData(userDataWithImagePath)

      setTableVisible(true)
      setInsertVisible(false)
    } catch (error) {
      console.error("Error fetching user data:", error)
    }
  }

  useEffect(() => {
    if (tableVisible) {
      fetchUserData()
    }
  }, [tableVisible])

  useEffect(() => {
    // Filter data when search term changes
    const filtered = userData.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredData(filtered)
  }, [searchTerm, userData])

  const handleEmployeeList = () => {
    setTableVisible(true)
    setInsertVisible(false)
  }

  const handleInsert = () => {
    setInsertVisible(false)
    setEditData("")
    setInsertVisible(true)
    setTableVisible(false)
  }

  const handleHome = () => {
    setInsertVisible(false)
    setTableVisible(false)
  }

  const handleLogout = () => {
    onLogout();
  }

  const handleEdit = async (id) => {
    try {
      const token = localStorage.getItem("authToken")
      const response = await fetch(`http://localhost:3000/api/users/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await response.json()
      if (!response.ok) {
        console.error("Error fetching user data for editing:", data.message)
        return
      }
      setEditData(data)
      setInsertVisible(true)
      setTableVisible(false)
    } catch (error) {
      console.error("Error fetching user data for editing:", error)
    }
  }

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("authToken")
      const response = await fetch(`http://localhost:3000/api/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (response.ok) {
        alert("Employee deleted successfully")
        // After successful deletion, reload the user data
        fetchUserData()
      } else {
        console.error("Error deleting user:", response.error)
      }
    } catch (error) {
      console.error("Error deleting user:", error)
    }
  }

  const handleSort = (field) => {
    // Toggle sorting order
    const newSortOrder =
      sortField === field && sortOrder === "asc" ? "desc" : "asc"
    setSortField(field)
    setSortOrder(newSortOrder)
    // Sort data
    const sortedData = [...filteredData].sort((a, b) => {
      if (sortOrder === "asc") {
        return a[field].localeCompare(b[field])
      } else {
        return b[field].localeCompare(a[field])
      }
    })
    setFilteredData(sortedData)
  }

  return (
    <>
      <div className='navbar'>
        <img src={img} alt='' style={{ height: "30px", marginRight: "10px" }} />
        <button id='home-btn' onClick={handleHome}>
          Home
        </button>
        <button id='employee-list-btn' onClick={handleEmployeeList}>
          Employee List
        </button>
        <button id='insert-btn' onClick={handleInsert}>
          Insert
        </button>
        <button
          id='logout-btn'
          onClick={handleLogout}
          className='logout-button'
        >
          Logout
        </button>
      </div>
      {tableVisible && 
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyItems: "center",
              backgroundColor: "plum",
            }}
          >
            <h5
              style={{ marginRight: "auto", marginLeft: "auto", height: "8px" }}
            >
              Total Users: {filteredData.length}
            </h5>
            <input
              style={{ marginRight: "auto", marginLeft: "auto", height: "30px",width:"150px" }}
              type='text'
              placeholder='Search...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <table
            id='user-table'
            style={{
              backgroundColor:"whitesmoke",
              marginTop: "20px",
              marginLeft: "auto",
              marginRight: "auto",
              borderSpacing: "12px 20px",
            }}
          >
            <thead>
              <tr>
                <th>Image</th>
                <th onClick={() => handleSort("name")}>
                  Name{" "}
                  {sortField === "name" && (
                    <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                  )}
                </th>
                <th onClick={() => handleSort("email")}>
                  Email{" "}
                  {sortField === "email" && (
                    <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                  )}
                </th>
                <th>Mobile</th>
                <th>Designation</th>
                <th>Gender</th>
                <th>Course</th>
                <th onClick={() => handleSort("createdAt")}>
                  Created At{" "}
                  {sortField === "createdAt" && (
                    <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                  )}
                </th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((user, index) => (
                <tr key={user._id}>
                  <td>
                    <img
                      style={{ height: "30px" }}
                      src={`http://localhost:3000/${user.image}`}
                      alt={user.name}
                    />
                  </td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.mobile}</td>
                  <td>{user.designation}</td>
                  <td>{user.gender}</td>
                  <td>
                    {user.course.map((course, index) => (
                      <span key={index}>
                        {course}
                        {index !== user.course.length - 1 && ", "}
                      </span>
                    ))}
                  </td>
                  <td>{user.createdAt.slice(0, 10)}</td>
                  <td>
                    <button
                      className='edit-button'
                      style={{
                        backgroundColor: "blue",
                        border: "none",
                        borderRadius: "3px",
                        height: "25px",
                        width: "70px",
                        color: "wheat",
                        marginLeft: "4px",
                      }}
                      onClick={() => handleEdit(user._id)}
                    >
                      Edit
                    </button>
                    <button
                      className='delete-button'
                      style={{
                        backgroundColor: "red",
                        border: "none",
                        height: "25px",
                        color: "wheat",
                        width: "70px",
                        borderRadius: "3px",
                        marginLeft: "4px",
                      }}
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
    }
      {insertVisible && <Userform formData={editData} />}
    </>
  )
}

export default Navbar
