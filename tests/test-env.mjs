/*jslint
    node
*/

//import os from "os"
import process from "process";
import assert from "assert";

function testEnvVariables() {
    console.log(
        "Number of environment variables set is ",
        Object.keys(process.env).length
    );

    assert.strictEqual(Object.keys(process.env).length, 0);
    console.log("Number of environment variables is set to 0.");
}

export default testEnvVariables;
