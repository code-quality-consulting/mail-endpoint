import {makeServer} from "../../server";
import parseq from "../../dependencies/parseq";
import getIndexFromServer from "./get-index-from-server";
import expectHtml from "./expect-html";

export default function testGetIndex(environmentVariables) {
    return parseq.sequence(
        [
            makeServer(environmentVariables),
            getIndexFromServer(environmentVariables),
            expectHtml(function (response) {
                return {
                    "The content-type should be text/html": {
                        expect: response.headers["content-type"] 
                            === "text/html",
                        toEqual: true,
                        actualResult: response.headers["content-type"]
                    } // add statusCode later
                }
            })
        ]
    )
}
