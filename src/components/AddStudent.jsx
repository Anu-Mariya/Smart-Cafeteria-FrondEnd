import axios from "axios"
import { useState } from "react"


const AddStudent = () => {

  const [input, changeInput] = useState({
    studentId: "",
    studentName: "",
    rollNumber: "",
    department: "",
    semester: "",
    email: "",
    phone: "",
    registrationDate: ""
  })

  const inputHandler = (event) => {
    changeInput({ ...input, [event.target.name]: event.target.value })
  }

  const readValue = () => {

    console.log(input)

    axios.post("http://localhost:5000/add-student", input).then(

      (response) => {

        console.log(response.data)

        alert("Student Added Successfully")

      }
    ).catch(
      (error) => {
        console.log(error)
      }
    )

  }

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <div className="row g-2">

              <div className="col col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                <label className="form-label">Student ID</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={inputHandler}
                  name="studentId"
                  value={input.studentId}
                />
              </div>

              <div className="col col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                <label className="form-label">Student Name</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={inputHandler}
                  name="studentName"
                  value={input.studentName}
                />
              </div>

              <div className="col col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                <label className="form-label">Roll Number</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={inputHandler}
                  name="rollNumber"
                  value={input.rollNumber}
                />
              </div>

              <div className="col col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
             <label className="form-label">Department</label>
             <select
                className="form-select"
                name="department"
                value={input.department}
                onChange={inputHandler}
            >
                <option value="">-- Select Department --</option>
                <option value="MCA">MCA</option>
                <option value="MBA">MBA</option>
                <option value="Computer Science Engineering">Computer Science Engineering</option>
                <option value="Electrical Engineering">Electrical Engineering</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
                <option value="Civil Engineering">Civil Engineering</option>
                <option value="Electronics & Communication Engineering">Electronics & Communication Engineering</option>
                <option value="Electronics & Electrical Engineering (Triple E)">Electronics & Electrical Engineering (Triple E)</option>
                <option value="Computer Science & Design (CSD)">Computer Science & Design (CSD)</option>
                <option value="Artificial Intelligence & Data Science">Artificial Intelligence & Data Science</option>
                <option value="Artificial Intelligence & Machine Learning">Artificial Intelligence & Machine Learning</option>
            </select>
            </div>

            <div className="col col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
            <label className="form-label">Semester</label>
            <select
                className="form-select"
                name="semester"
                value={input.emester}
                onChange={inputHandler}
            >
                <option value="">-- Select Semester --</option>
                <option value="Semester 1">Semester 1</option>
                <option value="Semester 2">Semester 2</option>
                <option value="Semester 3">Semester 3</option>
                <option value="Semester 4">Semester 4</option>
                <option value="Semester 5">Semester 5</option>
                <option value="Semester 6">Semester 6</option>
                <option value="Semester 7">Semester 7</option>
                <option value="Semester 8">Semester 8</option>
            </select>
            </div>

              <div className="col col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  onChange={inputHandler}
                  name="email"
                  value={input.email}
                />
              </div>

              <div className="col col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                <label className="form-label">Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={inputHandler}
                  name="phoneNumber"
                  value={input.phoneNumber}
                />
              </div>

              <div className="col col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                <label className="form-label">Registration Date</label>
                <input
                  type="date"
                  className="form-control"
                  onChange={inputHandler}
                  name="registrationDate"
                  value={input.registrationDate}
                />
              </div>

              <div className="col col-12">
                <button className="btn btn-primary" onClick={readValue}>
                  Submit
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddStudent