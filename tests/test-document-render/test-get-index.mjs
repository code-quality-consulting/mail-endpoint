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
                        //expect: response.headers["content-type"] 
                        expect: response.contentType 
                            === "text/html",
                        toEqual: true,
                        actualResult: response.contentType
                    },
                    "The status code should be 200": {
                        expect: response.statusCode === 200,
                        toEqual: true,
                        actualResult: response.statusCode
                    },
                    "The response sends an HTML document": {
                        expect: response.data === "<!DOCTYPE HTML>",
                        toEqual: true,
                        actualResult: response.statusCode
                    }
                }
            })
        ]
    )
}
