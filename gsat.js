load("utils.js");

function Literal(clause, clause_index) {
  var index = Math.abs(clause[clause_index]);
  var not = clause[clause_index] < 0;
  
  this.eval = function(env) {
    var b = env[index];
    return not ? !b : b;
  }
}

function Formula(num_literals) {
  this.clauses = new Array();

  this.ls = [];
  this.ls.length = num_literals;

  this.evalClause = function(clause, env) {
    return new Literal(clause, 1).eval(env) || new Literal(clause, 2).eval(env) || new Literal(clause, 3).eval(env);
  };

  this.apply = function() {
    for (var i = 0; i < this.clauses.length; i++) {
      var clause = this.clauses[i];
      
      var bool = this.evalClause(clause, this.ls);
      if (!bool) return false;
    }

    return true;
  };

  this.satisfied = function(env) {
    var s = 0;

    for (var i = 0; i < this.clauses.length; i++) {
      var clause = this.clauses[i];
      var b = this.evalClause(clause, env);
      if (b) s++;
    }

    return s;
  }
};

function GSAT(formula, retries, flips) {
  function generate_random_attribution() {
    var literals = [];

    for (var i = 0; i < formula.ls.length; i++) {
      literals[i] = random_bool();
    }

    formula.ls = literals;
  }

  function hillclimb() {
    var currently_sat = formula.satisfied(formula.ls);

    //print("currently_sat = ", currently_sat, " env = ", formula.ls);

    var better_sat = [];
    var max_sat = currently_sat;
    
    for (var i = 0; i < formula.ls.length; i++) {
      var new_ls = formula.ls.slice(0); // cloning the array
      new_ls[i] = !formula.ls[i]; 

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
      print("Generating random attr: ", formula.ls);

      for (var j = 0; j < flips; j++) {
        //print("Tentando verificar verdade");
        if (formula.apply()) {
          //print("Encontrei!");
          return formula.ls;
        } else {
          better_sat = hillclimb(formula);

          if (better_sat.length == 0) {
            // dead end?
            break;
          }

          var rand_int = random_int(better_sat.length - 1); // generate random num between 0 and len(better_sat) - 1
          var tuple = better_sat[rand_int];
          formula.ls = tuple.env;
        }
      }

      print("Com a atribuicao inicial e o numero flips nao foi possivel encontrar uma solucao, tentar novamente");
    }

    if (formula.apply()) {
      return formula.ls;
    } else {
      return false;
    }
  }
}
