function print_2d_array(array) {
  for (var i = 0; i < array.length; i++) {
    for (var j = 0; j < array[i].length; j++) {
      write(array[i][j], " ");
    }
    print();
  }
}

function random_bool() {
  var f = Math.random();
  return f >= 0.5;
}

function random_int(max) {
  return Math.floor(Math.random()*(max+1));
}
