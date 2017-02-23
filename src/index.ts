import { InputService, INPUT_KITTENS, EXAMPLE, FileStructure } from './InputService';
import { PopulationService, Population, SolutionContainer } from './PopulationService';

InputService.read(EXAMPLE).then((fileStructure: FileStructure) => console.log(PopulationService.generatePopulation(100, fileStructure)));

function run(input: FileStructure) {
    const POPULATION_SIZE = 100;
    const K = POPULATION_SIZE / 10;
    const ITERATIONS_NUMBER = 1000;

    let population = PopulationService.generatePopulation(POPULATION_SIZE, input);

    var iteration = 0;
    while (iteration++ < ITERATIONS_NUMBER) {
        var new_generation: Population = {
            solutions: []
        };

        while (new_generation.solutions.length < POPULATION_SIZE) {
            var chosen = SelectChildren(population, K);
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


function SelectChildren(population, k): SolutionContainer[] {
    var chosen: SolutionContainer[] = [];
    var taken = {};
    for (var i = 0; i < k; i++) {
        var r = Math.floor(Math.random() * population.length);
        if (!taken[r]) {
            chosen.push(population[r]);
            taken[r] = true;
        }
    }

    return chosen.sort(function (a, b) {
        return b.score - a.score;
    }).slice(0, 2);
}

function CrossChildren(chosen) {
    if (Math.random() > 0.5) {
        return CrossChildren1(chosen);
    }
    return CrossChildren2(chosen);
}

function CrossChildren1(chosen) {
    let firstDude = chosen[0];
    let secondDude = chosen[1];
    let l = firstDude.solution.length;

    for (var i = 0; i < l; i += 2) {
        firstDude.solution[i] = secondDude.solution[i];
    }

    return chosen;
}

function CrossChildren2(chosen) {
    let firstDude = chosen[0];
    let secondDude = chosen[1];
    let l = firstDude.solution.length;

    for (var i = 0; i < l; i++) {
        let firstList = firstDude.solution[i];
        let secondList = secondDude.solution[i];

        let newFirstList = [];
        let newSecondList = [];

        for (var j = 0; j < firstList.length; j++) {
            if (j % 2 == 0) {
                newFirstList.push(firstList[j]);
            } else {
                newSecondList.push(firstList[j]);
            }
        }
        for (var j = 0; j < secondList.length; j++) {
            if (j % 2 == 0) {
                newSecondList.push(firstList[j]);
            } else {
                newFirstList.push(firstList[j]);
            }
        }

        firstDude.solution[i] = newFirstList;
        secondDude.solution[i] = newSecondList;
    }

    return chosen;
}

function MutateChildren(chosen) {

    return chosen;
}
