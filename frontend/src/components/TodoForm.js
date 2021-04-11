import React from 'react'


class TodoForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {project: 0, noteText: '', creator: 0}
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }


    handleSubmit(event) {
        this.props.createTodo(this.state.project, this.state.noteText, this.state.creator)
        event.preventDefault()
    }

    render() {
        console.log(this.props.users.results)
        // console.log(this.props.projects.results)
        return (
            <div className="container">
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <div className="form-group">
                        <label htmlFor="project">project</label>

                        <select name="project" className='form-control' onChange={(event) => this.handleChange(event)}>
                            {this.props.projects.results.map((item) => <option value={item.id}>{item.id}</option>)}
                        </select>

                    </div>

                    <div className="form-group">
                        <label htmlFor="noteText">note text</label>

                        <input type="text" className="form-control" name="noteText" value={this.state.noteText}
                               onChange={(event) => this.handleChange(event)}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="creator">creator</label>

                        <select name="creator" className='form-control' onChange={(event) => this.handleChange(event)}>
                            {this.props.users.results.map((item) => <option value={item.id}>{item.id}</option>)}
                        </select>

                    </div>
                    <input type="submit" className="btn btn-primary" value="Save"/>
                </form>
            </div>

        );
    }
}

export default TodoForm
