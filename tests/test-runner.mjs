/*jslint
    node
*/

import parseq from "../dependencies/parseq";
import testGetIndex from "./test-document-render/test-get-index";
import testGetCss from "./test-css-render/test-get-css";
import testGetJs from "./test-javascript-render/test-get-js";
import testClientIntake from "./test-client-intake/test-client-intake";
import testEmailRegistration from
        "./test-email-registration/tests-email-registration";
import testEmailRegistrationServer from
        "./test-email-registration-server/test-email-registration-server";
import testEnvVariables from "./test-env";

const {
    CQC_GROUP_ID,
    CQC_APPROOT,
    ML_API_KEY,
    CQC_PORT,
    CQC_HOST,
    ML_PORT,
    ML_HOST
} = process.env;

parseq.sequence([
    testGetIndex(
        {
            CQC_APPROOT,
            CQC_PORT,
            CQC_HOST
        }
    ),
    testGetCss(
        {
            CQC_APPROOT,
            CQC_PORT,
            CQC_HOST
        }
    ),
    testGetJs(
        {
            CQC_APPROOT,
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
            CQC_APPROOT,
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
])(function (value, reason) {
    if (value) {
        value.successMessages.forEach(function (message) {
            console.log(message);
        });
    }
    if (!value) {
        console.log("No successMessages");
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
