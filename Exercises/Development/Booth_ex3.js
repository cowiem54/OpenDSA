/*global window */
(function() {
    "use strict";
    var bitCodes;
	var answerIndex;
    
    var booth_ex3 = {
	
	option: [0,0,0],

	// Initialise the exercise
	initArr: function() {
	    
	    bitCodes = ["00","01","10","11"];

		answerIndex = Math.floor(Math.random() * 4);

		var displayBits = "Test: " + bitCodes[answerIndex];

	    return displayBits;
	},
	
<<<<<<< HEAD
	maxValue: function() {
		if(answer==0||answer==3){
			booth_ex3.option[0] = "Subtract Multiplicand";
=======
	getAnswer: function() {

		if(answerIndex == 0 || answerIndex == 3) {
			booth_ex3.option[0] = "Do Nothing";
>>>>>>> e06de7c44df6a10a4d60dfe75b0b7239209b8cb0
			booth_ex3.option[1] = "Add Multiplicand";
			return "Do Nothing";
		}
		else if(answerIndex == 1) {
			booth_ex3.option[0] = "Do Nothing";
			booth_ex3.option[1] = "Subtract Multiplicand";
			return "Add Multiplicand";
		}
		else {
			booth_ex3.option[0] = "Do Nothing";
			booth_ex3.option[1] = "Add Multiplicand";
			return "Subtract Multiplicand";
		}

<<<<<<< HEAD
	    
=======

	    return answerIndex;
>>>>>>> e06de7c44df6a10a4d60dfe75b0b7239209b8cb0
	},

    };

    window.booth_ex3 = window.booth_ex3 || booth_ex3;
}());
