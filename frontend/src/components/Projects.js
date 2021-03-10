import React from "react";
import App from "../App";

const ProjectItem = ({project}) => {
    return (

        <tr>
            <td scope="col">{project.name}</td>
            <td scope="col">{project.repoLink}</td>
            <td scope="col">{project.contributors.join(', ')}</td>
        </tr>

    )
}

const ProjectList = ({projects}) => {
    return (

        <div className="container">
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Project name</th>
                    <th scope="col">Link</th>
                    <th scope="col">Contributors</th>
                </tr>
                </thead>
                <tbody>
                {projects.results.map((project) => <ProjectItem key={project.id} project={project}/>)}
                </tbody>
            </table>
        </div>

    )
}
export default ProjectList;