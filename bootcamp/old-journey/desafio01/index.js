const express = require("express");

const server = express();
server.use(express.json());

server.listen(3333);

const projects = [
  {
    id: "1",
    title: "Projeto 01",
    tasks: ["Tarefa 01", "Tarefa 02", "Tarefa 03"]
  },
  {
    id: "2",
    title: "Projeto 02",
    tasks: ["Tarefa 01", "Tarefa 02", "Tarefa 03"]
  },
  {
    id: "3",
    title: "Projeto 03",
    tasks: ["Tarefa 01", "Tarefa 02", "Tarefa 03"]
  }
];

let counter = 1;

server.use(countRequests);

function countRequests(req, res, next) {
  console.log(`Requisição Nº ${counter++}`);

  return next();
}

function checkProjectNotExists(req, res, next) {
  const { id } = req.params;
  const index = projects.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Project does not exists" });
  }

  req.index = index;

  return next();
}

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.post("/projects", (req, res) => {
  const { id, title } = req.body;

  const project = {
    id,
    title,
    tasks: []
  };

  projects.push(project);

  return res.json(project);
});

server.post("/projects/:id/tasks", checkProjectNotExists, (req, res) => {
  const { title } = req.body;

  projects[req.index].tasks.push(title);

  return res.json(projects[req.index]);
});

server.put("/projects/:id", checkProjectNotExists, (req, res) => {
  projects[req.index].title = req.body.title;

  return res.json(projects);
});

server.delete("/projects/:id", checkProjectNotExists, (req, res) => {
  projects.splice(req.index, 1);
  return res.send();
});
