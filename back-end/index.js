const express = require("express");

const app = express();
app.use(express.json());
//Métodos HTTP: GET, POST, PUT, DELETE
//Parâmetros:
//Root
//Ex: localhost:3333/
app.get("/", (request, response) => {
  return response.json({ msg: "Hello world" });
});
//Query Params(Get): request.query (Filtros, ordenação, paginação)
//Ex: localhost:3333/users/?search=qualquerCoisa
app.get("/users", (request, response) => {
  console.log(request.query);
  return response.json(request.query);
});
//Route Params(Put, Delete): request.params (Identificar um recurso na alteração ou remoção)
//Ex: localhost:3333/users/1
app.delete("/users/:id", (request, response) => {
  console.log(request.params);
  const { id } = request.params;
  return response.json({ id: +id });
});
//Body Params(Post): request.body (Dados para criação ou alteração de um registro)
//Ex: localhost:3333/users
app.post("/users", (request, response) => {
  console.log(request.body);
  return response.json(request.body);
});
app.listen(3333);
