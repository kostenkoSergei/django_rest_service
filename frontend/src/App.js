import React from "react";
import logo from './logo.svg';
import './App.css';
import UserList from "./components/User";
import ProjectList from "./components/Projects";
import ToDoList from "./components/Todos";
import ProjectToDoList from "./components/ProjectInfo";
import axios from "axios";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
// import {HashRouter, Route, Switch, Redirect} from 'react-router-dom'

const NotFound404 = ({location}) => {
    return (
        <div>
            <h1>Страница по адресу '{location.pathname}' не найдена</h1>
        </div>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': {'results': []},
            'projects': {'results': []},
            'todos': {'results': []}
        }
    }

     load_data() {
         axios.get('http://127.0.0.1:8000/api/users')
            .then(response => {
                const users = response.data
                this.setState({
                        'users': users
                    }
                )
            }).catch(error => console.log(error))

         axios.get('http://127.0.0.1:8000/api/projects')
            .then(response => {
                const projects = response.data
                this.setState({
                        'projects': projects
                    }
                )
            }).catch(error => console.log(error))

         axios.get('http://127.0.0.1:8000/api/todos')
            .then(response => {
                const todos = response.data
                this.setState({
                        'todos': todos
                    }
                )
            }).catch(error => console.log(error))
    }

    componentDidMount() {
        this.load_data()
    }

    render() {
        return (
            <div className="d-flex flex-column min-vh-100">
                <BrowserRouter>
                    <Menu/>
                    <div className="wrapper flex-grow-1">
                        <Switch>
                            <Route exact path='/' component={() => <UserList users={this.state.users}/>}/>
                            <Route exact path='/projects'
                                   component={() => <ProjectList projects={this.state.projects}/>}/>
                            <Route exact path='/todos' component={() => <ToDoList todos={this.state.todos}/>}/>
                            <Route path="/project/:id">
                                <ProjectToDoList todos={this.state.todos}/>
                            </Route>
                            <Redirect from='/users' to='/'/>
                            <Route component={NotFound404}/>
                        </Switch>
                    </div>
                    <Footer/>
                </BrowserRouter>
            </div>

        )

    }
}

export default App;
