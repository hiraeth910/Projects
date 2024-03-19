import React, { useState, useEffect } from "react"
import img from "./logoo.jpg"

const Userform = ({ formData }) => {
  const [name, setName] = useState(formData ? formData.name : "")
  const [nameError, setNameError] = useState("")
  const [email, setEmail] = useState(formData ? formData.email : "")
  const [emailError, setEmailError] = useState("")
  const [mobile, setMobile] = useState(formData ? formData.mobile : "")
  const [mobileError, setMobileError] = useState("")
  const [designation, setDesignation] = useState(
    formData ? formData.designation : ""
  )
  const [designationError, setDesignationError] = useState("")
  const [gender, setGender] = useState(formData ? formData.gender : "")
  const [course, setCourse] = useState(formData ? formData.course : [])
  const [imageFile, setImageFile] = useState(null)
  const [uploadStatus, setUploadStatus] = useState("")
  const [formError, setFormError] = useState("")

  useEffect(() => {
    if (formData) {
      setName(formData.name || "")
      setEmail(formData.email || "")
      setMobile(formData.mobile || "")
      setDesignation(formData.designation || "")
      setGender(formData.gender || "")
      setCourse(formData.course || [])
    }
  }, [formData])

  const handleSubmit = async (event) => {
    event.preventDefault()

    // Reset previous errors
    setNameError("")
    setEmailError("")
    setMobileError("")
    setDesignationError("")
    setFormError("")

    // Validate fields
    let isValid = true

    // Validate Name
    if (!/^[a-zA-Z ]+$/.test(name)) {
      setNameError("Name should only contain alphabets and spaces")
      isValid = false
    }

    // Validate Email
    if (!email.includes("@")) {
      setEmailError("Invalid email address")
      isValid = false
    }

    // Validate Mobile Number
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      setMobileError(
        "Mobile number should start with 6,7,8,9 and be 10 digits long"
      )
      isValid = false
    }

    // Validate Designation
    if (!designation) {
      setDesignationError("Designation is required")
      isValid = false
    }

    // Validate Gender
    if (!gender) {
      setFormError("Gender is required")
      isValid = false
    }

    // Validate Course (at least one course must be selected)
    if (course.length === 0) {
      setFormError("At least one course must be selected")
      isValid = false
    }

    if (!isValid) {
      return
    }

    setUploadStatus("pending")

    try {
      // Form data
      const formData1 = new FormData()

      formData1.append("name", name)
      formData1.append("email", email)
      formData1.append("mobile", mobile)
      formData1.append("designation", designation)
      formData1.append("gender", gender)
      course.forEach((c) => formData1.append("course", c))
      formData1.append("image", imageFile)

      // Authorization token
      const token = localStorage.getItem("authToken")

      // Send POST or PUT request based on whether formData has _id property
      const endpoint = formData._id
        ? `http://localhost:3000/api/users/${formData._id}`
        : `http://localhost:3000/api/users`
      const method = formData._id ? "PUT" : "POST"
      const response = await fetch(endpoint, {
        method,
        body: formData1,
        headers: { Authorization: `Bearer ${token}` },
      })

      if (response.ok) {
        const data = await response.json()
        formData = ""
        setUploadStatus("success")
        alert("Employee Added Successfully")
        // Reset form fields
        setName("")
        setEmail("")
        setMobile("")
        setDesignation("")
        setGender("")
        setCourse([])
        setImageFile(null)
      } else {
        console.error("Upload failed:", response.status)
        setUploadStatus("error")
      }
    } catch (error) {
      console.error("Error:", error)
      setUploadStatus("error")
    }
  }

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "0 auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <div
        style={{
          display: "flex",
          marginBottom: "20px",
          alignItems: "center",
        }}
      >
        <img style={{ height: "29px", marginLeft: "10px" }} src={img} alt='' />
        <h2
          style={{ color: "#4CAF50", textAlign: "center", marginLeft: "90px" }}
        >
          Add New Employee
        </h2>
      </div>
      {formError && <p style={{ color: "red" }}>{formError}</p>}
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>
                <label style={{ color: "#4CAF50" }}>Name</label>
              </td>
              <td>
                <input
                  type='text'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  style={{
                    padding: "8px",
                    fontSize: "16px",
                    border: nameError ? "1px solid red" : "1px solid #4CAF50",
                    borderRadius: "4px",
                  }}
                />
                {nameError && <p style={{ color: "red" }}>{nameError}</p>}
              </td>
            </tr>
            <tr>
              <td>
                <label style={{ color: "#4CAF50" }}>Email</label>
              </td>
              <td>
                <input
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={formData.email ? formData.email : false}
                  style={{
                    padding: "8px",
                    fontSize: "16px",
                    border: emailError ? "1px solid red" : "1px solid #4CAF50",
                    borderRadius: "4px",
                  }}
                />
                {emailError && <p style={{ color: "red" }}>{emailError}</p>}
              </td>
            </tr>
            <tr>
              <td>
                <label style={{ color: "#4CAF50" }}>Mobile</label>
              </td>
              <td>
                <input
                  type='text'
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  required
                  disabled={formData.mobile ? formData.mobile : false}
                  style={{
                    padding: "8px",
                    fontSize: "16px",
                    border: mobileError ? "1px solid red" : "1px solid #4CAF50",
                    borderRadius: "4px",
                  }}
                />
                {mobileError && <p style={{ color: "red" }}>{mobileError}</p>}
              </td>
            </tr>
            <tr>
              <td>
                <label style={{ color: "#4CAF50" }}>Designation</label>
              </td>
              <td>
                <select
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  required
                  style={{
                    padding: "8px",
                    fontSize: "16px",
                    border: designationError
                      ? "1px solid red"
                      : "1px solid #4CAF50",
                    borderRadius: "4px",
                  }}
                >
                  <option value=''>Select Designation</option>
                  <option value='HR'>HR</option>
                  <option value='Manager'>Manager</option>
                  <option value='Sales'>Sales</option>
                </select>
                {designationError && (
                  <p style={{ color: "red" }}>{designationError}</p>
                )}
              </td>
            </tr>
            <tr>
              <td>
                <label style={{ color: "#4CAF50" }}>Gender</label>
              </td>
              <td>
                <input
                  type='radio'
                  id='male'
                  name='gender'
                  value='Male'
                  checked={gender === "Male"}
                  onChange={() => setGender("Male")}
                  required
                  style={{ marginRight: "10px" }}
                />
                <label
                  htmlFor='male'
                  style={{ color: "#4CAF50", marginRight: "20px" }}
                >
                  Male
                </label>
                <input
                  type='radio'
                  id='female'
                  name='gender'
                  value='Female'
                  checked={gender === "Female"}
                  onChange={() => setGender("Female")}
                  required
                />
                <label htmlFor='female' style={{ color: "#4CAF50" }}>
                  Female
                </label>
                {formError && <p style={{ color: "red" }}>{formError}</p>}
              </td>
            </tr>
            <tr>
              <td>
                <label style={{ color: "#4CAF50" }}>Course</label>
              </td>
              <td>
                <div>
                  <input
                    type='checkbox'
                    id='mca'
                    name='course'
                    value='MCA'
                    checked={course.includes("MCA")}
                    onChange={(e) =>
                      setCourse(
                        e.target.checked
                          ? [...course, e.target.value]
                          : course.filter((c) => c !== "MCA")
                      )
                    }
                  />
                  <label
                    htmlFor='mca'
                    style={{ color: "#4CAF50", marginRight: "20px" }}
                  >
                    MCA
                  </label>
                </div>
                <div>
                  <input
                    type='checkbox'
                    id='bca'
                    name='course'
                    value='BCA'
                    checked={course.includes("BCA")}
                    onChange={(e) =>
                      setCourse(
                        e.target.checked
                          ? [...course, e.target.value]
                          : course.filter((c) => c !== "BCA")
                      )
                    }
                  />
                  <label
                    htmlFor='bca'
                    style={{ color: "#4CAF50", marginRight: "20px" }}
                  >
                    BCA
                  </label>
                </div>
                <div>
                  <input
                    type='checkbox'
                    id='bsc'
                    name='course'
                    value='BSC'
                    checked={course.includes("BSC")}
                    onChange={(e) =>
                      setCourse(
                        e.target.checked
                          ? [...course, e.target.value]
                          : course.filter((c) => c !== "BSC")
                      )
                    }
                  />
                  <label htmlFor='bsc' style={{ color: "#4CAF50" }}>
                    BSC
                  </label>
                </div>
              </td>
            </tr>
            {/* Add image input field */}
            <tr>
              <td>
                <label style={{ color: "#4CAF50" }}>Image</label>
              </td>
              <td>
                <input
                  type='file'
                  accept='image/*'
                  onChange={(e) => setImageFile(e.target.files[0])}
                  style={{
                    padding: "8px",
                    fontSize: "16px",
                    border: "1px solid #4CAF50",
                    borderRadius: "4px",
                  }}
                />
              </td>
            </tr>
            {/* Add other form fields similarly */}
          </tbody>
        </table>
        <div>
          <button
            type='submit'
            style={{
              backgroundColor: "#4CAF50",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Submit
          </button>
        </div>
      </form>
      {uploadStatus === "pending" && <p>Uploading...</p>}
      {uploadStatus === "success" && <p>Employee Added Successfully</p>}
      {uploadStatus === "error" && <p>Error occurred. Please try again.</p>}
    </div>
  )
}

export default Userform
