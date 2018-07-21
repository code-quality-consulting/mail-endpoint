/*jslint
    node
*/
import https from "https";
import assert from "assert";
import parseq from "../dependencies/parseq.mjs";
const {ML_API_KEY} = process.env;

function testRequest(value, reason) {
    if (reason) {
        console.log(reason);
    }
    if (value) {
        console.log("Here is the value: ", value);
        assert.strictEqual(value[0].email, "demo@gmail.com");
        //console.log("Request successfully gets.");
    }
}

function makeTester(environmentVariables) {
    return function testRequestor(server, callback) {
        const getData = JSON.stringify({
            email: "demo@gmail.com"
        });
        const {PORT, HOST} = environmentVariables;
        const options = {
            hostname: HOST,
            path: "/api/v2/subscribers/search?query=demo@gmail.com",
            port: PORT,
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Content-Length": Buffer.byteLength(getData),
                "X-MailerLite-ApiKey": ML_API_KEY
            }
        };
        const req = https.request(options, function (res) {
            // console.log("RESPONSE OBJECT GET: ", res);
            console.log(`STATUS OF GET: ${res.statusCode}`);
            console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
            res.setEncoding("utf8");
            let data = "";
            res.on("data", function (chunk) {
                data += chunk;
            });
            res.on("end", function () {
                let subscriberInfo = data;
                console.log(JSON.parse(subscriberInfo));
            });
        });

        req.on("error", (e) => console.error(`Problem with request: ${e.message}`));

        req.setTimeout(5000, function () {
            console.error("No response");
        });

        req.write(getData);
        req.end();

    };
}

function testGetServer(environmentVariables) {
    parseq.sequence([makeTester(environmentVariables)])(testRequest);
}

export default testGetServer;
