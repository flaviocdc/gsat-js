load("gsat.js");

function main() {
  print("Enter the number of restarts");
  var retries = parseInt(readline());

  print("Enter the number of flips");
  var flips = parseInt(readline());

  print("Enter the number of literals");
  var num_literals = parseInt(readline());

  print("Now enter the clauses.");
  print("(3 numbers, separated by spaces, indicating the index of the literal)");
  print("Type 'stop', to stop adding clauses");

  var formula = new Formula(num_literals);

  var line = readline();
  do {
    var numbers = line.split(" ").map(function(it) { return parseInt(it) });
    print(numbers[0], numbers[1], numbers[2]);
    formula.clauses.push(numbers);

    line = readline();
  } while (line != "stop");

  var gsat = new GSAT(formula, retries, flips);
  var truth = gsat.run();

  print("Verdade: ", truth);
}

main();
