const server = require("http").createServer;

server((req, res) => {
    let body = [];
    req.on("error", (err) => {
    console.err(err);
    }).on("data", (chunk) => {
        body.push(chunk);
        console.log(body);
    }).on("end", () => {
        body = Buffer.concat(body).toString();
        console.log(body);
        res.writeHead(200, {
            "Content-Type": "application/json",
            "X-Powered-By": "cqc"
        });
        res.write(body);
        res.end();
    });
}).listen(3001);
