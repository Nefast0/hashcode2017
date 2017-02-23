import { SolutionContainer } from './PopulationService';
import { FileStructure, EndpointRequest } from './InputService';

export class _ScoringService {

    public score(solutionContainer: SolutionContainer, input: FileStructure) {

        let score = 0;
        let totalRequests = 0;

        input.endpointRequests.forEach((endpointRequest: EndpointRequest) => {

            totalRequests += endpointRequest.count;

            const endPointCaches = input.endpoints[endpointRequest.endpoint].connectedCacheLatencies;

            let requestTimeSaved = 0;

            endPointCaches.forEach((value, index) => {
                if (!value) return;

//                console.log("Inside cache:" + solutionContainer.solution[index]);

                // Cache number 'index' has video
                if (solutionContainer.solution[index].indexOf(endpointRequest.videoNumber) !== -1) {
                    requestTimeSaved = input.endpoints[endpointRequest.endpoint].dataCenterLatency -
                        input.endpoints[endpointRequest.endpoint].connectedCacheLatencies[index];
//                    console.log("Example endpoint request time: " + input.endpoints[endpointRequest.endpoint]);
//                    console.log("Cache time: ", input.endpoints[endpointRequest.endpoint].connectedCacheLatencies[index]);
//                    console.log(requestTimeSaved);
                }
            });

//            console.log("Time saved " + requestTimeSaved);

            score += requestTimeSaved * endpointRequest.count;
        });

        return score / totalRequests;
    }
}

export const ScoringService = new _ScoringService();