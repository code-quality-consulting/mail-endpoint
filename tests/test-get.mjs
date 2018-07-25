/*jslint
    node
*/
import https from "https";
import parseq from "../dependencies/parseq.mjs";
import testEmailRegistration from "./tests-email-registration";
const {ML_API_KEY, CQC_GROUP_ID} = process.env;


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
    parseq.sequence([makeTester(environmentVariables)])(testEmailRegistration);
}

export default testGetServer;
