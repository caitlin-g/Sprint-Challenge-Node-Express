import React, { Component } from "react";
import "./App.css";
import logo from "./logo.svg";
import { connect } from "react-redux";
import { fetchProjects } from "./store/actions";
import ProjectList from "./components/ProjectList";

class App extends Component {
  componentDidMount() {
    this.props.fetchProjects();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          Sprint Challenge
        </header>
        <div>
          <h2>Project List</h2>
          <ProjectList {...this.props} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    projectList: state.projectList,
    fetchProjects: state.fetchingProjects
  };
};

export default connect(
  mapStateToProps,
  {
    fetchProjects
  }
)(App);
