import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-3">
        Smart Campus Cafeteria Management System
      </h1>

      <p className="text-center mb-5">Manage Students, Menu Items and Offers</p>

      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card p-3 shadow">
            <h4 className="text-center">Student Management</h4>

            <div className="d-grid gap-2 mt-3">
              <Link to="/students/add" className="btn btn-primary">
                Add Student
              </Link>

              <Link to="/students/view" className="btn btn-outline-primary">
                View Students
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card p-3 shadow">
            <h4 className="text-center">Menu Management</h4>

            <div className="d-grid gap-2 mt-3">
              <Link to="/menu/add" className="btn btn-success">
                Add Menu Item
              </Link>

              <Link to="/menu/view" className="btn btn-outline-success">
                View Menu
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card p-3 shadow">
            <h4 className="text-center">Offer Management</h4>

            <div className="d-grid gap-2 mt-3">
              <Link to="/offers/add" className="btn btn-warning">
                Add Offer
              </Link>

              <Link to="/offers/view" className="btn btn-outline-warning">
                View Offers
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-4">
        <Link to="/dashboard" className="btn btn-dark">
          Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Home;
