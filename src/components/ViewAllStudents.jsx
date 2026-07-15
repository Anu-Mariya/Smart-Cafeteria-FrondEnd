import axios from "axios";
import { useEffect, useState } from "react"
import NavigationBar from "./NavigationBar";


const ViewAllStudents = () => {
  const [data, changeData] = useState([])

  const fetchData = () => {
    axios.get("http://localhost:5000/view-student")
      .then((response) => {
        changeData(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    fetchData();
  },
   [])

  return (
    <div>
        <NavigationBar />
      <h2><center>View All Students</center></h2>
      <div className="container mt-4">
        <div className="row g-4">
          {data.map((value, index) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={index}>
              <div className="card h-100 shadow">
                <div className="card-body">
                  <h5 className="card-title text-center mb-3">
                    {value.studentName}
                  </h5>

                  <p className="card-text">
                    <strong>Student ID:</strong> {value.studentId}
                  </p>

                  <p className="card-text">
                    <strong>Roll Number:</strong> {value.rollNumber}
                  </p>

                  <p className="card-text">
                    <strong>Department:</strong> {value.department}
                  </p>

                  <p className="card-text">
                    <strong>Semester:</strong> {value.semester}
                  </p>

                  <p className="card-text">
                    <strong>Email:</strong> {value.email}
                  </p>

                  <p className="card-text">
                    <strong>Phone:</strong> {value.phone}
                  </p>

                  <p className="card-text">
                    <strong>Registration Date:</strong> {value.registrationDate}
                  </p>

                  <button className="btn btn-primary w-100">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewAllStudents;