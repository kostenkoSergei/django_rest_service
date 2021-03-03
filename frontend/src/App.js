import React from "react";
import logo from './logo.svg';
import './App.css';
import UserList from "./components/User";
import axios from "axios";
import Footer from "./components/Footer";
import Menu from "./components/Menu";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': []
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/users')
            .then(response => {
                this.setState({
                        'users': response.data
                    }
                )
            }).catch(error => console.log(error))

        //just to try fetch
        // fetch('http://127.0.0.1:8000/api/users')
        //     .then(response => response.json())
        //     .then(data => {
        //         this.setState({
        //             'users': data
        //         })
        //     }).catch(error => console.log(error))

    }

    render() {
        return (
            <div className="d-flex flex-column min-vh-100">
                <Menu/>
                <div className="wrapper flex-grow-1">
                    <UserList users={this.state.users}/>
                </div>
                <Footer/>
            </div>

        )

    }
}

export default App;
