const server = require("http").createServer;

server((req, res) => {
    let body = [];
    req.on("error", (err) => {
    console.err(err);
    }).on("data", (chunk) => {
        body.push(chunk);
    }).on("end", () => {
        body = Buffer.concat(body).toString();
    });
}).listen(3001);
