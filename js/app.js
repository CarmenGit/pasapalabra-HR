// Variables
// -----------------------------------------------------------------------------

var words = [
	new Word(0, "A", "Empieza por A:", " Caudillo cartaginés que, durante la Segunda Guerra Púnica, atacó y destruyó Sagunto, ciudad íbera protegida de Roma.", "Aníbal"),
	new Word(1, "B", "Empieza por B:", " Provincia que se incorporó al resto de provincias de Hispania en las etapas finales del Imperio (297 d. C.).", "Baleárica"),
	new Word(2, "C", "Empieza por C:", " Pueblos que se asentaron en el norte y el oeste de la península ibérica antes del I milenio a. C..", "celtas"),
	new Word(3, "D", "Empieza por D:", " Esculturas femeninas, principales manifestaciones artísticas del arte íbero.", "damas"),
	new Word(4, "E", "Empieza por E:", " Magistrado que se encargaba de las cuestiones locales en las provincias en las que Roma había dividido el territorio de Hispania.", "edil"),
	new Word(5, "F", "Empieza por F:", " Pueblos que llegaron a Hispania por el sur en el siglo VIII a. C..", "fenicios"),
	new Word(6, "G", "Empieza por G:", " Pueblos que llegaron a la Península desde el norte durante el siglo VII a. C. y se establecieron en las costas catalana y valenciana.", "griegos"),
	new Word(7, "H", "Empieza por H:", " Nombre con el que llamaban los romanos a la península ibérica.", "Hispania"),
	new Word(8, "I", "Empieza por I:", " Pueblos asentados en el sur y el este de la península ibérica y en las islas Baleares, cuyos poblados estaban amurallados y sus viviendas eran de planta rectangular.", "íberos"),
	new Word(9, "J", "Contiene la J:", " Primer emperador romano de Hispania, considerado uno de los mejores emperadores de Roma", "Trajano"),
	new Word(10, "K", "Empieza por K:", " Puerto fundado por el general Asdrúbal, que después los romanos llamaron Cartago Nova (Cartagena) ", "Kart-Hadast"),
	new Word(11, "L", "Empieza por L:", " Lengua que se hablaba en la Hispania romana y que dio lugar a varias lenguas como el castellano, el catalán y el gallego.", "latín"),
	new Word(12, "M", "Contiene la M:", " Proceso por el cual la población de la península ibérica fue adoptando poco a poco la cultura y la forma de vida de los romanos.", "romanización"),
	new Word(13, "N", "Empieza por N:", " Ciudad celtíbera cuya población, después de resistir un largo asedio por parte de los romanos en el año 133 a. C., prefirió quemar la ciudad y morir, en lugar de rendirse y acabar como esclavos.", "Numancia"),
	new Word(14, "O", "Contiene la O:", " Pueblos germanos que invadieron la península ibérica a principios del siglo V, cuando el Imperio Romano ya estaba en decadencia.", "visigodos"),
	new Word(15, "P", "Empieza por P:", " En la sociedad de la Hispania romana, ciudadano rico, de origen romano, con gran poder político", "patricio"),
	new Word(16, "Q", "Empieza por Q:", " Personalidad importante de la cultura hispanorromana, orador y escritor.", "Quintiliano"),
	new Word(17, "R", "Contiene la R:", " Poblados fortificados, formados por viviendas circulares, donde vivían los celtas.", "castros"),
	new Word(18, "S", "Empieza por S:", " Ciudad del este de la península ibérica cuya alianza con Roma desencadenó el inicio de la Segunda Guerra Púnica.", "Sagunto"),
	new Word(19, "T", "Contiene la T:", " Batalla en la que Rodrigo, último rey visigodo, fue derrotado por un ejército musulmán, lo que dio inicio a la dominación islámica en la península ibérica.", "Guadalete"),
	new Word(20, "U", "Contiene la U:", " Construcción hispanorromana que servía para transportar el agua.", "acueducto"),
	new Word(21, "V", "Empieza por V:", " Esculturas en piedra de toros o cerdos, principales manifestaciones artísticas de los celtas.", "verracos"),
	new Word(22, "X", "Contiene la X:", " '--- romana' Durante los siglos I y II, época de orden y prosperidad del Imperio romano.", "pax"),
	new Word(23, "Y", "Contiene la Y:", " En la Hispania romana, grupo social integrado por personas que vivían modestamente y trabajaban para los ciudadanos ricos.", "plebeyos"),
	new Word(24, "Z", "Contiene la Z:", " Nombre actual de Caesaraugusta, ciudad fundada por soldados que habían participado en las guerras cántabras.", "Zaragoza")
];

