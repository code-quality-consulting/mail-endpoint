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
        "It should detect unauthorized processes": {
            expect: checkEnvIntruders(evilPseudoProcess.env),
            toEqual: true
        },
        "It should allow an authorized process to succeed": {
            expect: checkEnvIntruders(goodPseudoProcess.env, ["PORT"]),
            toEqual: false
        },
        "It should detect unauthorized processes amongst authorized ones": {
            expect: checkEnvIntruders(mixedPseudoProcess.env, ["PORT"]),
            toEqual: true
        },
        "It should allow empty variables through the environment": {
            expect: checkEnvIntruders(emptyPseudoProcess.env),
            toEqual: false
        },
        "It should allow unused authorized processes": {
            expect: checkEnvIntruders(emptyPseudoProcess.env, ["PORT"]),
            toEqual: false
        }
    };

    const failingAssertions = Object.keys(assertions)
        .filter(function (assertion) {
            const {expect, toEqual} = assertions[assertion];
            return !(expect === toEqual);
        });

    failingAssertions.forEach(function (assertion) {
        console.error(
            assertion
        );
    });

    if (failingAssertions.length === 0) {
        console.log("All tests are passing for environment variables.");
    }

}

export default testEnvVariables;
