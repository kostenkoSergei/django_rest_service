import React from "react";

const Menu = () => {
    return (
        <div className="menu">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top mb-5">
                <div className="container">
                    <a className="navbar-brand" href="index.html">Users</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarResponsive"
                            aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="#">Заглушка</a>
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