/*jslint
    node
*/
import parseq from "../../dependencies/parseq.mjs";
import makeTester from "./make-tester";
import {makeServer} from "../../server";
import expectUserInfo from "./expect-user-info";


function testClientIntake(environmentVariables, payload) {
    return parseq.sequence(
        [
            makeServer(environmentVariables),
            makeTester(environmentVariables, payload),
            expectUserInfo
        ]
    );
}

export default testClientIntake;
