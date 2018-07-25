/*jslint
    node
*/

import testPostServer from "./client-post-request";
import testEmailRegistration from "./tests-email-registration";
import testEnvVariables from "./test-env";

const {CQC_GROUP_ID, ML_API_KEY, CQC_PORT, CQC_HOST, ML_PORT, ML_HOST} = process.env;

testEmailRegistration({PORT: ML_PORT, HOST: ML_HOST, CQC_GROUP_ID, ML_API_KEY});
testPostServer({PORT: CQC_PORT, HOST: CQC_HOST});
testEnvVariables();
