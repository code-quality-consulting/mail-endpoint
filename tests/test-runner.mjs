/*jslint
    node
*/

import testPostServer from "./request";
import testEnvVariables from "./test-env";

testPostServer();
testEnvVariables();
console.log("Here is the new environment and its variables: ", process.env);