// Functions
// -----------------------------------------------------------------------------

function Word(idNumber, letter, hint, definition, word, correct) {
	this.idNumber = idNumber;
	this.letter = letter;
	this.hint = hint;
	this.definition = definition;
	this.word = word;
	this.correct = null;
}

function showDefinition(pos) {
	$("#js--hint").html(words[pos].hint);
	$("#js--definition").html(words[pos].definition);
}

var remainingWords = 25;

function checkAnswer(pos) {
	var userAnswer = $("#js--user-answer").val().toLowerCase();
	userAnswer = $.trim(userAnswer);
	//$("#js--correct").html("La palabra introducida" + userAnswer);
	if (userAnswer == words[pos].word.toLowerCase()) {
		words[pos].correct = true;
		$(".rosco .item").eq(words[pos].idNumber).addClass("item--success");

	} else {
		words[pos].correct = false;
		$(".rosco .item").eq(words[pos].idNumber).addClass("item--failure");
	}
	remainingWords--;
	$("#js--score").html(remainingWords);

	return count++;
}

function pasapalabra(pos) {
	var w = words.splice(pos, 1)[0];
	words.push(w);

}

function continuePlaying() {
	if (count != 25) {
		$('#js--user-answer').val('');
		showDefinition(count);
	} else {
		endGame();
	}
}

var seconds;
var temp;

function countdown() {
	seconds = $("#js--timer").html();
	seconds = parseInt(seconds, 10);
	if (seconds == 0) {
		temp = $("#js--timer");
		temp.innerHTML = 0;
		endGame();
		return;
	}
	seconds--;
	temp = $("#js--timer");
	temp.html(seconds);
	timeoutMyOswego = setTimeout(countdown, 1000);
}

function endGame() {
	$("#js--question-controls").addClass("hidden");
	$("#js--pa-controls").removeClass("hidden");
	$("#js--end-title").html("¡Fin de la partida!");
	$("#js--end-subtitle").html(showUserScore());
	$("#js--close").addClass("hidden")
}

function showUserScore() {
	var counter = 0;
	for (i = 0; i < words.length; i++) {
		if (words[i].correct == true) {
			counter++;
		}
	}
	if (counter==25) {
		return "¡ENHORABUENA! Has completado el rosco.";
	} else {
		return "Has conseguido un total de " + counter + " aciertos.";
	}
}


// Main Program
// ----------------------------------------------------------------------------- */

// New game
var count = 0; // Counter for answered words
$("#js--new-game").click(function() {
	$("#js--ng-controls").addClass("hidden");
	$("#js--question-controls").removeClass("hidden");
	$("#js--close").removeClass("hidden");
	showDefinition(count);
	countdown();
});

// Send the answer
$("#js--send").click(function() {
	checkAnswer(count);
	continuePlaying();
});

// Key bindings for send the answer
$("#js--question-controls").keypress(function(event) {
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if (keycode == "13") {
		checkAnswer(count);
		continuePlaying();
	}
});


$('#js--user-answer').focus (function() {
	$("#js--user-answer").text("");
});
// Skip the word
$("#js--pasapalabra").click(function() {
	pasapalabra(count);
	continuePlaying();
});
// Key bindings for skip the word
$("#js--question-controls").keypress(function(event) {
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if (keycode == "32") {
		pasapalabra(count);
		continuePlaying();
	}
});

// Play again
$("#js--pa").click(function() {
	location.reload()
});

// End the game
$("#js--close").click(function() {
	endGame();
});
