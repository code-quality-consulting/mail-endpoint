/*jslint
    node
*/
import https from "https";

function deleteEmail(environmentVariables) {
    return function requestor(callback) {
        const emailToDelete = "demo@cqc.com";
        const {PORT, HOST, ML_API_KEY} = environmentVariables;
        const options = {
            hostname: HOST,
            port: PORT,
            path: `/api/v2/subscribers/${emailToDelete}`,
            method: "DELETE",
            headers: {
                "X-MailerLite-ApiKey": ML_API_KEY
            }
        };
        const req = https.request(options, function (res) {
            res.setEncoding("utf8");
            res.on("data", function () {
                console.log("On data");
            });
            res.on("end", function () {
                callback();
            });
        });

        req.on("error", (e) => callback(undefined, `Problem with DELETE request: ${e.message}`));

        req.setTimeout(5000, function () {
            console.error("No response");
        });

        req.end();
    };
}

export default deleteEmail;
