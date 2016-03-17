/*global window */
(function() {
    "use strict";
    var bitCodes;
	var answerIndex;
    
    var booth_ex3 = {
	
	option: [0,0,0],

	// Initialise the exercise
	initArr: function() {
	    
	    bitCodes = ["00","10","01","11"];

		answerIndex = Math.floor(Math.random() * 4);

		var displayBits = "MSB: Taken from the LSB of the Product Regester from our Current Operation " +bitCodes[answerIndex]+" LSB: Taken from the LSB of the Product Regester from our Previous Operation";

	    return displayBits;
	},
	
	maxValue: function() {

		if(answerIndex == 0 || answerIndex == 3) {
			booth_ex3.option[0] = "Subtract Multiplicand";
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


	},

    };

    window.booth_ex3 = window.booth_ex3 || booth_ex3;
}());
