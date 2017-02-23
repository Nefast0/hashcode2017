"use strict";
var InputService_1 = require('./InputService');
var PopulationService_1 = require('./PopulationService');
InputService_1.InputService.read(InputService_1.EXAMPLE).then(function (fileStructure) { return console.log(PopulationService_1.PopulationService.generatePopulation(100, fileStructure)); });
function run(input) {
    var POPULATION_SIZE = 100;
    var K = POPULATION_SIZE / 10;
    var ITERATIONS_NUMBER = 1000;
    var population = PopulationService_1.PopulationService.generatePopulation(POPULATION_SIZE, input);
    var iteration = 0;
    while (iteration++ < ITERATIONS_NUMBER) {
        var new_generation = {
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
function SelectChildren(population, k) {
    var chosen = [];
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
    var firstDude = chosen[0];
    var secondDude = chosen[1];
    var l = firstDude.solution.length;
    for (var i = 0; i < l; i += 2) {
        firstDude.solution[i] = secondDude.solution[i];
    }
    return chosen;
}
function CrossChildren2(chosen) {
    var firstDude = chosen[0];
    var secondDude = chosen[1];
    var l = firstDude.solution.length;
    for (var i = 0; i < l; i++) {
        var firstList = firstDude.solution[i];
        var secondList = secondDude.solution[i];
        var newFirstList = [];
        var newSecondList = [];
        for (var j = 0; j < firstList.length; j++) {
            if (j % 2 == 0) {
                newFirstList.push(firstList[j]);
            }
            else {
                newSecondList.push(firstList[j]);
            }
        }
        for (var j = 0; j < secondList.length; j++) {
            if (j % 2 == 0) {
                newSecondList.push(firstList[j]);
            }
            else {
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
