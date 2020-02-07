const express = require('express');
const server = express();

server.use(express.json());

const projects = [ { id: "1", title: "Projeto 1", tasks: ["Task 1", "Task 2"] },
{ id: "2", title: "Projeto 2", tasks: ["Task 1", "Task 2"] }];

server.post('/project', (req, res) => {
  const project = req.body;
  projects.push(project);
  return res.json(projects);
});

server.get('/projects', (req, res) => {
  return res.json(projects);
});

server.put('project/:index', (req, res) => {
  const index = req.params.index;
  //const title = req.body;
  //projects[index].title = title;
  return res.json(projects[index]);
});

server.listen(3003);