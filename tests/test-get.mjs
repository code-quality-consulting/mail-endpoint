/*jslint
    node
*/
import https from "https";
import assert from "assert";
import parseq from "../dependencies/parseq.mjs";
const {ML_API_KEY, CQC_GROUP_ID} = process.env;

function testRequest(value, reason) {
    if (reason) {
        console.log("Here is the reason: ", reason);
    }
    if (value) {
        console.log("tests/test-get.mjs:14: Here is the value returned from GET: ", value);
//      assert.strictEqual(value[0].email, "demo@mailerlite.com");
        console.log("Request successfully gets.");
    }
}

function makeTester(environmentVariables) {
    return function testRequestor(callback) {
        const getData = JSON.stringify({
            email: "demo@gmail.com"
        });
        const {PORT, HOST} = environmentVariables;
        const options = {
            hostname: HOST,
            path: `/api/v2/groups/${CQC_GROUP_ID}/subscribers`,
            port: PORT,
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Content-Length": Buffer.byteLength(getData),
                "X-MailerLite-ApiKey": ML_API_KEY
            }
        };
        const req = https.request(options, function (res) {
            console.log(`STATUS OF GET: ${res.statusCode}`);
            console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
            res.setEncoding("utf8");
            let data = "";
            res.on("data", function (chunk) {
                data += chunk;
            });
            res.on("end", function () {
                let subscriberInfo = data;
                callback(JSON.parse(subscriberInfo));
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
    console.log("We made it to testGetServer.");
    parseq.sequence([makeTester(environmentVariables)])(testRequest);
}

export default testGetServer;
