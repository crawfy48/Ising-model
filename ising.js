var size=50;  //lattice size is 50x50
var IsingModel =new terra.Terrarium 
(size,size,"IsingTerrarium",10,document.getElementById('placeholder'));  
var magnetization = 0;
var counter=0;
terra.registerCA({  // register cellular automaton
  type: 'Ising',    // name it Ising
  colorFn: function ()  // connect domain state (-1 albo 1) with color
  { // If state=1, cell is colored, if not, it stays white
	return this.state==1 ? this.color + ',1' : '0,0,0,0';
  },
  process: function (neighbors) // process works separately for every domain
  { // Counter increases with every domain, there is LxL domains
	counter+=1;
	if (counter==size*size)
	{   // Magnetization is the sum of domains' states
		document.getElementById("printM").innerHTML = magnetization;
		counter=magnetization=0;
	}   // zero M to count it again
	magnetization +=this.state;
	// 3 parameters of the model: temperature, external field and friction
	temp =	parseFloat(document.getElementById("T").value);
	field = parseFloat(document.getElementById("H").value);
	friction = parseFloat(document.getElementById("F").value);
	document.getElementById("printT").innerHTML = temp;
	document.getElementById("printH").innerHTML = field;
	document.getElementById("printF").innerHTML = friction;
	deltaE = 0;  // Change of energy in case of domain flip
	for (var i = 0; i < neighbors.length; i++) 
		deltaE += neighbors[i].creature.state;
	// only neighbors determine the energy change
	if (neighbors.length<8)
		deltaE *= 8/neighbors.length;
	// instead of periodic boundary conditions I re-scale
	// deltaE like the domain had 8 neighbors
	deltaE += field;       // external field influence
	deltaE *= this.state;  // everything is counted in respect to the domain
	deltaE += friction;    // friction is added as a "potential step"
	if (deltaE<0)          // Metropolis criterion
		this.state *= -1;  // domain flipping
	else if (Math.random() < Math.exp(-deltaE*0.5/temp))
	{  // Every constant, like Boltzmann's k, is equal to 1 here
		this.state *= -1;  // domain flipping
	}
  }
}, 
function ()  // function for making new cells
{
	this.alive=true;  // Just in case it makes any difference
	if (Math.random() > 0.5)
		this.state = 1
	else     // Initial state is chosen randomly
		this.state = -1
});
// Make the grid and animate it
IsingModel.grid = IsingModel.makeGrid('Ising');
IsingModel.animate();
