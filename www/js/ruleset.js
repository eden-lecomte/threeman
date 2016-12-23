var globalRules = {
    vessel: 10,
    offTable: 0,
    dice: 2,
}

var threeManExists = false;
var selectedDoors = [];
var virgin = true;
var diceRolled = false;

var initGame = {
    init: function() {

        $('.selected').text('');        
        $('.selected').removeClass('selected');
        virgin = true;
        selectedDoors = [];
        diceRolled = false; 

        $('.door:not(.selected)').on('click', function(e) {

            if( $('.selected').length >= globalRules.dice-1 ) {
                $('.door').unbind();    
            }               
            

            if( $('.selected').length < globalRules.dice ) {
                $(this).addClass('selected');
                selectedDoors.push( $(this) );
            }        

            if (diceRolled == false){
                rollDice();
                diceRolled = true;   
            };
            
            if (selectedDoors[0]) {
                (selectedDoors[0]).text(diceRoll[0]);
            }
             
            if (selectedDoors[1]) {
                (selectedDoors[1]).text(diceRoll[1]);
                gameFunctions[diceRoll[0]]();

            }

        });
    }
}



var gameFunctions = {
    1: function() {
        if (diceRoll[1] == 1) {
            //double 1s - duel!
            gameFunctions.duel();
        } else if (diceRoll[1] == 2) {
            //3 man
            gameFunctions.threeman();
        } else if (diceRoll[1] == 3) {
            //4 nothing
            gameFunctions.checkVirgin();
        } else if (diceRoll[1] == 4) {
            //5 nothing
            gameFunctions.checkVirgin();
        } else if (diceRoll[1] == 5) {
            //6 nothing
            gameFunctions.checkVirgin();
        } else if (diceRoll[1] == 6) {
            //7 to the left
            gameFunctions.toLeft();
        }
    },
    2: function() {
        if (diceRoll[1] == 1) {
            //3 man!
            gameFunctions.threeman();
        } else if (diceRoll[1] == 2) {
            //2 for 2!
            $('#instructions').text('Pick 2 people to drink 2 each');
            virgin = false;
            gameFunctions.checkVirgin();

        } else if (diceRoll[1] == 3) {
            //5 - nothing
            gameFunctions.checkVirgin();
        } else if (diceRoll[1] == 4) {
            //6 nothing
            gameFunctions.checkVirgin();
        } else if (diceRoll[1] == 5) {
            //7 to the left
            gameFunctions.toLeft();
        } else if (diceRoll[1] == 6) {
            //8 nothing
            gameFunctions.checkVirgin();
        }
    },
    3: function() {
        if (diceRoll[1] == 1) {
            //4 nothing
            
            gameFunctions.check3man();
        } else if (diceRoll[1] == 2) {
            //5 nothing
            gameFunctions.check3man();
        } else if (diceRoll[1] == 3) {
            if (threeManExists == true) {
                $('#instructions').text('Threeman drink 3x!');
                gameFunctions.checkVirgin();
                
            } else {
                $('#instructions').text('There is no threeman yet...');
                gameFunctions.resetDice();
            }
        } else if (diceRoll[1] == 4) {
            gameFunctions.toLeft();
            gameFunctions.check3man();
        } else if (diceRoll[1] == 5) {
            gameFunctions.check3man();
        } else if (diceRoll[1] == 6) {
            gameFunctions.check3man();
        }
    },
    4: function() {
        if (diceRoll[1] == 1) {
            gameFunctions.checkVirgin();
        } else if (diceRoll[1] == 2) {
            gameFunctions.checkVirgin();
        } else if (diceRoll[1] == 3) {
            gameFunctions.toLeft();
            gameFunctions.check3man();
        } else if (diceRoll[1] == 4) {
            gameFunctions.checkVirgin();            
        } else if (diceRoll[1] == 5) {
            gameFunctions.checkVirgin();
        } else if (diceRoll[1] == 6) {
            gameFunctions.social();
        }
    },
    5: function() {
        if (diceRoll[1] == 1) {
            gameFunctions.checkVirgin();
        } else if (diceRoll[1] == 2) {
            gameFunctions.toLeft();
        } else if (diceRoll[1] == 3) {
            gameFunctions.checkVirgin();
        } else if (diceRoll[1] == 4) {
            gameFunctions.checkVirgin();
        } else if (diceRoll[1] == 5) {
            gameFunctions.social();
        } else if (diceRoll[1] == 6) {
            gameFunctions.toRight();
        }
    },
    6: function() {
        if (diceRoll[1] == 1) {
            gameFunctions.toLeft();
        } else if (diceRoll[1] == 2) {
            gameFunctions.checkVirgin();
        } else if (diceRoll[1] == 3) {
            gameFunctions.check3man();
        } else if (diceRoll[1] == 4) {
            gameFunctions.social();
        } else if (diceRoll[1] == 5) {
            gameFunctions.toRight();
        } else if (diceRoll[1] == 6) {
            $('#instructions').text('Everyone except Threeman, drink 2!');
            gameFunctions.checkVirgin();
        }
    },                    
    checkTotals: function() {


    },
    check3man: function() {
        if (threeManExists == true) {
            $('#instructions').text('Threeman drinks!');
            gameFunctions.checkVirgin();
        } else {
            //nothing?
            gameFunctions.checkVirgin();
        }
    },
    threeman: function() {
        virgin = false;
        threeManExists = true;
        $('#instructions').text('You are the new Threeman! Put on the sweet hat, and drink to say hello!');

        setTimeout( function() {
            gameFunctions.resetDice();
        }, 5000);
    },
    social: function() {
        virgin = false;
        $('#instructions').text('Everyone drink!');
        setTimeout( function() {
            gameFunctions.resetDice();
        }, 3000);
    },
    duel: function() {
        virgin = false;
        $('#instructions').text('Pick 2 people duel');
        setTimeout( function() {
            gameFunctions.resetDice();
        }, 3000);

    },
    toLeft: function() {
        virgin = false;
        $('#instructions').text('Drink to the left!');
        setTimeout( function() {
            gameFunctions.resetDice();
        }, 3000);
    },
    toRight: function() {
        virgin = false;
        $('#instructions').text('Drink to the right!');
        setTimeout( function() {
            gameFunctions.resetDice();
        }, 3000);
    },
    checkVirgin: function() {
        if (virgin == true) {
            $('#instructions').text('You rolled... nothing! Go again')
            virgin = false; 
            setTimeout(function() {
                gameFunctions.resetDice();
            },3000);
        } else {
            $('#instructions').text('Nothing... Next players turn!')
            setTimeout( function() {
                gameFunctions.resetDice();
            }, 3000);
        }
    },
    resetDice: function() {

        initGame.init();
    }
}

