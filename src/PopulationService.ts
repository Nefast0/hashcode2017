import { FileStructure } from '../src/InputService';
import { ScoringService } from './ScroingService';

export interface SolutionContainer {
    solution: {[key: number]: number[]}
    score: number;
}

export interface Population {
    solutions: SolutionContainer[];
}

export class _PopulationService {

    public generatePopulation(populationSize: number, input: FileStructure): Population {
        // Test data
        /**
         const asd: Population = {
            solutions: [{
                solution: {
                    0: [2],
                    1: [3, 1],
                    2: [0, 1]
                },
                score: -1
            }]
        };

         asd.solutions[0].score = ScoringService.score(asd.solutions[0], input);

         return asd;
         */

        const population: Population = {
            solutions: []
        };

        for (var x = 0; x < populationSize; x++) {

            const solutionContainer: SolutionContainer = {
                score: -1,
                solution: {}
            };
            population.solutions.push(solutionContainer);

            for (var y = 0; y < input.cacheCount; y++) {
                solutionContainer.solution[y] = [];

                let currentCacheSize = 0;

                while (true) {
                    const randomVideoIndex = Math.floor(Math.random() * input.videoCount);

                    if (currentCacheSize + input.videoSizes[randomVideoIndex] < input.cacheSizes[y]) {
                        solutionContainer.solution[y].push(randomVideoIndex);
                        currentCacheSize += input.videoSizes[randomVideoIndex];
                    } else {
                        break;
                    }
                }

            }
            solutionContainer.score = ScoringService.score(solutionContainer, input);
        }

        return population;
    }
}

export const PopulationService = new _PopulationService();