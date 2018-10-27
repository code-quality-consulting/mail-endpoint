/*jslint
    node
*/
import https from "https";
import initializeMessages from "../library/initialize-messages";

function checkEmailAbsence(environmentVariables) {
    return function testRequestor(callback, value) {
        const email = "demo@cqc.com";
        const {ML_PORT, ML_HOST, ML_API_KEY} = environmentVariables;
        const options = {
            hostname: ML_HOST,
            path: `/api/v2/subscribers/${email}`,
            port: ML_PORT,
            headers: {
                "Content-Type": "application/json",
                "X-MailerLite-ApiKey": ML_API_KEY
            }
        };

        const req = https.get(options, function (res) {
            res.setEncoding("utf8");
            let data = "";
            res.on("data", function (chunk) {
                data += chunk;
            });
            res.on("end", function () {
                let subscriberInfo = JSON.parse(data);
                if (subscriberInfo.error) {
                    initializeMessages(callback, value);
                }
                if (!subscriberInfo.error) {
                    callback(
                        undefined,
                        `${subscriberInfo.email} is in the database.`
                    );
                }
            });
        });

        req.on(
            "error",
            (e) => console.error(`Problem with request: ${e.message}`)
        );

        req.setTimeout(5000, function () {
            console.error("No response");
        });
    };
}

export default checkEmailAbsence;
