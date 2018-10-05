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

// //Update a user
// server.put("/api/users/:id", allCaps, (req, res) => {
//   const { id } = req.params;
//   const newUser = req.body;
//   userDb
//     .update(id, newUser)
//     .then(user => {
//       if (user.length < 1) {
//         res.status(404).json({
//           message: "The user with the specified ID does not exist."
//         });
//       } else {
//         res
//           .status(200)
//           .json({ user, message: "The user was successfully updated!" });
//       }
//     })
//     .catch(err =>
//       res.status(500).json({
//         error: "The user information could not be modified.."
//       })
//     );
// });

// //=============== ACTION ENDPOINTS =============== //

// //Get all posts
// server.get("/api/posts", (req, res) => {
//   postDb
//     .get()
//     .then(post => {
//       res.json(post);
//     })
//     .catch(err =>
//       res.status(500).json({
//         error: "The post information could not be retrieved."
//       })
//     );
// });

// //Add a new post
// server.post("/api/posts/", (req, res) => {
//   const { text, userId } = req.body;
//   const newPost = { text, userId };
//   if (!text || !userId) {
//     return res.status(400).json({ error: "Please provide text to your post." });
//   }
//   postDb
//     .insert(newPost)
//     .then(post => {
//       res.status(201).json(post);
//     })
//     .catch(err => {
//       res.status(500).json({
//         error: "There was an error saving your post."
//       });
//     });
// });

// //Delete a post
// server.delete("/api/posts/:id", (req, res) => {
//   const { id } = req.params;
//   postDb
//     .remove(id)
//     .then(post => {
//       if (post.length < 1) {
//         res.status(404).json({
//           message: "The post with that ID does not exist."
//         });
//       } else {
//         res.status(200).json(post);
//       }
//     })
//     .catch(err =>
//       res.status(500).json({
//         error: "The post could not be removed."
//       })
//     );
// });

// //Update a post
// server.put("/api/posts/:id", (req, res) => {
//   const { id } = req.params;
//   const { text, userId } = req.body;
//   const newPost = { text, userId };
//   if (!text || !userId) {
//     return res
//       .status(400)
//       .json({ error: "Please provide a userId and text for the post." });
//   }
//   postDb
//     .update(id, newPost)
//     .then(post => {
//       if (post.length < 1) {
//         res.status(404).json({
//           message: "The post with the specified ID does not exist."
//         });
//       } else {
//         res.status(200).json(post);
//       }
//     })
//     .catch(err =>
//       res.status(500).json({
//         error: "The post information could not be modified.."
//       })
//     );
// });

server.listen(port, () => {
  console.log(`\n === API running on port ${port} ===\n`);
});
