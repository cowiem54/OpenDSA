"use strict";

$(document).ready(function () {


    JSAV.init();

    var av = new JSAV("booth1");

    av.umsg("Click the right arrow to progress slideshow!");
    // Note: av.displayInit() will not affect the number of slides.
    // All that it will do is affect what you get to see on the
    // initial slide.
    av.displayInit();
    av.umsg("A multiplication problem has...");
    av.step();
    //av.umsg(" A Multiplicand ($\ 2_{10} * $", {preserve: true});
    av.umsg(" a Multiplicand: the number we are going to multiply.");
    // We are now starting a new slide (#2)
    av.step();
    //av.umsg("$\ -4_{10}$) and multiplier.", {preserve: true});
    av.umsg(" a Multiplier: the number we are going to multiply by.");
    av.step();
    av.umsg("Example: (multiplicand) $\ 2_{10} * -4_{10}$ (multiplier)");
    // We are now starting a new slide (#3)
    av.step();
    av.umsg("Also, we need to keep track of 5 values:");
    av.step();
    av.umsg("the Multiplicand: $\ 2_{10} = 00000010_2$ (using 8 bits)");
    av.step();
    av.umsg("the Product Register: $\ 00000000_2$ $\ 11111100_2$");
    av.step();
    av.umsg("The upper half of the Product Register will be used to store our calculation and is initalized with the value zero ($\ 00000000_2$).");
    av.step();
    av.umsg("The lower half of the Product Register will be used to store our resulting value and is initalized with the value of the multiplier. ($\ 11111100_2 = -4_{10}$).");
    av.step();
    av.umsg("We also need to keep track of the least most significant bit of the Product Register.");
    av.step();
    av.umsg("These bits must be kept track for both the current and previous steps in the algorithm.");
    av.step();
    av.umsg("The Current and Previous LSBs tell which Operation to do:");
    av.step();
    av.umsg(" $00$ or $11$ mean we do nothing to the Product Register. ", {preserve: true});
    av.step();
    av.umsg(" $10$ means we Add the Multiplicand to upper half of the Product Register. ", {preserve: true});
    av.step();
    av.umsg(" $01$ means we Subract the Multiplicand to upper half of the Product Register. ", {preserve: true});
    av.step();
    av.umsg("Below is a short quiz to make sure we've got our Operations down.");
    av.recorded();
    // If you add av.umsg after av.recorded, it will add new slides in
    // ways that you probably do not expect and probably cannot
    // control in the way that you want. As av.recorded() rewinds the
    // slideshow, the new slides would go to the beginning of the slideshow.
    // So, unless you are trying to add slides on-the-fly
    // interactively, you don't want to do this.
    // av.umsg("Text after av.recorded()");

});
