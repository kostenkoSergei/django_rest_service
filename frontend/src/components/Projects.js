import React from "react";
import App from "../App";
import {Link} from "react-router-dom";

const ProjectItem = ({project, deleteProject}) => {
    return (

        <tr>
            <td><Link to={`project/${project.id}`}>{project.name}</Link></td>
            {/*<td scope="col">{project.name}</td>*/}
            <td scope="col">{project.repoLink}</td>
            <td scope="col">{project.contributors.join(', ')}</td>
            <td>
                <button onClick={() => deleteProject(project.id)} type='button'>Delete</button>
            </td>
        </tr>

    )
}

const ProjectList = ({projects, deleteProject}) => {
    return (

        <div className="container">
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Project name</th>
                    <th scope="col">Link</th>
                    <th scope="col">Contributors</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {projects.results.map((project) => <ProjectItem key={project.id} project={project}
                                                                deleteProject={deleteProject}/>)}
                </tbody>
            </table>
            <Link to='/projects/create'>Create</Link>
        </div>

    )
}
export default ProjectList;