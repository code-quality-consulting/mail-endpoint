/*jslint
    node
*/
import https from "https";

function getEmailResults(
    environmentVariables,
    expectedPayload
) {
    return function testRequestor(callback) {
        const {ML_PORT, ML_HOST, ML_API_KEY} = environmentVariables;
        const {email} = expectedPayload;
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
            const {statusCode} = res;
 
            res.setEncoding("utf8");
            let data = "";
            res.on("data", function (chunk) {
                data += chunk;
            });
            res.on("end", function () {
                let subscriberInfo = JSON.parse(data);
                if (statusCode === 200) {
                    callback(subscriberInfo);
                }
                if (statusCode === 404) {
                    callback(
                        undefined,
                        subscriberInfo.error 
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

export default getEmailResults;
