/*jslint
    node
*/

import assert from "assert";
import configureEnv from "../library/configure-env.mjs";

configureEnv()(function () {
    assert.strictEqual(process.env.PORT, "3001");
    console.log("Environment variable successfully loads.");
});
