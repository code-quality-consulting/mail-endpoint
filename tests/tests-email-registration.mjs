/*jslint
    node
*/
import assert from "assert";
import makeTester from "./test-get";
import parseq from "../dependencies/parseq";

function testEmailRegistration(value, reason) {
    if (reason) {
        console.log("Here is the reason: ", reason);
    }
    if (value) {
        assert.strictEqual(value.email, "demo@mailerlite.com");
        console.log("Request successfully gets.");
    }
}

function testGetServer(environmentVariables) {
    parseq.sequence([makeTester(environmentVariables)])(testEmailRegistration);
}


export default testGetServer;
