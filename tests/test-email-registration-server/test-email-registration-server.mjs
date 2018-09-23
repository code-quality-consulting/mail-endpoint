/*jslint
    node
*/

import {makeServer} from "../../server";
import emailRegistrationAssertions from "./email-registration-assertions";
import getEmailResults from "./get-email-results";
import clientPostToCQC from "./client-post-to-cqc";
import parseq from "../../dependencies/parseq";

function testEmailRegistrationServer(
    environmentVariables,
    expectedPayload
    ) {
    return parseq.sequence(
        [
            makeServer(environmentVariables),
            clientPostToCQC(environmentVariables, expectedPayload),
            getEmailResults(environmentVariables) //close server after res 
        ]
    )(emailRegistrationAssertions);
}

export default testEmailRegistrationServer;
