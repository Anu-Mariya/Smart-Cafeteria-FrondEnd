import React from 'react'

const NavigationBar = () => {
  return (
    <div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Navbar</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav">
        <a className="nav-link active" aria-current="page" href="/">Add Students</a>
        <a className="nav-link" href="/view">View All Students</a>
        <a className="nav-link" href="/add">Add Menu Items</a>
        <a className="nav-link" href="/view">View Menu Items</a>
      </div>
    </div>
  </div>
</nav>
    </div>
  )
}

export default NavigationBar