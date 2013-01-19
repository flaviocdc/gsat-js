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
  this.num_literals = num_literals;

  this.evalClause = function(clause, env) {
    return new Literal(clause, 0).eval(env) || new Literal(clause, 1).eval(env) || new Literal(clause, 2).eval(env);
  };

  this.apply = function(env) {
    for (var i = 0; i < this.clauses.length; i++) {
      var clause = this.clauses[i];
      
      var bool = this.evalClause(clause, env);
      if (!bool) return false;
    }

    return true;
  };

  this.satisfied = function(env) {
    var s = 0;

    for (var i = 0; i < this.clauses.length; i++) {
      var clause = this.clauses[i];
      var bool = this.evalClause(clause, env);
      if (bool) s++;
    }

    return s;
  }
};
