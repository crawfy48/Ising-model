Ising-model
===========

Ising model simulation using terra.js

terra.js is a Javascript library for biological simulations and cellular automata (visit http://rileyjshaw.com/terra/ for more details). It was used to implement a simple cellular automaton: Ising model of 2D ferromagnetic material, where each cell is a magnetic domain with 2 states: "up" (+1) or "down" (-1), indicated by different colors. The state is changed according to the Metropolis criterion.

The simulation is running in real time, and certain parameters can be adjusted:
- temperature is used to calculate the probability of a domain flip (bigger temperature means bigger termal noise, which means more chaotic flipping)
- external magnetic field favors domains aligned in the same direction as the field (positive field favors "up" domains, negative "down" domains).
- friction: when the change of energy is calculated for the Metropolis criterion, the friction parameter is always added to it (to prevent artificial continous domain flipping or to simulate histeresis).

ising.html, ising.css and metropolis.gif constitute the webpage, on which the script is placed. terra.min.js is the terra library downloaded from http://rileyjshaw.com/terra/, and the ising.js is the script itself (the most important file).

Installation is simple: copy all the files to the same folder and open index.html.
A working version is hosted here: http://students.mimuw.edu.pl/~lm320319/ising.html
