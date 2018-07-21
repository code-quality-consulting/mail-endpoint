/*jslint
    node
*/

import testPostServer from "./request";
import testGetServer from "./test-get";
import testEnvVariables from "./test-env";
const {CQC_PORT, CQC_HOST, ML_PORT, ML_HOST} = process.env;

testGetServer({PORT: ML_PORT, HOST: ML_HOST});
testPostServer({PORT: CQC_PORT, HOST: CQC_HOST});
testEnvVariables();
console.log("Here is the new environment and its variables: ", process.env);
