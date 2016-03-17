"use strict";
/*global alert: true, ODSA */

(function ($) {
  var av;
 

function runit() {
    ODSA.AV.reset(true);

	//get values enter by user
	var tempInput = document.getElementById("arrayValues");

	//make sure values are fomatted as a string
	var tempString = tempInput.value;

	//make and array of the two values the user enters as a string
	var twoBase10 = tempString.split(" ");

	//These are used to parse input into useful numbers for convertions
	var multpldBas2, multpldBas2Neg, multplrBas2, multpldBas10,multpldBas10Neg, multplrBas10;

	//these are used to build the matrix using the values from each convertion
	var multpldArray, multplrArray, initArray, initArray2;

	//used to keep track of the current operation in the algorithm
	var op;

	//used to perform addition on the upper product register
	var digit1, digit2, digit2Bas2, digit2Bas10;
	

	//need regex to match signed integers now only have less than 11 and counting on parseInt to generate errors
	if(parseInt(twoBase10[0]) < 12 && parseInt(twoBase10[0]) > -12) {
		
		//takes the base 10 multiplicand entered by user and converts it into 8-bit bin
		multpldBas10 = parseInt(twoBase10[0]);
		multpldBas2 = (multpldBas10 >>> 0).toString(2);
		multpldBas2 ="00000000000000000000000000000000".substr(multpldBas2.length)+multpldBas2;
		multpldBas2 = multpldBas2.slice(24);
		
		//takes the negation of the base 10 multiplicand entered by user and converts it into 8-bit bin
		multpldBas10Neg = 0 - parseInt(twoBase10[0]);
		multpldBas2Neg = (multpldBas10Neg >>> 0).toString(2);
		multpldBas2Neg ="00000000000000000000000000000000".substr(multpldBas2Neg.length)+multpldBas2Neg;
		multpldBas2Neg = multpldBas2Neg.slice(24);
		
	}
	else{
		alert("You have not entered a valid multiplicad. You must enter two signed integers between -11 and 11 seperated by a space!");
	}
	//need regex to match signed integers now only have less than 11 and counting on parseInt to generate errors
	if(parseInt(twoBase10[1]) < 12 && parseInt(twoBase10[1]) > -12) {

		//takes the base 10 multiplier entered by user and converts it into 8-bit bin
		multplrBas10 = parseInt(twoBase10[1]);
		multplrBas2 = (multplrBas10 >>> 0).toString(2);
		multplrBas2 ="00000000000000000000000000000000".substr(multplrBas2.length)+multplrBas2;
		multplrBas2 = multplrBas2.slice(24);
		multplrArray = multplrBas2.split("");
		
		//used to propigate the upper half of the product register
		initArray = ("00000000 "+multplrBas2).split("");
		
	}
	else{
		alert("You have not entered a valid multiplier. You must enter two signed integers between -11 and 11 seperated by a space!");
	}	
	//create new slideshow
    av = new JSAV($('.avcontainer'));

	//used to propigate the bottum row of the product register
	initArray2 = [0,0,0,0,0,0,0,0, ,0,0,0,0,0,0,0,0];

	//set the first operation code with current lsb and zero
	op = multplrArray[7].toString()+"0";

	//
    var arr = av.ds.matrix([initArray, initArray2], {style: "matrix"});
      
	av.umsg("Multiplicand: "+multpldBas10+" base10 = "+multpldBas2+" base2. "+"Multiplier: "+multplrBas10+" base10 = "+multplrBas2+" base2. ");  
	av.displayInit();
	
	av.umsg("Since we are working with 8-bit numbers we must perform 8 operations before the algorithm is finished. Below is shown the Product Register. The top row represents our current work space and the results will be stored in the row beneith.");
 av.step(); 
	av.umsg("The upper half is populated with the value zero, ",{preserve: true});
	var j;
for(j=0;j<8;j++){
	arr.highlight(0,j);
	}

 av.step();  
	av.umsg("while the lower half is populated with the value of the Multiplier. ",{preserve: true}); 
for(j=9;j<17;j++){
	arr.highlight(0,j);
	}
 av.step();

for(j=0;j<8;j++){
	arr.unhighlight(0,j);
	}
for(j=9;j<17;j++){
	arr.unhighlight(0,j);
	}
 

	av.umsg("We've selected our current operation by using our current LSB in the Product Regester ("+multplrArray[7].toString()+") as the MSB of the Operation code and a previous bit of zero (since there is no previous operation) as the LSB of Operation code. Thus our Operation code is: "+op);
	var t;

for(t=0;t<8;t++){

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
	av.umsg("Next we copy our previous step down then,",{preserve: true});
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

	//av.umsg("The MSB of the upper product reg is Still "+prevUpReg[0]+". ");
	digit1 = parseInt(prevUpReg,2);
        //digit1 = intToUint(digit1, 8);

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

	av.umsg("Next we copy our previous step down then,");
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
//get this bro
	digit1 = parseInt(prevUpReg,2);
        //digit1 = intToUint(digit1, 8);

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


	av.umsg("Next we copy our previous step down then,");
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

av.umsg("Our new op for this next step is "+op);

arr.highlight(0,16);
arr.highlight(1,16);

  av.step();
	av.umsg("Now we'll move down to the next line.");
arr.unhighlight(0,16);
arr.unhighlight(1,16)
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
  
function intToUint(it, nbit) {
    var u = new Uint32Array(1);
    nbit = +nbit || 32;
    if (nbit > 32) throw new RangeError('intToUint only supports ints up to 32 bits');
    u[0] = it;
    if (nbit < 32) { // don't accidentally sign again
        it = Math.pow(2, nbit) - 1;
        return u[0] & it;
    } else {
        return u[0];
    }
}


// Connect action callbacks to the HTML entities
$('#about').click(about);
$('#runit').click(runit);
$('#help').click(help);
$('#reset').click(ODSA.AV.reset);
}(jQuery));
