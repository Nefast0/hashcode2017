import fs = require('fs');

export const INPUT_KITTENS = 'input/kittens.in';
export const EXAMPLE = 'input/example.in';

export interface FileStructure {
    videoCount: number;
    endpointCount: number;
    requestDescriptionCount: number;
    cacheCount: number;
    cacheSizes: number[];
    videoSizes: number[];
    endpoints: Endpoint[];
}

export interface Endpoint {
    dataCenterLatency: number;
    // array index refers to cache index
    cacheCount: number;
    connectedCacheLatencies: number[];
}

export class _InputService {

    public read(filename: string) {

        var currentLineNumber = 0;
        var currentlyEndpointDescription = false;
        var nextNLinesAreEndpointCacheDescriptions = 0;
        var currentEndpoint: Endpoint = null;
        const thisReference = this;

        var lineReader = require('readline').createInterface({
            input: require('fs').createReadStream(filename)
        });

        let fileStructure: FileStructure;

        lineReader.on('end', () => {
            console.log("end");
            console.log(fileStructure);
        });

        lineReader.on('line', (line) => {
            currentLineNumber++;

            const splitLine = line.split(' ');

            if (currentLineNumber === 1) {
                fileStructure = {
                    videoCount: +splitLine[0],
                    endpointCount: +splitLine[1],
                    requestDescriptionCount: +splitLine[2],
                    cacheCount: +splitLine[3],
                    cacheSizes: [],
                    endpoints: [],
                    videoSizes: []
                };

                for (let x = 0; x < fileStructure.cacheCount; x++) {
                    fileStructure.cacheSizes.push(+splitLine[4]);
                }

                return;
            }

            if (currentLineNumber === 2) {
                fileStructure.videoSizes = line.split(' ').map((l) => +l);
                currentlyEndpointDescription = true;

                return;
            }

            if (currentlyEndpointDescription) {

                currentEndpoint = {
                    dataCenterLatency: +splitLine[0],
                    cacheCount: +splitLine[1],
                    connectedCacheLatencies: []
                };

                fileStructure.endpoints.push(currentEndpoint);
                currentlyEndpointDescription = false;
                nextNLinesAreEndpointCacheDescriptions = currentEndpoint.cacheCount;
                return;
            }

            if (nextNLinesAreEndpointCacheDescriptions--) {
                currentEndpoint.connectedCacheLatencies[+splitLine[0]] = +splitLine[1];
                return;
            }

            currentlyEndpointDescription = true;
        });
    }
}

export const InputService = new _InputService();