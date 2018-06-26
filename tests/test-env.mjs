/*jslint
    node
*/

import process from "process";
import assert from "assert";
import checkEnvIntruders from "../library/configure-env";

function testEnvVariables() {
    console.log(
        "Number of environment variables set is ",
        Object.keys(process.env).length
    );

    const pseudoProcess = {
        env: {
            EVIL_VARIABLE: true
        }
    };

    assert.strictEqual(
        true,
        checkEnvIntruders(pseudoProcess.env)
    );
    console.log("Success: Number of environment variables is set to 0.");
}

export default testEnvVariables;
