const { Router } = require("express");
const DevController = require("./controllers/DevController");
const SearchController = require("./controllers/SearchController");

const routes = Router();
//Métodos HTTP: GET, POST, PUT, DELETE
//Parâmetros:
//Root
//Ex: localhost:3333/
routes.get("/", (request, response) => {
  return response.json({ msg: "Hello world" });
});
//Query Params(Get): request.query (Filtros, ordenação, paginação)
//Ex: localhost:3333/users/?search=qualquerCoisa
routes.get("/users", (request, response) => {
  console.log(request.query);
  return response.json(request.query);
});
//Route Params(Put, Delete): request.params (Identificar um recurso na alteração ou remoção)
//Ex: localhost:3333/users/1
routes.delete("/users/:id", (request, response) => {
  console.log(request.params);
  const { id } = request.params;
  return response.json({ id: +id });
});
//Body Params(Post): request.body (Dados para criação ou alteração de um registro)
//Ex: localhost:3333/users
routes.post("/users", (request, response) => {
  console.log(request.body);
  return response.json(request.body);
});
//Cadastrar Devs
routes.post("/devs", DevController.store);
routes.delete("/devs", DevController.destroy);
routes.put("/devs", DevController.update);
routes.get("/devs", DevController.index);
routes.get("/search", SearchController.index);
module.exports = routes;
