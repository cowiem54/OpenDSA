/*global window */
(function() {
    "use strict";
    var my_array;
	var answer;
    
    var booth_ex3 = {
	
	option: [0,0,0],

	// Initialise the exercise
	initArr: function(arr_size) {
	    var i;
	    var next_val;
	    var array_str;
	    my_array = ["00","01","10","11"];
		answer = Math.floor(Math.random() * 4);
		console.log(" " + next_val);
	    array_str = "";

		array_str = array_str + " " + my_array[answer];

	    console.log(array_str);
	    return array_str;
	},
	
	maxValue: function() {

	    booth_ex3.option[0] = my_array[1];
	    booth_ex3.option[1] = my_array[2];
	    booth_ex3.option[2] = my_array[3];
		
	    return answer;
	},

    };

    window.booth_ex3 = window.booth_ex3 || booth_ex3;
}());
