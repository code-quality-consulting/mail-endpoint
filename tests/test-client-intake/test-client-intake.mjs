/*jslint
    node
*/
import parseq from "../../dependencies/parseq.mjs";
import {makeServer} from "../../server";
import makeTester from "./make-tester";
import successMessagesFilter from
        "../../library/success-messages-filter.mjs";
import expectUserInfo from "./expect-user-info";

function testClientIntake(environmentVariables, expectedPayload) {
    return parseq.sequence([
        makeServer(environmentVariables),
        makeTester(environmentVariables, expectedPayload),
        successMessagesFilter(),
        expectUserInfo(function (value) {
            return {
                "Incorrect email address": {
                    expect: typeof(value.email) === "string"
                            && value.email ===
                            "demo@cqc.com",
                    toEqual: true,
                    actualValue: value.email
                },
                "Incorrect name": {
                    expect: typeof(value.name) === "string"
                            && value.name ===
                            "Zach and Ben",
                    toEqual: true,
                    actualValue: value.name
                },
                "Incorrect id": {
                    expect: typeof(value.id) === "number"
                            && value.id ===
                            283325272034485980,
                    toEqual: true,
                    actualValue: value.id
                }
            };
        })
    ]);
}

export default testClientIntake;
