/*jslint
    node
*/
import parseq from "../../dependencies/parseq.mjs";
import makeTester from "./make-tester";
import {makeServer} from "../../server";
import expectUserInfo from "./expect-user-info";

function testClientIntake(environmentVariables, payload) {
    return parseq.sequence([
        makeServer(environmentVariables),
        makeTester(environmentVariables, payload),
        expectUserInfo(function (value) {
            return {
                "Incorrect email address": {
                    expect: typeof(value.email) === "string"
                            && value.email ===
                            "pseudouser@pseudodomains.com",
                    toEqual: true,
                    actualValue: value.email
                },
                "Incorrect group": {
                    expect: typeof(value.groups[0]) === "string"
                            && value.groups[0] === "tdd",
                    toEqual: true,
                    actualValue: value.groups[0]
                },
                "Incorrect first name": {
                    expect: typeof(value.firstName) === "string"
                            && value.firstName === "Pseudo",
                    toEqual: true,
                    actualValue: value.firstName
                },
                "Incorrect last name": {
                    expect: typeof(value.lastName) === "string"
                            && value.lastName === "User",
                    toEqual: true,
                    actualValue: value.lastName
                }
            };
        })
    ]);
}

export default testClientIntake;
