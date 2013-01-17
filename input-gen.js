load("utils.js");

function main() {
  var retries = 999;
  var flips = 5;
  var num_literals = 5;
  var clauses = 20;

  print(retries);
  print(flips);
  print(num_literals);

  for (var i = 0; i < clauses; i++) {
    var rand1 = random_int(num_literals - 1) * (random_bool() ? 1 : -1);
    var rand2 = random_int(num_literals - 1) * (random_bool() ? 1 : -1);
    var rand3 = random_int(num_literals - 1) * (random_bool() ? 1 : -1);

    print(rand1, rand2, rand3);
  }

  print("stop");
}

main();
