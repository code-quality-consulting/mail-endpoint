/*jslint
    node
*/

import testClientIntake from "./test-client-intake/test-client-intake";
import testEmailRegistration from
        "./test-email-registration/tests-email-registration";
import testEmailRegistrationServer from
        "./test-email-registration-server/test-email-registration-server";
import testEnvVariables from "./test-env";
import parseq from "../dependencies/parseq";

const {
    CQC_GROUP_ID,
    ML_API_KEY,
    CQC_PORT,
    CQC_HOST,
    ML_PORT,
    ML_HOST
} = process.env;

// check for email in ML db with GET
// post email to ML db with POST
/*

*/
// client-side POST to CQC




parseq.sequence([/*
    testClientIntake(
        {
            CQC_PORT,
            CQC_HOST
        },
        {
            email: "pseudouser@pseudodomains.com",
            groups: ["tdd"],
            firstName: "Pseudo",
            lastName: "User"
        }
    ),*/
    testEmailRegistration(
        {
            ML_PORT,
            ML_HOST,
            CQC_GROUP_ID, //delete after passing
            ML_API_KEY
        },
        { // this is the value I get back
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
            ML_API_KEY
        },
        {
            name: "Zach and Ben",
            email: "demo@cqc.com"
        }
    )
])(function (successMessage, reason) {
    if (successMessage) {
        console.log(successMessage);
    }
    if (reason) {
        if (reason.failingAssertions) {
            const {failingAssertions} = reason;
            failingAssertions.forEach(function (assertion) {
                console.error(
                    assertion
                );
            });
        }
        if (!reason.failingAssertions) {
            console.log("Here is the reason: ", reason);
        }
    }
});

testEnvVariables();
