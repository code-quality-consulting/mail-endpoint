/*jslint
    node
*/

import testPostServer from "./request";
import testEnvVariables from "./test-env";

testPostServer({PORT: process.env.PORT, HOST: process.env.HOST});
testEnvVariables();
console.log("Here is the new environment and its variables: ", process.env);
