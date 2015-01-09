var size=50;  //lattice size is 50x50
var IsingModel = new terra.Terrarium
(size, size,
{
  id: 'IsingTerrarium',
  periodic: true,
  neighborhood: 'vonNeumann',
  insertAfter: document.getElementById('placeholder')
});

var magnetization = 0;
var counter=0;
var N=size*size;

terra.registerCA({
  type: 'Ising',
  colorFn: function () { return this.state === 1 ? this.color + ',1' : '0,0,0,0'; },
  process: function (neighbors, x, y)
  {
	counter+=1;
	if (counter==N)
	{   // Magnetization is the sum of domains' states
		document.getElementById("printM").innerHTML = magnetization;
		document.getElementById("printm").innerHTML = magnetization*1.0/N;
		counter=magnetization=0;
	}   // zero M to count it again
	magnetization +=this.state;
	randomness = parseFloat(document.getElementById("R").value);
	if (Math.random() > randomness)
	{
		// 3 parameters of the model: temperature, external field and friction
		temp =	parseFloat(document.getElementById("T").value);
		field = parseFloat(document.getElementById("H").value);
		friction = parseFloat(document.getElementById("F").value);
		coupling = parseFloat(document.getElementById("J").value);
		document.getElementById("printJ").innerHTML = coupling;
		document.getElementById("printT").innerHTML = temp;
		document.getElementById("printH").innerHTML = field;
		document.getElementById("printF").innerHTML = friction;
		deltaE = 0;  // Change of energy in case of domain flip
		for (var i = 0; i < neighbors.length; i++) 
			deltaE += neighbors[i].creature.state;
		// only neighbors determine the energy change
		deltaE *= coupling*this.state;  // everything is counted in respect to the domain
		deltaE += field*this.state;       // external field influence
		deltaE += friction;    // friction is added as a "potential step"
		if (deltaE<0)          // Metropolis criterion
			this.state *= -1;  // domain flipping
		else if (Math.random() < Math.exp(-deltaE*0.5/temp))
		{  // Every constant, like Boltzmann's k, is equal to 1 here
			this.state *= -1;  // domain flipping
		}
	}
	return true;
  }
}, function () {
 if (Math.random() > 0.5)
		this.state = 1;
	else     // Initial state is chosen randomly
		this.state = -1;
});

IsingModel.grid = IsingModel.makeGrid('Ising');
IsingModel.animate();
function next()
{
	IsingModel.animate(1);
}
function play()
{
	IsingModel.animate();
}
function stop()
{
	IsingModel.stop();
}
function reset()
{
	parseFloat(document.getElementById("R").value=0.9);
	document.getElementById("J").value = 1.0;
	document.getElementById("T").value = 0.2;
	document.getElementById("H").value = 0.0;
	document.getElementById("F").value = 0.0;
	IsingModel.stop();
	IsingModel.grid = IsingModel.makeGrid('Ising');
	IsingModel.animate(1);
}