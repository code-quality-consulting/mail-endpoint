import util from "util";


export default function (nameOfFile) {
    const makeDebugger = util.debuglog(nameOfFile);
    return function (color) {
        return function (args) {
            return makeDebugger(color, args);
        };
    };
};
