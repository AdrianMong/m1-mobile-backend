require('dotenv').config();

const http = require("http");
const app = require("./src/app.js");
const server = http.createServer(app);
const port = process.env.PORT ?? 3000;

server.listen(port, () => {
    console.log(`[SERVER] Running on http://localhost:${port}`);
});