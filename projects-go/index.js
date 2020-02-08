const express = require('express');
const server = express();
const projects = [ ];

server.listen(3003);
server.use(express.json());
server.use(logRequests);

server.post('/project', (req, res) => {
  const { id, title } = req.body;
  const project = {
    id,
    title,
    tasks: []
  };
  projects.push(project);
  return res.json(projects);
});

server.get('/projects', (req, res) => {
  return res.json(projects);
});

server.put('/project/:id', checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const project = projects.find(p => p.id == id);
  project.title = title;
  return res.json(project);
});

server.delete('/project/:id', checkProjectExists, (req, res) => {
  const { id } = req.params;
  const projectIndex = projects.findIndex(p => p.id == id);
  projects.splice(projectIndex, 1);
  return res.send();
});

server.put('/project/:id/task', checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { task } = req.body;
  const project = projects.find(p => p.id == id);
  project.tasks.push(task);
  return res.json(project);
});

function checkProjectExists(req, res, next) {
  const { id } = req.params;
  const project = projects.find(p => p.id == id);
  if(!project) {
    return res.status(400).json({ error: 'Project does not exists' });
  }
  req.project = project;
  return next();
}

function logRequests(req, res, next) {
  console.count("Número de Requisições");
  return next();
}