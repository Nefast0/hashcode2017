import { InputService, INPUT_KITTENS, EXAMPLE, FileStructure } from './InputService';
import { PopulationService, Population, SolutionContainer } from './PopulationService';

InputService.read(EXAMPLE).then((fileStructure: FileStructure) => console.log(PopulationService.generatePopulation(100, fileStructure)));

function run(input: FileStructure) {
    const POPULATION_SIZE = 100;
    const ITERATIONS_NUMBER = 1000;

    let population = PopulationService.generatePopulation(POPULATION_SIZE, input);

    var iteration = 0;
    while (iteration++ < ITERATIONS_NUMBER) {
        var new_generation: Population = {
            solutions: []
        };

        while (new_generation.solutions.length < POPULATION_SIZE) {
            var chosen = SelectChildren(population);
            chosen = CrossChildren(chosen); // calculates score as well
            chosen = MutateChildren(chosen);

            new_generation.solutions.concat(chosen); // addes only solution that are better than average
        }

        population = new_generation;
    }

    var best = population[0];
    population.solutions.forEach(function (solution) {
        if (best.score < solution.score) {
            best = solution;
        }
    });

    //OutputService.write(best);
}


function SelectChildren(population): SolutionContainer[] {
    const k = 10;

    var chosen: SolutionContainer[] = [];
    var taken = {};
    for (var i = 0; i < k; i++) {
        var r = Math.floor(Math.random() * population.length);
        if (!taken[r]) {
            chosen.push(population[r]);
            taken[r] = true;
        }
    }

    return chosen;
}

function CrossChildren(chosen) {
    return chosen;
}

function MutateChildren(chosen) {
    return chosen;
}
