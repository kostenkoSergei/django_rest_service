import React from "react";
import logo from './logo.svg';
import './App.css';
import UserList from "./components/User";
import ProjectList from "./components/Projects";
import ToDoList from "./components/Todos";
import axios from "axios";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import {HashRouter, Route} from 'react-router-dom'

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
                <HashRouter>
                    <Menu/>
                    <div className="wrapper flex-grow-1">

                        <Route exact path='/' component={() => <UserList users={this.state.users}/>}/>
                        <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects}/>}/>
                        <Route exact path='/todos' component={() => <ToDoList todos={this.state.todos}/>}/>

                    </div>
                    <Footer/>
                </HashRouter>
            </div>

        )

    }
}

export default App;
