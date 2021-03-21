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

    set_token(token) {
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({'token': token})
        console.log('hi')
    }

    is_authenticated() {
        return this.state.token != ''
    }

    logout() {
        this.set_token('')
    }

    get_token_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token': token})
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
                this.set_token(response.data['token'])
            }).catch(error => alert('Неверный логин или пароль'))
    }


    componentDidMount() {
        this.load_data()
        this.get_token_from_storage()
    }

    render() {
        return (
            <div className="d-flex flex-column min-vh-100">
                <BrowserRouter>
                    <Menu
                        is_authenticated={this.is_authenticated()}
                        logout={this.logout}
                    />
                    <div className="wrapper flex-grow-1">
                        <Switch>
                            <Route exact path='/' component={() => <UserList users={this.state.users}/>}/>
                            <Route exact path='/projects'
                                   component={() => <ProjectList projects={this.state.projects}/>}/>
                            <Route exact path='/todos' component={() => <ToDoList todos={this.state.todos}/>}/>
                            <Route exact path='/login' component={() => <LoginForm
                                get_token={(username, password) => this.get_token(username, password)}/>}/>
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
