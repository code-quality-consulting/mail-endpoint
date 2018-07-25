/*jslint
    node
*/
import assert from "assert";
import makeTester from "./test-get";
import registerEmail from "./api-post-request";
import parseq from "../dependencies/parseq";

function emailRegistrationAssertions(value, reason) {
    if (reason) {
        console.log("Here is the reason: ", reason);
    }
    if (value) {
        assert.strictEqual(value.email, "demo@mailerlite.com");
        console.log("Request successfully gets.");
    }
}

function testEmailRegistration(environmentVariables) {
    return parseq.sequence([
        makeTester(environmentVariables),
        registerEmail(environmentVariables)
    ])(emailRegistrationAssertions);
}


export default testEmailRegistration;
