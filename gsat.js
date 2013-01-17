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

    var more_sat = [];
    var max_sat = currently_sat;
    
    for (var i = 0; i < formula.ls.length; i++) {
      var new_ls = formula.ls.slice(0); // cloning the array
      new_ls[i] = !formula.ls[i]; 

      var sat = formula.satisfied(new_ls);
      if (sat >= currently_sat) {
        //print("Encontrei uma atribuicao que atende melhor");
        more_sat.push({ satisfied: sat, env : new_ls });
        max_set = sat > max_sat ? sat : max_sat;
      }
    }

    //print("Total de atribs que atendem melhor: ", more_sat.length);

    more_sat.filter(function(tuple) {
      return tuple.satisfied >= max_sat;
    });

    //print("Total de atribs que atendem melhor depois de filtrada: ", more_sat.length);
    
    return more_sat;
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
          more_sat = hillclimb(formula);
          var rand_int = random_int(more_sat.length - 1); // generate random num between 0 and len(more_sat) - 1
          
          //print("more_sat.length = ", more_sat.length, " / rand_int = ", rand_int);
          var tuple = more_sat[rand_int];
          formula.ls = tuple.env;
        }
      }

      print("Com a atribuicao inicial e o numero flips nao foi possivel encontrar uma solucao, tentar novamente");
    }

    return forumla.ls;
  }
}
