var smoothState;


//Dice functions
var diceRoll = [];
var diceCombined;


 
var diceFunctions = {
    rollDice: function() {
        //Clear dice from last roll
        diceRoll = [];

        //Check how many dice are required, and roll for each
        for (i = 0; i < globalRules.dice; i++) {
            diceRoll.push(
                Math.floor(Math.random() * 6) + 1
            );
        };        
        diceFunctions.checkEach();
        diceFunctions.checkTotals();
    },
    checkEach: function() {

        //gameFunctions[diceRoll[0]]();
    },
    checkTotals: function() {
        //Clear total dice value
        diceCombined = 0;

        //Get each dice value and add it to the total
        for (i = 0; i < diceRoll.length; i++) {
            diceCombined = diceCombined + diceRoll[i];
        };
    },    
  
};



//Shorten roll dice function
function rollDice () {
    diceFunctions.rollDice();
} 


