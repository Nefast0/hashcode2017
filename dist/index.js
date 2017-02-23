"use strict";
var InputService_1 = require('./InputService');
InputService_1.InputService.read(InputService_1.INPUT_KITTENS);
/*
const POPULATION_SIZE = 100;
const ITERATIONS_NUMBER = 1000;

var population = GeneratePopulation(POPULATION_SIZE, input); // randomly generates valid solutions and calculates scores as well

/*
 * solution = { solution => { Cindex => [Vid, Vid, ...], Cindex => { ... } }, score => 123 }


var iteration = 0;
while (iteration++ < ITERATIONS_NUMBER)
{
  var new_generation = [];

  while (new_generation.lengith() < POPULATION_SIZE)
  {
    var chosen = SelectChildren(population);
    chosen = CrossChildren(chosen); // calculates score as well
    chosen = MutateChildren(chosen);

    new_generation.add(chosen); // addes only solution that are better than average
  };

  population = new_generation;
};

var best = population[0];
population.foreach( function(solution)
{
  if (best.score < solution.score)
  {
    best = solution;
  }
});

OutputService.write(best);
*/
