/*jslint
    node
*/

import assert from "assert";
import checkEnvIntruders from "../library/configure-env";

function testEnvVariables() {
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

    const emptyPseudoProcess = {
        env: {}
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

    assert.strictEqual(
        false,
        checkEnvIntruders(emptyPseudoProcess.env)
    );

    assert.strictEqual(
        false,
        checkEnvIntruders(emptyPseudoProcess.env, ["PORT"])
    );


    console.log("Success: All environment variables authorized.");

}

export default testEnvVariables;
