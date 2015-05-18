console.log("connected to simon-says.js");

//creating function object
var SimonSays = function SimonSays() {
	this.sequence=[]; // simon sequence
	this.userSequence=[]; // user sequence of when they click
	this.round= 0; // game starts as round 0
	this.playing = false; // if playing is true it keeps playing, if false stops.
};

// creating new object Simon
var Simon = new SimonSays();

// adds a new color and pushes it to simon.sequence
SimonSays.prototype.addColor = function(){
	//generates a number between 1-4
	// red = 1; blue = 2; green = 3; yellow = 4;
	var randomNumber = Math.floor((Math.random()*4)+1);
	this.sequence.push(randomNumber);
}

// adding audio items that will be called in lightup function
var audio1 = new Audio('scripts/1.mp3');
var audio2 = new Audio('scripts/2.wav');
var audio3 = new Audio('scripts/3.wav');
var audio4 = new Audio('scripts/4.wav');


var lightUp = function(pie){
	// red = 1; blue = 2; green = 3; yellow = 4;
	if (pie === 1 ){
		$('[data-pie=1]').removeClass('red').addClass("redLight");
		audio1.play();
		window.setTimeout(function() {
			$('[data-pie=1]').removeClass("redLight").addClass('red');
		}, 500);

	}	else if (pie === 2 ){
		$('[data-pie=2]').removeClass('blue').addClass("blueLight");
		audio2.play();
		window.setTimeout(function() {
			$('[data-pie=2]').removeClass("blueLight").addClass('blue');
		}, 500);

} else if (pie === 3 ){
		$('[data-pie=3]').removeClass('green').addClass("greenLight");
		audio3.play();
		window.setTimeout(function() {
			$('[data-pie=3]').removeClass("greenLight").addClass('green');
		}, 500);

}	else if (pie === 4 ){
		$('[data-pie=4]').removeClass('yellow').addClass("yellowLight");
		audio4.play();
		window.setTimeout(function() {
			$('[data-pie=4]').removeClass("yellowLight").addClass('yellow');
		}, 500);
	}	
}

// runs sequence of colors, calls back lightup function
SimonSays.prototype.runSequence = function(sequence) {
	var i = 0;
	var interval = setInterval(function() {
	lightUp(Simon.sequence[i]);

	i++;
	if (i >= Simon.sequence.length) {
		clearInterval(interval);
	}
	}, 600);
}

$('.loser').hide();
var $nameScore = $('#name').val();


var endGame = function() {
	$('.loser').show("slow");
	$('.loserRound').html(Simon.round);
	$('.close').click(function(){
		$('.loser').hide();
	})
	$('#name').click(function(){
		$nameScore()
	})
	
	$('.submit').click(function() {
		$('.score').add(li);
		$('.score').append($('#name').val())
	})
	// window.setTimeout(function(){
	// 	$('.loser').hide("slow");
	// }, 10000);

}

// setting timer for each round. Stops if user loses.
var counter = 31;
var countDown = function () {
	if (Simon.playing === false) {
		window.clearInterval(countDown);
		$('.timer').html('30');

	} else if (counter === 0) {
		window.clearInterval(countDown);
		endGame();
		Simon.userSequence = [];
		Simon.sequence = [];
		Simon.playing = false;

	}  else {
		counter = counter -1;
		$('.timer').html(counter);
	}
}

// Play round adds color to sequence and lights up the sequence
// runs timer each time we play new round
SimonSays.prototype.playRound = function(){
		// this.playing = true;
		this.addColor();
		window.clearInterval(countDown);
		counter = 31;
		this.runSequence();
		console.log(this.sequence);	
}

// Checks if user click was correct.
// if user sequence [index] = simon sequence[index] then used can click again 
// if all clicks are correct and we reach at end of arrays then new round is played
// anything else will give you "you lose" screen
SimonSays.prototype.check = function() {
	if (this.playing === true) {
		for (var i = 0; i < this.userSequence.length ; i++) {
		 if (this.userSequence[i] === this.sequence[i] && this.userSequence.length === this.sequence.length ) {
				console.log(this.userSequence);	
				this.round += 1
				$('.round').text(this.round);
				this.userSequence = [];
				this.playRound();

			} else if (this.userSequence[i] === this.sequence[i]) {
				// console.log("click again");	

			} else {
				endGame(); 
				this.userSequence = [];
				this.sequence = [];
				Simon.playing = false;
				Simon.round = 0;
				$('.round').text(this.round);
				window.clearInterval(countDown);
				$('.timer').html('30');

			} 
		}
	}
}


// click events for each pie color
// included callback to check function to check if clicked button is correct or not
$('.red').click(function(){
	lightUp(1);
	Simon.userSequence.push(1);
	Simon.check();
})

$('.blue').click(function(){
	lightUp(2);
	Simon.userSequence.push(2);
	Simon.check();
})

$('.green').click(function(){
	lightUp(3);
	Simon.userSequence.push(3);
	Simon.check();
})

$('.yellow').click(function(){
	lightUp(4);
	Simon.userSequence.push(4);
	Simon.check();
})


// click on start and game will start.  
$('.button').click(function() {
	Simon.userSequence = [];
	Simon.sequence = [];
	Simon.round = 0;
	Simon.playing = true;
	Simon.playRound();	
	window.setInterval(countDown, 1000);
});


