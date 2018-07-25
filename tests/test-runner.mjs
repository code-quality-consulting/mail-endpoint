/*jslint
    node
*/

import testPostServer from "./client-post-request";
import testGetServer from "./test-get";
import testEnvVariables from "./test-env";
import registerEmail from "./api-post-request";
const {CQC_GROUP_ID, ML_API_KEY, CQC_PORT, CQC_HOST, ML_PORT, ML_HOST} = process.env;

testGetServer({PORT: ML_PORT, HOST: ML_HOST});
testPostServer({PORT: CQC_PORT, HOST: CQC_HOST});
registerEmail({PORT: ML_PORT, HOST: ML_HOST, CQC_GROUP_ID, ML_API_KEY});
testEnvVariables();
console.log("Here is the new environment and its variables: ", process.env);
