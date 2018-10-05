import axios from "axios";
export const FETCHING_PROJECTS = "FETCHING_PROJECTS";
export const PROJECTS_FETCHED = "PROJECTS_FETCHED";
export const ERROR = "ERROR";

export const fetchProjects = () => {
  return dispatch => {
    dispatch({ type: FETCHING_PROJECTS });
    axios
      .get("http://localhost:9000/api/projects")
      .then(response => {
        console.log(response);
        dispatch({ type: PROJECTS_FETCHED, payload: response.data });
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: ERROR, payload: err });
      });
  };
};
