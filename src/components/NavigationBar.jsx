import React from 'react'
import { Link } from 'react-router-dom'

const NavigationBar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Cafeteria
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link className="nav-link" to="/">Home</Link>
              <Link className="nav-link" to="/dashboard">Dashboard</Link>
              <Link className="nav-link" to="/students-add">Add Students</Link>
              <Link className="nav-link" to="/students-view">View All Students</Link>
              <Link className="nav-link" to="/menu-add">Add Menu Items</Link>
              <Link className="nav-link" to="/menu-view">View Menu Items</Link>
              <Link className="nav-link" to="/offers-add">Add Offer</Link>
              <Link className="nav-link" to="/offers-view">View Offer</Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default NavigationBar