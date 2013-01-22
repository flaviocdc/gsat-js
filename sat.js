load("formula.js");

function SAT(formula) {
  this.formula = formula

  function recursion(number) {
    if (number === Math.pow(2,formula.num_literals)) {
      return undefined;
    }

    var assignment = number.toString(2).split('').map(function(it) { return "1" === it });
    for (i=assignment.length; i < formula.num_literals; i++) {
      assignment.unshift(false); // add in front of the array
    }

    assignment.unshift(false); // insert dummy entry in front of array, our literals dont start on zero!

    if (formula.apply(assignment)) {
      return assignment;
    }

    return recursion(number+1);
  }

  this.run = function() {
    var answer = recursion(0);
    if (answer !== undefined)
        answer.splice(0,1); // removing first dummy entry

    return answer;
  }
}
