"use strict";
/*global alert: true, ODSA */

(function ($) {
  var av;
 

function runit() {
    ODSA.AV.reset(true);

    // Validate the array values a user enters or generate an array of
    // random numbers < 100 of the size selected in the dropdown list
    // if none are provided
    //var theArray = document.getElementById("arrayValues");
	var tempInput = document.getElementById("arrayValues");
	var tempString = tempInput.value;
	var twoBase10 = tempString.split(" ");
	var multpldBas2, multpldBas2Neg, multplrBas2, multpldBas10,multpldBas10Neg, multplrBas10;
	var multpldArray, multplrArray, initArray, initArray2;
	var op;

	var digit1, digit2, digit2Bas2, digit2Bas10;
	

	//need regex to match signed integers now only have less than 11 and counting on parseInt to generate errors
	if(parseInt(twoBase10[0]) < 12 && parseInt(twoBase10[0]) > -12) {

		multpldBas10 = parseInt(twoBase10[0]);
		multpldBas2 = (multpldBas10 >>> 0).toString(2);
		multpldBas2 ="00000000000000000000000000000000".substr(multpldBas2.length)+multpldBas2;
		multpldBas2 = multpldBas2.slice(24);

		multpldBas10Neg = 0 - parseInt(twoBase10[0]);
		multpldBas2Neg = (multpldBas10Neg >>> 0).toString(2);
		multpldBas2Neg ="00000000000000000000000000000000".substr(multpldBas2Neg.length)+multpldBas2Neg;
		multpldBas2Neg = multpldBas2Neg.slice(24);


		multpldArray = multpldBas2.split("");
		
	}
	else{
		alert("You have not entered a valid multiplicad. You must enter two signed integers between -11 and 11 seperated by a space!");
	}
	if(parseInt(twoBase10[1]) < 12 && parseInt(twoBase10[1]) > -12) {
		multplrBas10 = parseInt(twoBase10[1]);
		multplrBas2 = (multplrBas10 >>> 0).toString(2);
		multplrBas2 ="00000000000000000000000000000000".substr(multplrBas2.length)+multplrBas2;
		multplrBas2 = multplrBas2.slice(24);
		multplrArray = multplrBas2.split("");
		initArray = ("00000000 "+multplrBas2).split("");
		
	}
	else{
		alert("You have not entered a valid multiplier. You must enter two signed integers between -11 and 11 seperated by a space!");
	}	

    av = new JSAV($('.avcontainer'));
	initArray2 = [0,0,0,0,0,0,0,0, ,0,0,0,0,0,0,0,0];
	op = multplrArray[7].toString()+"0";
    var arr = av.ds.matrix([initArray, initArray2], {style: "matrix"});
      
	av.umsg("Multiplicand: "+multpldBas10+" base10 = "+multpldBas2+" base2. "+"Multiplier: "+multplrBas10+" base10 = "+multplrBas2+" base2. ");  
	av.displayInit();
	
	av.umsg("Multiplicand: "+multpldBas2+". Operation: "+op+". Below is shown the Product Register. The upper half is populated with the value zero, while the lower half is populated with the value of the Multiplier. We've selected our current operation by using our current LSB in the Product Regester ("+multplrArray[7].toString()+") as the MSB of the operation and a previous bit of zero (since there is no previous operation) as the LSB.");
	var j;

	for(j=0;j<8;j++){

    //arr.swap(3,7);
    av.step();
	//NO OPERATION
	if(op == "00" || op == "11"){
	av.umsg("Since our current operation is \"Do Nothing\"...");
	av.step();
	var i;
		for(i = 0; i < 17; i++){
			arr.value(1,i,arr.value(0,i));
		}
	av.umsg("we copy our previous step down then,",{preserve: true});
	av.step();
	av.umsg(" peform arithmetic right shift (maintaining the sign) on the Product Register.",{preserve: true});

		
		for(i = 16; i > 1; i--){
			arr.swap(1,i,1,i-1);	
		}
			arr.swap(1,8,1,9);
			arr.swap(1,0,1,1)
	
	}

	//SUBTRACT tttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt
	else if(op == "10"){
	av.umsg("Since our current operation is \"Subtract Multiplicand from the upper Product register\"...");
	av.step();

	var prevUpReg = "";
	for(i=0;i<8;i++){
	prevUpReg = prevUpReg+ arr.value(0,i);
	}
	digit1 = parseInt(prevUpReg,2);
	digit2 = digit1 + multpldBas10Neg;


		digit2Bas10 = digit2;
		digit2Bas2 = (digit2Bas10 >>> 0).toString(2);
		digit2Bas2 ="00000000000000000000000000000000".substr(digit2Bas2.length)+digit2Bas2;
		digit2Bas2 = digit2Bas2.slice(24);

	for(i=0;i<8;i++){
	arr.value(0,i,digit2Bas2[i])
	}
	av.umsg("We subract ("+multpldBas10+") from the upper Product Register. To subtract it is easier to add the inverse: "+multpldBas2Neg+" + "+prevUpReg+" = "+digit2Bas2+".",{preserve: true});
	av.step();
	var i;
		for(i = 0; i < 17; i++){
			arr.value(1,i,arr.value(0,i));
		}

	av.umsg("Finally we copy our previous step down then,");
	av.step();
	av.umsg(" peform arithmetic right shift (maintaining the sign) on the Product Register.",{preserve: true});

		
		for(i = 16; i > 1; i--){
			arr.swap(1,i,1,i-1);	
		}
			arr.swap(1,8,1,9);
			arr.swap(1,0,1,1);

	}

//ADDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD
	else if(op == "01"){
	av.umsg("Since our current operation is \"Add Multiplicand from the upper Product register\"...");
	av.step();

	var prevUpReg = "";
	for(i=0;i<8;i++){
	prevUpReg = prevUpReg+ arr.value(0,i);
	}
	digit1 = parseInt(prevUpReg,2);
	digit2 = digit1 + multpldBas10;


		digit2Bas10 = digit2;
		digit2Bas2 = (digit2Bas10 >>> 0).toString(2);
		digit2Bas2 ="00000000000000000000000000000000".substr(digit2Bas2.length)+digit2Bas2;
		digit2Bas2 = digit2Bas2.slice(24);

	for(i=0;i<8;i++){
	arr.value(0,i,digit2Bas2[i])
	}
	av.umsg("We add ("+multpldBas10+") from the upper Product Register: "+multpldBas2+" + "+prevUpReg+" = "+digit2Bas2+".",{preserve: true});
	av.step();
	var i;
		for(i = 0; i < 17; i++){
			arr.value(1,i,arr.value(0,i));
		}


	av.umsg("Finally we copy our previous step down then,");
	av.step();
	av.umsg(" peform arithmetic right shift (maintaining the sign) on the Product Register.",{preserve: true});

		
		for(i = 16; i > 1; i--){
			arr.swap(1,i,1,i-1);	
		}
			arr.swap(1,8,1,9);
			arr.swap(1,0,1,1);

	}
	else{av.umsg("Something has gone wrong.");}

	op = arr.value(1,16).toString()+arr.value(0,16).toString();


  av.step();
	av.umsg("Our new op for this next step is "+op+"So we'll move to the next line.");
		var i;
		for(i = 0; i < 17; i++){
			arr.value(0,i,arr.value(1,i));
			arr.value(1,i,0);
		}
		arr.value(1,8," ");

}

    // We are now starting a new slide (#3)



	var answer ="";

	answer = multpldBas10 * multplrBas10;
    av.umsg("The anwser is now display in the lower half of the Product Regester. It is "+answer+" base10 !");
    av.recorded();
    // If you add av.umsg after av.recorded, it will add new slides in
    // ways that you probably do not expect and probably cannot
    // control in the way that you want. As av.recorded() rewinds the
    // slideshow, the new slides would go to the beginning of the slideshow.
    // So, unless you are trying to add slides on-the-fly
    // interactively, you don't want to do this.
    // av.umsg("Text after av.recorded()");

}



function about() {
   alert("Simple array visualization");
}
  
function help() {
   alert("Help for simple array visualization");
}
  
// Initialize the arraysize dropdown list
//ODSA.AV.initArraySize(10, 16, 12); // Between 10 and 16, with default at 12


// Connect action callbacks to the HTML entities
$('#about').click(about);
$('#runit').click(runit);
$('#help').click(help);
$('#reset').click(ODSA.AV.reset);
}(jQuery));
