import React, { Component } from "react";
import Project from "./Project";

export default function ProjectList(props) {
  if (!props.projectList || !props.projectList.length) {
    return <h1>Loading Projects...</h1>;
  }
  return (
    <div className="project-list-wrapper">
      {props.projectList.map(project => (
        <Project project={project} id={project.id} key={project.id} />
      ))}
    </div>
  );
}
