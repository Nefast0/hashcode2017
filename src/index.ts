import { InputService, INPUT_KITTENS, EXAMPLE, FileStructure } from './InputService';

InputService.read(EXAMPLE);
var input = InputService.read(EXAMPLE).then((fileStructure: FileStructure) => {
    console.log(fileStructure);
});

const POPULATION_SIZE = 100;
const ITERATIONS_NUMBER = 1000;


//var population = GeneratePopulation(POPULATION_SIZE, input); // randomly generates valid solutions and calculates scores as well
var population = [];

/*
 * solution = { solution => { Cindex => [Vid, Vid, ...], Cindex => { ... } }, score => 123 }
 */

var iteration = 0;
while (iteration++ < ITERATIONS_NUMBER) {
    var new_generation = [];

    while (new_generation.length < POPULATION_SIZE) {
        var chosen = SelectChildren(population);
        chosen = CrossChildren(chosen); // calculates score as well
        chosen = MutateChildren(chosen);

        new_generation.push(chosen); // addes only solution that are better than average
    }
    ;

    population = new_generation;
}

var best = population[0];
population.forEach(function (solution) {
    if (best.score < solution.score) {
        best = solution;
    }
});

//OutputService.write(best);

function SelectChildren(population) {
    const k = 10;

    var chosen = [];
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
