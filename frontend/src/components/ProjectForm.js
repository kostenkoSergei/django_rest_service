import React from 'react'


class ProjectForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {name: '', repoLink: '', contributors: ''}
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    handleSubmit(event) {
        this.props.createProject(this.state.name, this.state.repoLink, this.state.contributors)
        event.preventDefault()
    }

    render() {
        return (
            <div className="container">
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <div className="form-group">
                        <label htmlFor="name">name</label>
                        <input type="text" className="form-control" name="name" value={this.state.name}
                               onChange={(event) => this.handleChange(event)}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="repoLink">repo link</label>

                        <input type="text" className="form-control" name="repoLink" value={this.state.repoLink}
                               onChange={(event) => this.handleChange(event)}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="contributors">contributors</label>

                        <input type="text" className="form-control" name="contributors" value={this.state.contributors}
                               onChange={(event) => this.handleChange(event)}/>
                    </div>

                    <input type="submit" className="btn btn-primary mt-5" value="Save"/>
                </form>
            </div>

        );
    }
}

export default ProjectForm