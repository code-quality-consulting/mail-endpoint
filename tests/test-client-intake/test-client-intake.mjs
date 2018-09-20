/*jslint
    node
*/
import parseq from "../../dependencies/parseq.mjs";
import testRequest from "./test-request";
import makeTester from "./make-tester";
import {makeServer} from "../../server";

function testClientIntake(environmentVariables, payload) {
    parseq.sequence(
        [
            makeServer(environmentVariables),
            makeTester(environmentVariables, payload)
            // getRequestor to check that the data was
            // successfully submitted
        ]
    )(testRequest);
}

export default testClientIntake;
