const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");

const port = 9000;

const actionDb = require("./data/helpers/actionModel.js");
const projectDb = require("./data/helpers/projectModel.js");

const server = express();
server.use(logger("tiny"), cors(), helmet(), express.json());

//=============== PROJECT ENDPOINTS =============== //

//Get all projects
server.get("/api/projects", (req, res) => {
  projectDb
    .get()
    .then(project => {
      res.json(project);
    })
    .catch(err =>
      res.status(500).json({
        error: "The project information could not be retrieved."
      })
    );
});

//Get actions of a specific project
server.get("/api/projects/:id/actions", (req, res) => {
  projectDb
    .getProjectActions(req.params.id)
    .then(project => {
      if (project.length > 0) {
        res.json(project);
      } else
        res.status(404).json({
          message: "The project with the specified ID does not exist."
        });
    })
    .catch(err =>
      res
        .status(500)
        .json({ error: "The project information could not be retrieved." })
    );
});

// //Add a new Project
server.post("/api/projects", (req, res) => {
  const newProject = req.body;
  if (newProject.name.length > 128) {
    return res.status(411).json({
      message: "The project name must be under 129 characters."
    });
  }
  projectDb
    .insert(newProject)
    .then(project => {
      res
        .status(201)
        .json({ project, message: `Project was added successfully!` });
    })
    .catch(err => {
      res.status(500).json({
        error: "There was an error while saving the project to the database."
      });
    });
});

//delete a project
server.delete("/api/projects/:id", (req, res) => {
  const { id } = req.params;
  projectDb
    .remove(id)
    .then(project => {
      if (project.length < 1) {
        res.status(404).json({
          message: "The project with the specified ID does not exist."
        });
      } else {
        res
          .status(200)
          .json({ project, message: "The project was deleted successfully!" });
      }
    })
    .catch(err =>
      res.status(500).json({
        error: "The project could not be removed."
      })
    );
});

// //Update a project
server.put("/api/projects/:id", (req, res) => {
  const { id } = req.params;
  const { name, description, completed } = req.body;
  const newProject = { name, description, completed };
  projectDb
    .update(id, newProject)
    .then(project => {
      if (project.length < 1) {
        res.status(404).json({
          message: "The project with the specified ID does not exist."
        });
      } else {
        res
          .status(200)
          .json({ project, message: "The project was successfully updated!" });
      }
    })
    .catch(err =>
      res.status(500).json({
        error: "The project information could not be modified."
      })
    );
});

// //=============== ACTION ENDPOINTS =============== //

// //Get all actions
server.get("/api/actions", (req, res) => {
  actionDb
    .get()
    .then(action => {
      res.json(action);
    })
    .catch(err =>
      res.status(500).json({
        error: "The action information could not be retrieved."
      })
    );
});

//Add a new action
server.post("/api/actions", (req, res) => {
  const { project_id, description, notes, completed } = req.body;
  const newAction = { project_id, description, notes, completed };
  if (newAction.description.length > 128) {
    return res.status(411).json({
      message: "The action desciption must be under 129 characters."
    });
  }
  if (!description || !project_id || !notes) {
    return res.status(400).json({
      error:
        "Please provide a description, project ID, and notes to your action."
    });
  }
  actionDb
    .insert(newAction)
    .then(action => {
      res
        .status(201)
        .json({ action, message: "Your action was added successfully!" });
    })
    .catch(err => {
      res.status(500).json({
        error: "There was an error saving your action."
      });
    });
});

// //Delete an action
server.delete("/api/actions/:id", (req, res) => {
  const { id } = req.params;
  actionDb
    .remove(id)
    .then(action => {
      if (action.length < 1) {
        res.status(404).json({
          message: "The action with that ID does not exist."
        });
      } else {
        res.status(200).json({ action, message: "Your action was deleted!" });
      }
    })
    .catch(err =>
      res.status(500).json({
        error: "The action could not be removed."
      })
    );
});

//Update an action
server.put("/api/actions/:id", (req, res) => {
  const { id } = req.params;
  const { project_id, description, notes, completed } = req.body;
  const newAction = { project_id, description, notes, completed };
  if (newAction.description.length > 128) {
    return res.status(411).json({
      message: "The action desciption must be under 129 characters."
    });
  }
  if (!description || !project_id || !notes) {
    return res.status(400).json({
      error:
        "Please provide a description, project ID, and notes to your action."
    });
  }
  actionDb
    .update(id, newAction)
    .then(action => {
      if (action.length < 1) {
        res.status(404).json({
          message: "The action with the specified ID does not exist."
        });
      } else {
        res.status(200).json({ action, message: "Your actions was updated!" });
      }
    })
    .catch(err =>
      res.status(500).json({
        error: "The action information could not be modified."
      })
    );
});

server.listen(port, () => {
  console.log(`\n === API running on port ${port} ===\n`);
});
