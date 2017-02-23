"use strict";
var InputService_1 = require('./InputService');
var PopulationService_1 = require('./PopulationService');
var writeSolution_1 = require('./writeSolution');
InputService_1.InputService.read(InputService_1.INPUT_KITTENS).then(function (fileStructure) { return run(fileStructure); });
var currentInput;
function run(input) {
    var POPULATION_SIZE = 10;
    var K = POPULATION_SIZE / 10;
    var ITERATIONS_NUMBER = 1000;
    currentInput = input;
    var population = PopulationService_1.PopulationService.generatePopulation(POPULATION_SIZE, input);
    var iteration = 0;
    while (iteration++ < ITERATIONS_NUMBER) {
        console.log("Iteration: " + iteration);
        var new_generation = {
            solutions: []
        };
        while (new_generation.solutions.length < POPULATION_SIZE) {
            var chosen = SelectChildren(population, K);
            chosen = CrossChildren(chosen); // calculates score as well
            chosen = MutateChildren(chosen);
            new_generation.solutions = new_generation.solutions.concat(chosen); // addes only solution that are better than average
        }
        population = new_generation;
    }
    var best = population.solutions[0];
    population.solutions.forEach(function (solution) {
        if (best.score < solution.score) {
            best = solution;
        }
    });
    console.log(best);
    writeSolution_1.write(best.solution);
}
function SelectChildren(population, k) {
    var chosen = [];
    var taken = {};
    for (var i = 0; i < k; i++) {
        var r = Math.floor(Math.random() * population.solutions.length);
        if (!taken[r]) {
            chosen.push(population.solutions[r]);
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
        var tmp = firstDude.solutions[i];
        firstDude.solution[i] = secondDude.solution[i];
        secondDude.solution[i] = tmp;
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
        firstDude.solution[i] = removeExtraVideosFromList(newFirstList, i);
        secondDude.solution[i] = removeExtraVideosFromList(newSecondList, i);
    }
    return chosen;
}
function removeExtraVideosFromList(list, idOfHashServer) {
    var cacheServerSize = currentInput.cacheSizes[idOfHashServer];
    var currentSize = 0;
    var newList = [];
    for (var x in list) {
        currentSize += currentInput.videoSizes[list[x]];
        if (currentSize < cacheServerSize) {
            newList.push(list[x]);
        }
    }
    return newList;
}
function MutateChildren(chosen) {
    for (var i = 0; i < chosen.length; i++) {
        if (Math.random() < 0.01) {
            chosen[i] = MutateChild(chosen[i]);
        }
    }
    return chosen;
}
function MutateChild(chosen) {
    // const allLists = [];
    //
    // Object.keys(chosen.solution).forEach((hashServerIndex) => {
    //     allLists.concat(chosen.solution[hashServerIndex]);
    // });
    //
    // Object.keys(chosen.solution).forEach((hashServerIndex) => {
    //     const cacheServerSize = currentInput.cacheSizes[hashServerIndex];
    //
    //
    // });
    return chosen;
}
