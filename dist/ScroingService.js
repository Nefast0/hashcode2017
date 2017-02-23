"use strict";
var _ScoringService = (function () {
    function _ScoringService() {
    }
    _ScoringService.prototype.score = function (solutionContainer, input) {
        var score = 0;
        var totalRequests = 0;
        input.endpointRequests.forEach(function (endpointRequest) {
            totalRequests += endpointRequest.count;
            var endPointCaches = input.endpoints[endpointRequest.endpoint].connectedCacheLatencies;
            var requestTimeSaved = 0;
            endPointCaches.forEach(function (value, index) {
                if (!value)
                    return;
                //                console.log("Inside cache:" + solutionContainer.solution[index]);
                // Cache number 'index' has video
                if (solutionContainer.solution[index].indexOf(endpointRequest.videoNumber) !== -1) {
                    requestTimeSaved = input.endpoints[endpointRequest.endpoint].dataCenterLatency -
                        input.endpoints[endpointRequest.endpoint].connectedCacheLatencies[index];
                }
            });
            //            console.log("Time saved " + requestTimeSaved);
            score += requestTimeSaved * endpointRequest.count;
        });
        return score / totalRequests;
    };
    return _ScoringService;
}());
exports._ScoringService = _ScoringService;
exports.ScoringService = new _ScoringService();
