import React, { Component } from "react";

export default function Project(props) {
  return (
    <div className="project-card" key={props.project.id}>
      <h3>{props.project.name}</h3>
    </div>
  );
}
