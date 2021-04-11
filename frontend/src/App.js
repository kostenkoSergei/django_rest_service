import React from "react";
import logo from './logo.svg';
import './App.css';
import UserList from "./components/User";
import ProjectList from "./components/Projects";
import ToDoList from "./components/Todos";
import ProjectToDoList from "./components/ProjectInfo";
import LoginForm from './components/Auth.js'
import axios from "axios";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
// import {HashRouter, Route, Switch, Redirect} from 'react-router-dom'
import Cookies from 'universal-cookie';
import ProjectForm from "./components/ProjectForm";
import TodoForm from "./components/TodoForm";

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
            'todos': {'results': []},
            'token': '',
            'username': '',
        }
    }

    load_data() {
        const headers = this.get_headers()
        axios.get('http://127.0.0.1:8000/api/users', {headers})
            .then(response => {
                const users = response.data
                this.setState({
                        'users': users
                    }
                )
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/projects', {headers})
            .then(response => {
                const projects = response.data
                this.setState({
                        'projects': projects
                    }
                )
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/todos', {headers})
            .then(response => {
                const todos = response.data
                this.setState({
                        'todos': todos
                    }
                )
            }).catch(error => console.log(error))
    }

    set_token(token) {
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({'token': token}, () => this.load_data())
    }

    is_authenticated() {
        return this.state.token != ''
    }

    logout(context) {
        context.set_token('')
    }

    get_token_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token': token}, () => this.load_data())
    }


    // get_token(username, password) {
    //     axios.post('http://127.0.0.1:8000/api-token-auth/', {username: username, password: password})
    //         .then(response => {
    //             console.log(response.data)
    //         }).catch(error => alert('Неверный логин или пароль'))
    // }

    get_token(username, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/', {username: username, password: password})
            .then(response => {
                console.log(response.data['token'])
                this.state.username = username
                this.set_token(response.data['token'])
            }).catch(error => alert('Неверный логин или пароль'))
    }

    get_headers() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.is_authenticated()) {
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
    }

    deleteProject(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/projects/${id}`, {headers: headers})
            .then(response => {
                this.setState({projects: this.state.projects.filter((item) => item.id !== id)})
            }).catch(error => console.log(error))
    }

    deleteTODO(id) {
        // destroy method for todo makes it's status is_active=False
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/todos/${id}`, {headers: headers})
            .then(response => {
                console.log(response.status)
                this.setState({todos: this.state.todos.filter((item) => item.id !== id)})
            }).catch(error => console.log(error))
    }

    createProject(name, repoLink, contributors) {
        const headers = this.get_headers()
        const data = {name: name, repo_link: repoLink, contributors: JSON.parse("[" + contributors + "]")}
        // const data = {name: name, repo_link: repoLink}
        console.log(data)
        axios.post(`http://127.0.0.1:8000/api/projects/`, data, {headers: headers})
            .then(response => {
                let new_project = response.data
                this.setState({projects: [...this.state.projects, new_project]})
            }).catch(error => console.log(error))
    }

    createTodo(project, noteText, creator) {
        const headers = this.get_headers()
        const data = {project: parseInt(project), note_text: noteText, creator: parseInt(creator)}
        console.log(data)
        axios.post(`http://127.0.0.1:8000/api/todos/`, data, {headers: headers})
            .then(response => {
                let new_todo = response.data
                this.setState({todos: [...this.state.todos, new_todo]})
            }).catch(error => console.log(error))
    }


    componentDidMount() {
        // this.load_data()
        this.get_token_from_storage()
    }

    render() {
        return (
            <div className="d-flex flex-column min-vh-100">
                <BrowserRouter>
                    <Menu
                        is_authenticated={this.is_authenticated()}
                        logout={this.logout}
                        app={this}
                        username={this.state.username}
                    />
                    <div className="wrapper flex-grow-1">
                        <Switch>
                            <Route exact path='/' component={() => <UserList users={this.state.users}/>}/>
                            <Route exact path='/projects'
                                   component={() => <ProjectList projects={this.state.projects}
                                                                 deleteProject={(id) => this.deleteProject(id)}/>}/>
                            <Route exact path='/todos'
                                   component={() => <ToDoList todos={this.state.todos}
                                                              deleteTODO={(id) => this.deleteTODO(id)}/>}/>
                            <Route exact path='/login' component={() => <LoginForm
                                get_token={(username, password) => this.get_token(username, password)}/>}
                            />
                            <Route exact path='/projects/create' component={() => <ProjectForm
                                createProject={(name, repoLink, contributors) => this.createProject(name, repoLink, contributors)}/>}/>
                            <Route exact path='/todos/create' component={() => <TodoForm
                                createTodo={(project, noteText, creator) => this.createTodo(project, noteText, creator)}/>}/>
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
