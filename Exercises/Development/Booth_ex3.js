/*global window */
(function() {
    "use strict";
    var bitCodes;
	var answerIndex;
    
    var booth_ex3 = {
	
	option: [0,0,0],

	// Initialise the exercise
	initArr: function(arr_size) {
	    
	    bitCodes = ["00","01","10","11"];

		answerIndex = Math.floor(Math.random() * 4);

		var displayBits = "Test: " + bitCodes[answerIndex];

	    return displayBits;
	},
	
	getAnswer: function() {

		if(answerIndex == 0 || answerIndex == 3) {
			booth_ex3.option[0] = "Do Nothing";
			booth_ex3.option[1] = "Add Multiplicand";
			booth_ex3.option[2] = "Subtract Multiplicand";
			//answer = "Do Nothing";
		}
		else if(answerIndex == 1) {
			booth_ex3.option[0] = "Do Nothing";
			booth_ex3.option[1] = "Do Nothing";
			booth_ex3.option[2] = "Subtract Multiplicand";
			//answer = "Add Multiplicand";
		}
		else {
			booth_ex3.option[0] = "Do Nothing";
			booth_ex3.option[1] = "Add Multiplicand";
			booth_ex3.option[2] = "Do Nothing";
			//answer = "Subtract Multiplicand";
		}


	    return answerIndex;
	},

    };

    window.booth_ex3 = window.booth_ex3 || booth_ex3;
}());
