import { FETCHING_PROJECTS, PROJECTS_FETCHED, ERROR } from "../actions";

const initialState = {
  fetchingprojects: false,
  projectsFetched: false,
  error: null,
  projectList: []
};

export const projectsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_PROJECTS:
      return Object.assign({}, state, { fetchingProjects: true });
    case PROJECTS_FETCHED:
      return Object.assign({}, state, {
        projectList: action.payload,
        fetchingProjects: false,
        projectsFetched: true
      });
    case ERROR:
      return Object.assign({}, state, {
        fetchingProjects: false,
        error: action.payload
      });
    default:
      return state;
  }
};
