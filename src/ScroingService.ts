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

                // Cache number 'index' has video
                if (solutionContainer.solution[index].indexOf(endpointRequest.videoNumber)) {
                    requestTimeSaved = input.endpoints[endpointRequest.endpoint].dataCenterLatency - input.cacheSizes[index];
                }
            });

            score += requestTimeSaved * endpointRequest.count;
        });

        return score / totalRequests;
    }
}

export const ScoringService = new _ScoringService();