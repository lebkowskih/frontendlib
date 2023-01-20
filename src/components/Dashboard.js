import React, { useEffect, useState } from "react"
import Books from "./Books";
import Categories from './Categories';
import Authors from './Authors';
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import { Navigate } from "react-router-dom";

function Dashboard() {
    
    let [showBooks, setShowBooks] = useState(false)
    let [showCategories, setShowCategories] = useState(false)
    let [showAuthors, setShowAuthors] = useState(false)
    const location = useLocation();
    const navigator = useNavigate() 
    //const isLoggedin = location.state.isLoggedin;
    useEffect(() => {
        if(location.state === null)
        {navigator("/")}
    })
   
    const handleComponentRender = (component) =>
    {
        switch(component) {
            case "books":
                setShowBooks(true);
                setShowCategories(false);
                setShowAuthors(false);
                break;
            case "categories":
                setShowCategories(true);
                setShowBooks(false);
                setShowAuthors(false);
                break;
            case "authors":
                setShowAuthors(true);
                setShowBooks(false);
                setShowCategories(false);
                break;
            default:
                setShowAuthors(false);
                setShowBooks(false);
                setShowCategories(false);
        }
    }
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
                                    <button onClick={() => handleComponentRender("books") } className="nav-link px-0"> <span className="d-none d-sm-inline">Books</span></button>
                                </li>
                                <li>
                                    <button onClick={() => handleComponentRender("categories") }className="nav-link px-0"> <span className="d-none d-sm-inline">Categories</span></button>
                                </li>
                                <li>
                                    <button onClick={() => handleComponentRender("authors") } className="nav-link px-0"> <span className="d-none d-sm-inline">Authors</span></button>
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
                {showBooks && <Books/>}
                {showAuthors && <Authors/>}
                {showCategories && <Categories/>}
            </div>
        </div>
   </div>
    
)
}

export default Dashboard;