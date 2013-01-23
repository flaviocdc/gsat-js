load("utils.js");

function main() {
  var num_literals = 5;
  var clauses = 22;

  print(num_literals);

  for (var i = 0; i < clauses; i++) {
    var rand1 = random_int(num_literals - 1) * (random_bool() ? 1 : -1);

    var rand2 = 0;
    do {
      rand2 = random_int(num_literals - 1) * (random_bool() ? 1 : -1);
    } while (Math.abs(rand2) == Math.abs(rand1));

    var rand3 = 0;
    do {
      rand3 = random_int(num_literals - 1) * (random_bool() ? 1 : -1);
    } while (Math.abs(rand1) == Math.abs(rand3) || Math.abs(rand2) == Math.abs(rand3));

    print(rand1, rand2, rand3);
  }

  print("stop");
}

main();
