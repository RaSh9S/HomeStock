import React from "react";

function Header(){

    return(

      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
          
          <a className="navbar-brand" href="#">
              <img
                  src="https://www.shutterstock.com/image-vector/house-logo-template-design-vector-600nw-741515455.jpg" // Replace with your logo URL
                  alt="Logo"
                  width="30"
                  height="30"
                  className="d-inline-block align-text-top me-2"
              />
              StockMate
          </a>
  
          
          <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
          >
              <span className="navbar-toggler-icon"></span>
          </button>
  
          
          <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                      <a className="nav-link active" aria-current="page" href="/">
                          Smart Shoppinhg
                      </a>
                  </li>

                  <li className="nav-item">
                      <a className="nav-link active" aria-current="page" href="/keells">
                          Online Prices
                      </a>
                  </li>

                  <li className="nav-item">
                      <a className="nav-link" href="#">
                          Inventory
                      </a>
                  </li>
                  
              </ul>
  
              
              <form className="d-flex">
                  <input
                      className="form-control me-2"
                      type="search"
                      placeholder="Search"
                      aria-label="Search"
                  />
                  <button className="btn btn-outline-light" type="submit">
                      Search
                  </button>
              </form>
          </div>
      </div>
  </nav>

    )
}

export default Header;