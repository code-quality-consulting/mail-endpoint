/*jslint
    node
*/
import assert from "assert";

function testRequest(value, reason) {
    if (reason) {
        console.log("Here is the reason: ", reason);
    }
    if (value) {
        assert.strictEqual(value[0].email, "demo@mailerlite.com");
        console.log("Request successfully gets.");
    }
}

export default testRequest;
