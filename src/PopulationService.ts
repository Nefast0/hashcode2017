import { FileStructure } from '../src/InputService';

export interface SolutionContainer {
    solution: {[key: number]: number[]}
    score: number;
}

export interface Population {
    solutions: SolutionContainer[];
}

export class _PopulationService {

    public generatePopulation(populationSize: number, input: FileStructure) {

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
        }

        return population;
    }
}

export const PopulationService = new _PopulationService();