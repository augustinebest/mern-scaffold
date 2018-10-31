const http = require("http");
const app = require("./api/app");

const port = process.env.PORT || 4000;

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`server now running on port ${port}`);
});
