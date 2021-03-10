import React from "react";
import logo from './logo.svg';
import './App.css';
import UserList from "./components/User";
import ProjectList from "./components/Projects";
import ToDoList from "./components/Todos";
import axios from "axios";
import Footer from "./components/Footer";
import Menu from "./components/Menu";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': {'results': []},
            'projects': {'results': []},
            'todos': {'results': []}
        }
    }

    async componentDidMount() {
        await axios.get('http://127.0.0.1:8000/api/users')
            .then(response => {
                const users = response.data
                this.setState({
                        'users': users
                    }
                )
            }).catch(error => console.log(error))

        await axios.get('http://127.0.0.1:8000/api/projects')
            .then(response => {
                const projects = response.data
                this.setState({
                        'projects': projects
                    }
                )
            }).catch(error => console.log(error))

        await axios.get('http://127.0.0.1:8000/api/todos')
            .then(response => {
                const todos = response.data
                this.setState({
                        'todos': todos
                    }
                )
            }).catch(error => console.log(error))
    }

    render() {
        return (
            <div className="d-flex flex-column min-vh-100">
                <Menu/>
                <div className="wrapper flex-grow-1">
                    <UserList users={this.state.users}/>
                    <ProjectList projects={this.state.projects}/>
                    <ToDoList todos={this.state.todos}/>
                </div>
                <Footer/>
            </div>

        )

    }
}

export default App;
