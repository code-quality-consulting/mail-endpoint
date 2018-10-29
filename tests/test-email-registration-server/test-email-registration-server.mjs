/*jslint
    node
*/

import {makeServer} from "../../server";
import expectEmailRegisteredByServer from
    "./expect-email-registered-by-server";
import getEmailResults from "../get-email-results";
import successMessagesFilter from 
    "../../library/success-messages-filter.mjs";
import clientPostToCQC from "./client-post-to-cqc";
import parseq from "../../dependencies/parseq";
import deleteEmail from "../delete-email";


function testEmailRegistrationServer(
    environmentVariables,
    expectedPayload
) {
    return parseq.sequence(
        [
            makeServer(environmentVariables),
            clientPostToCQC(environmentVariables, expectedPayload),
            getEmailResults(environmentVariables, expectedPayload),
            successMessagesFilter(),
            expectEmailRegisteredByServer(function (value) {
                return {
                    "It should generate an id": {
                        expect: value.id === 283325272034485980,
                        toEqual: true,
                        actualResult: value.id
                    },
                    "The id should be a number": {
                        expect: typeof(value.id) === "number",
                        toEqual: true,
                        actualResult: value.id
                    },
                    "It should post a name": {
                        expect: value.name === "Zach and Ben",
                        toEqual: true,
                        actualResult: value.name
                    },
                    "The name should be a string": {
                        expect: typeof(value.name) === "string",
                        toEqual: true,
                        actualResult: value.name
                    },
                    "It should post an email": {
                        expect: value.email === "demo@cqc.com",
                        toEqual: true,
                        actualResult: value.email
                    },
                    "The email should be a string": {
                        expect: typeof(value.email) === "string",
                        toEqual: true,
                        actualResult: value.email
                    }
                }
            }, deleteEmail(environmentVariables, expectedPayload))
        ]
    )
}

export default testEmailRegistrationServer;
