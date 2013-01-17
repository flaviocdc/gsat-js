gsat-js
=======

What's this?
============

That's a small project I did for my Artificial Intelligence class.
This program solves the 3-SAT problem using local search strategy.

How to run?
===========

If you are using Archlinux, you should try to install a package named *v8*.
After installing it you should simply checkout the project and follow this steps:

    cd <project-dir>
    d8 main.js

Input
=====

While inputing the clauses, you can use negative integers to represent negation of a literal.
Example:
    1 -2 3 represents A + !B + C
