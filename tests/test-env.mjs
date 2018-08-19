/*jslint
    node
*/

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

    const assertions = {
        "Detects an evil process":  // change back to true
                checkEnvIntruders(evilPseudoProcess.env) === false,

        "Does not warn on an authorized variable": // change back to false
                checkEnvIntruders(goodPseudoProcess.env, ["PORT"]) === true,

        "Detects evil process amongst authorized processes":
                checkEnvIntruders(
            mixedPseudoProcess.env,
            ["PORT"]
        ) === true,

        "Does not warn on empty environment variable":
                checkEnvIntruders(emptyPseudoProcess.env) === false,

        "Does not warn about unused authorized processes":
                checkEnvIntruders(
            emptyPseudoProcess.env,
            ["PORT"]
        ) === false
    };

    const failingAssertions = Object.keys(assertions)
        .filter((assertion) => !assertions[assertion]);

    failingAssertions.forEach(function (assertion) {
        console.error(
            assertion
        );
    });

    if (failingAssertions.length === 0) {
        console.log("All tests are passing.");
    }

}

export default testEnvVariables;
