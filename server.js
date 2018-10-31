const http = require("http");
const app = require("./api/app");

const server = http.createServer(app);

const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log(`server now running on port ${port}`);
});
