import Books from "./Books"
import React, { useState } from "react"
import { render } from "@testing-library/react"

function Dashboard() {
    let [books, setBooks] = useState(false)
    let [categories, setCategories] = useState(false)
    let [authors, setAuthors] = useState(false)
   
    return(
        <div className="container-fluid">
        <div className="row flex-nowrap">
            <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                    <a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                        <span className="fs-5 d-none d-sm-inline">Menu</span>
                    </a>
                    <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                        <li>
                            <ul className="collapse show nav flex-column ms-1" id="submenu1" data-bs-parent="#menu">
                                <li>
                                    <a href="#" className="nav-link px-0" > <span className="d-none d-sm-inline">Books</span></a>
                                </li>
                                <li>
                                    <a href="#" className="nav-link px-0"> <span className="d-none d-sm-inline">Categories</span></a>
                                </li>
                                <li>
                                    <a href="#" className="nav-link px-0"> <span className="d-none d-sm-inline">Authors</span></a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <div className="dropdown pb-4">
                        <a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                            <span className="d-none d-sm-inline mx-1">Log out</span>
                        </a>
                    </div>
                </div>
            </div>
            <div className="col py-3">
                
                    <Books/>       
            </div>
        </div>
    </div>
    
  )
}

export default Dashboard;