const { createServer } = require('http');
const Express = require('./lib/express');
const adminController = require('./controllers/admin.controller');
const PORT = process.env.PORT = 5000 || 9090;

const httpServer = (req, res) => {
  const app = new Express(req, res);
  
  app.post('/login', adminController.POST)
}

const server = createServer(httpServer)

server.listen(PORT, () => console.log(`Server running ${PORT} port`))