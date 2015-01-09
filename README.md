Ising-model
===========

Ising model simulation using terra.js

terra.js is a Javascript library for biological simulations and cellular automata (visit http://rileyjshaw.com/terra/ for more details). It was used to implement a simple cellular automaton: Ising model of 2D ferromagnetic material, where each cell is a magnetic domain with 2 states: "up" (+1) or "down" (-1), indicated by different colors. The state is changed according to the Metropolis criterion.

The simulation is running in real time, and certain parameters can be adjusted:
- randomness is the probability of skipping a domain in single animation step (not applying Metropolis criterion to it). Ideally, only one domain should be checked in each step, but that would slow down the simulation. Setting randomness to 0 means checking every domain, like in the previous version.
- coupling constant describes the interaction between domains: positive value favors the same alignment (up and up or up and down), negative - opposite alignment (up and down). Zero means no interaction at all.
- temperature is used to calculate the probability of a domain flip (bigger temperature means bigger termal noise, which means more chaotic flipping)
- external magnetic field favors domains aligned in the same direction as the field (positive field favors "up" domains, negative "down" domains).
- friction: when the change of energy is calculated for the Metropolis criterion, the friction parameter is always added to it (to prevent artificial continous domain flipping or to simulate histeresis).

ising.html, ising.css and metropolis.gif constitute the webpage, on which the script is placed. mainfile.js is the terra library downloaded from http://cdn.jsdelivr.net/terra/latest/mainfile, and the ising.js is the script itself (the most important file).

Installation is simple: copy all the files to one folder and open ising.html. The content of the gh-pages branch can be viewed online at adress: http://crawfy48.github.io/Ising-model/ising.html
Polish version (old) is hosted here: http://students.mimuw.edu.pl/~lm320319/ising.html
