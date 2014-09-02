var size=50;  //siatka bedzie 50x50
var IsingModel =new terra.Terrarium 
(size,size,"IsingTerrarium",10,document.getElementById('placeholder'));  
var namagnesowanie = 0;
var licznik=0;
terra.registerCA({  // tworze CA, czyli Cellular Automaton
  type: 'Ising',    // nazywam go Ising
  colorFn: function ()  // state to ustawienie domeny (-1 albo 1)
  { // Jesli state=1, koloruje pole, jesli nie, zostawiam biale
	return this.state==1 ? this.color + ',1' : '0,0,0,0';
  },
  process: function (neighbors) // process dziala dla kazdej domeny
  { // Licznik zwieksza sie przy kazdej domenie, domen jest L*L
	licznik+=1;
	if (licznik==size*size)
	{   // Namagnesowanie to suma spinow domen
		document.getElementById("printM").innerHTML = namagnesowanie;
		licznik=namagnesowanie=0;
	}   // Zeruje, zeby w nastepnym kroku policzyc M od nowa
	namagnesowanie +=this.state;
	// Trzy parametry modelu to temperatura, pole i tarcie
	temp =	parseFloat(document.getElementById("T").value);
	field = parseFloat(document.getElementById("B").value);
	friction = parseFloat(document.getElementById("F").value);
	document.getElementById("printT").innerHTML = temp;
	document.getElementById("printB").innerHTML = field;
	document.getElementById("printF").innerHTML = friction;
	deltaE = 0;  // Zmiana energii w przypadku obrocenia domeny
	for (var i = 0; i < neighbors.length; i++) 
		deltaE += neighbors[i].creature.state;
	// dodaje spiny sasiednich domen
	if (neighbors.length<8)
		deltaE *= 8/neighbors.length;
	// zamiast periodycznych warunkow brzegowych poprawiam
	// deltaE przeskalowujac je tak, jakby bylo 8 sasiadow
	deltaE += field;       // wklad od zewnetrznego pola
	deltaE *= this.state;  // wszystko wzgledem danej domeny
	deltaE += friction;    // tarcie zawsze zwieksza energie
	if (deltaE<0)          // Jesli to korzystne, obracam
		this.state *= -1;
	else if (Math.random() < Math.exp(-deltaE*0.5/temp))
	{  // Jesli to niekorzystne, uzywam kryt. Metropolisa
		this.state *= -1;
	}
  }
}, 
function ()  // Funkcja tworzaca komorki
{
	this.alive=true;  // Na wszelki wypadek
	if (Math.random() > 0.5)
		this.state = 1
	else     // Losuje ustawienie poczatkowe domen
		this.state = -1
});
// Tworze siatke i animuje
IsingModel.grid = IsingModel.makeGrid('Ising');
IsingModel.animate();
