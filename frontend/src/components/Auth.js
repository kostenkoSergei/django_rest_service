import React from 'react'


class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {login: '', password: ''}
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    handleSubmit(event) {
        this.props.get_token(this.state.login, this.state.password)
        event.preventDefault()
    }

    render() {
        return (
            <div className='container'>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <div className="form-group mt-3">
                        <input className="form-control" type="text" name="login" placeholder="login"
                               value={this.state.login}
                               onChange={(event) => this.handleChange(event)}/>
                    </div>
                    <div className="form-group mt-3">
                        <input className="form-control" type="password" name="password" placeholder="password"
                               value={this.state.password}
                               onChange={(event) => this.handleChange(event)}/>
                    </div>
                    <input type="submit" className="btn btn-primary mt-3" value="Login"/>
                </form>
            </div>
        );
    }
}

export default LoginForm
