"use strict";
exports.INPUT_KITTENS = 'input/kittens.in';
var _InputService = (function () {
    function _InputService() {
        this.currentLineNumber = 0;
    }
    _InputService.prototype.read = function (filename) {
        this.currentLineNumber = 0;
        var thisReference = this;
        var lineReader = require('readline').createInterface({
            input: require('fs').createReadStream(filename)
        });
        lineReader.on('line', function (line) {
            console.log(thisReference.currentLineNumber);
            if (this.currentLineNumber === 0) {
                console.log(line);
            }
            this.currentLineNumber++;
        });
    };
    return _InputService;
}());
exports._InputService = _InputService;
exports.InputService = new _InputService();
