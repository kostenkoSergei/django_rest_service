import React from "react";
import {HashRouter, Route, Link} from 'react-router-dom'

const Menu = () => {
    return (
        <div className="menu">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top mb-5">
                <div className="container">
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to='/' className="navbar-brand">Users</Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/projects' className="navbar-brand">Projects</Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/todos' className="navbar-brand">TODOs</Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Войти <i className="fas fa-sign-in-alt"></i></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>

    )
}

export default Menu;