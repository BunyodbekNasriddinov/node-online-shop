const { createServer } = require("http");
const Express = require("./lib/express");
const adminController = require("./controllers/admin.controller");
const categoriesController = require("./controllers/categories.controller");
const subcategoriesController = require("./controllers/subcategories.controller");
const productsController = require("./controllers/products.controller");
const PORT = (process.env.PORT = 5000 || 9090);

const httpServer = (req, res) => {
  const app = new Express(req, res);

  // ____________________  *** /login route *** _________________________

  // admin login route
  app.post("/login", adminController.POST);

  // ____________________  *** /categories route *** _________________________

  // all categories
  app.get("/categories", categoriesController.GET);

  // category add
  app.post("/categories", categoriesController.POST);

  // category update
  app.put("/categories", categoriesController.PUT);

  // category delete
  app.delete("/categories", categoriesController.DELETE);

  // ____________________  *** /subcategories route *** _________________________

  // all subcategory
  app.get("/subcategories", subcategoriesController.GET);

  // subcategory add
  app.post("/subcategories", subcategoriesController.POST);

  // subcategory update
  app.put("/subcategories", subcategoriesController.PUT);

  // subcategory delete
  app.delete("/subcategories", subcategoriesController.DELETE);

  // ____________________  *** /products route *** _________________________

  // all products => []
  app.get("/products", productsController.GET);

  // product add
  app.post("/products", productsController.POST);

  // product update
  app.put("/products", productsController.PUT);

  // product delete
  app.delete("/products", productsController.DELETE);
};

const server = createServer(httpServer);

server.listen(PORT, () => console.log(`Server running ${PORT} port`));
