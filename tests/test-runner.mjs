/*jslint
    node
*/

import testClientIntake from "./test-client-intake/test-client-intake";
import testEmailRegistration from
        "./test-email-registration/tests-email-registration";
import testEmailRegistrationServer from
        "./test-email-registration-server/test-email-registration-server";
import testEnvVariables from "./test-env";
import testGetIndex from "./test-document-render/test-get-index";
import parseq from "../dependencies/parseq";

const {
    CQC_GROUP_ID,
    ML_API_KEY,
    CQC_PORT,
    CQC_HOST,
    ML_PORT,
    ML_HOST
} = process.env;

parseq.sequence([
    testGetIndex(
        {
            CQC_PORT,
            CQC_HOST
        }
    ),
    testClientIntake(
        {
            CQC_GROUP_ID,
            CQC_PORT,
            CQC_HOST,
            ML_API_KEY,
            ML_PORT,
            ML_HOST
        },
        {
            name: "Zach and Ben",
            email: "demo@cqc.com",
            fields: {
                company: "MailerLite"
            }
        }
    ),
    testEmailRegistration(
        {
            ML_PORT,
            ML_HOST,
            CQC_GROUP_ID, //delete after passing
            ML_API_KEY
        },
        {
            email: "demo@cqc.com",
            name: "Zach and Ben",
            fields: {
                company: "MailerLite"
            }
        }
    ),
    testEmailRegistrationServer(
        {
            ML_HOST,
            ML_PORT,
            CQC_HOST,
            CQC_PORT,
            CQC_GROUP_ID,
            ML_API_KEY
        },
        {
            name: "Zach and Ben",
            email: "demo@cqc.com",
            fields: {
                company: "MailerLite"
            }
        }
    )
])(function ({successMessages}, reason) {
    if (successMessages) {
        successMessages.forEach(function (message) {
            console.log(message);
        });
    }
    if (reason) {
        if (reason.failingAssertions) { // doesn't pass our tests
            const {failingAssertions} = reason;
            failingAssertions.forEach(function (assertion) {
                console.error(
                    assertion
                );
            });
        }
        if (!reason.failingAssertions) { // there's an error
            console.log("Here is the reason: ", reason);
        }
    }
});

testEnvVariables();
