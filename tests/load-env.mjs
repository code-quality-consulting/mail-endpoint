import assert from "assert";
import configureEnv from "../library/configure-env.mjs";

configureEnv()(assert.strictEqual(process.env.PORT, "3001"));
