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
        return (
            <div className="container">
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <div className="form-group">
                        <label htmlFor="project">project</label>
                        <input type="number" className="form-control" name="project" value={this.state.project}
                               onChange={(event) => this.handleChange(event)}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="noteText">note text</label>

                        <input type="text" className="form-control" name="noteText" value={this.state.noteText}
                               onChange={(event) => this.handleChange(event)}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="creator">creator</label>

                        <input type="number" className="form-control" name="creator" value={this.state.creator}
                               onChange={(event) => this.handleChange(event)}/>
                    </div>

                    <input type="submit" className="btn btn-primary mt-5" value="Save"/>
                </form>
            </div>

        );
    }
}

export default TodoForm