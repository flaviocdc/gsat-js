load("utils.js");
load("formula.js");

function GSAT(formula, retries, flips) {
  assignment = [];
  assignment.length = formula.num_literals;

  function generate_random_attribution() {
    var literals = [];

    for (var i = 0; i < assignment.length; i++) {
      literals[i] = random_bool();
    }

    assignment = literals;
  }

  function hillclimb() {
    var currently_sat = formula.satisfied(assignment);

    //print("currently_sat = ", currently_sat, " env = ", assignment);

    var better_sat = [];
    var max_sat = currently_sat;
    
    for (var i = 0; i < assignment.length; i++) {
      var new_ls = assignment.slice(0); // cloning the array
      new_ls[i] = !assignment[i]; 

      var sat = formula.satisfied(new_ls);
      if (sat >= currently_sat) {
        //print("Encontrei uma atribuicao que atende melhor");
        better_sat.push({ satisfied: sat, env : new_ls });
        max_sat = Math.max(max_sat, sat);
      }
    }

    //print("Total de atribs que atendem melhor: ", better_sat.length);
    //print("better_sat = ", better_sat.map(function(it) { return it.satisfied + " " + it.env }));

    // best results
    return_sat = better_sat.filter(function(tuple) {
      return tuple.satisfied >= max_sat;
    });

    //print("Total de atribs que atendem melhor depois de filtrada: ", better_sat.length," max_sat = ",max_sat );
    
    return return_sat;
  }

  this.run = function() {
    for (var i = 0; i < retries; i++) {
      generate_random_attribution(formula);
      print("Generating random attr: ", assignment);

      for (var j = 0; j < flips; j++) {
        //print("Tentando verificar verdade");
        if (formula.apply(assignment)) {
          //print("Encontrei!");
          return assignment;
        } else {
          better_sat = hillclimb();

          if (better_sat.length == 0) {
            // dead end?
            break;
          }

          var rand_int = random_int(better_sat.length - 1); // generate random num between 0 and len(better_sat) - 1
          var tuple = better_sat[rand_int];
          assignment = tuple.env;
        }
      }

      print("Com a atribuicao inicial e o numero flips nao foi possivel encontrar uma solucao, tentar novamente");
    }

    if (formula.apply(assignment)) {
      return assignment;
    } else {
      return false;
    }
  }
}
