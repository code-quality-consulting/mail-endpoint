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

    const evilPseudoProcess = {
        env: {
            EVIL_VARIABLE: true
        }
    };
    const goodPseudoProcess = {
        env: {
            PORT: "3000"
        }
    };

    const mixedPseudoProcess = {
        env: {
            PORT: "3000",
            HOST: "http://localhost:8800/"
        }
    };

    assert.strictEqual(
        true,
        checkEnvIntruders(evilPseudoProcess.env)
    );

    assert.strictEqual(
        false,
        checkEnvIntruders(goodPseudoProcess.env, ["PORT"])
    );

    assert.strictEqual(
        true,
        checkEnvIntruders(mixedPseudoProcess.env, ["PORT"])
    );


    console.log("Success: All environment variables authorized.");

}

export default testEnvVariables;
