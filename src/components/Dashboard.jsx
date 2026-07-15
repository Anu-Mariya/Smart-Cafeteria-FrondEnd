import axios from "axios";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [data, setData] = useState({
    registeredStudents: 0,
    menuProducts: 0,
    activeOffers: 0,
  });

  const fetchData = () => {
    axios
      .post("http://localhost:3000/dashboard")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
        alert("Failed to load dashboard");
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Campus Cafeteria Dashboard</h2>

      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card shadow p-4 text-center">
            <h5>Registered Students</h5>
            <h2>{data.registeredStudents}</h2>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card shadow p-4 text-center">
            <h5>Menu Products</h5>
            <h2>{data.menuProducts}</h2>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card shadow p-4 text-center">
            <h5>Active Offers</h5>
            <h2>{data.activeOffers}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
