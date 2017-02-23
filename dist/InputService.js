"use strict";
exports.INPUT_KITTENS = 'input/kittens.in';
exports.EXAMPLE = 'input/example.in';
var _InputService = (function () {
    function _InputService() {
    }
    _InputService.prototype.read = function (filename) {
        var currentLineNumber = 0;
        var currentlyEndpointDescription = false;
        var nextNLinesAreEndpointCacheDescriptions = 0;
        var currentEndpoint = null;
        var thisReference = this;
        var lineReader = require('readline').createInterface({
            input: require('fs').createReadStream(filename)
        });
        var fileStructure;
        lineReader.on('end', function () {
            console.log(fileStructure);
        });
        lineReader.on('line', function (line) {
            currentLineNumber++;
            var splitLine = line.split(' ');
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
                for (var x = 0; x < fileStructure.cacheCount; x++) {
                    fileStructure.cacheSizes.push(+splitLine[4]);
                }
                return;
            }
            if (currentLineNumber === 2) {
                fileStructure.videoSizes = line.split(' ').map(function (l) { return +l; });
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
    };
    return _InputService;
}());
exports._InputService = _InputService;
exports.InputService = new _InputService();
