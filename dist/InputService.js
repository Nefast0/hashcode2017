"use strict";
exports.INPUT_KITTENS = 'input/kittens.in';
var _InputService = (function () {
    function _InputService() {
        this.currentLineNumber = 0;
    }
    _InputService.prototype.read = function (filename) {
        var _this = this;
        this.currentLineNumber = 0;
        var thisReference = this;
        var lineReader = require('readline').createInterface({
            input: require('fs').createReadStream(filename)
        });
        var fileStructure;
        lineReader.on('line', function (line) {
            if (_this.currentLineNumber === 0) {
                var splitLine = line.split(' ');
                fileStructure = {
                    videoCount: +splitLine[0],
                    endpointCount: +splitLine[1],
                    requestDescriptionCount: +splitLine[2],
                    cacheCount: +splitLine[3],
                    cacheSizes: []
                };
                for (var x = 0; x < fileStructure.cacheCount; x++) {
                    fileStructure.cacheSizes.push(+splitLine[4]);
                }
                console.log(fileStructure);
            }
            _this.currentLineNumber++;
        });
    };
    return _InputService;
}());
exports._InputService = _InputService;
exports.InputService = new _InputService();
