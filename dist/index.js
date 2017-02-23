"use strict";
var InputService_1 = require('./InputService');
var PopulationService_1 = require('./PopulationService');
InputService_1.InputService.read(InputService_1.EXAMPLE).then(function (fileStructure) { return console.log(PopulationService_1.PopulationService.generatePopulation(100, fileStructure)); });
function run(input) {
    var POPULATION_SIZE = 100;
    var ITERATIONS_NUMBER = 1000;
    var population = PopulationService_1.PopulationService.generatePopulation(POPULATION_SIZE, input);
    var iteration = 0;
    while (iteration++ < ITERATIONS_NUMBER) {
        var new_generation = {
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
function SelectChildren(population) {
    var k = 10;
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
