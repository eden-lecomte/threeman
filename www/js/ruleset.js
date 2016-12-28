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

        virgin = true;
        diceRolled = false; 

        $('.diceRoller').on('click', function(e) {
            if ($(this).hasClass('passPhone') == false) {
                
                if (diceRolled == false){
                    diceRolled = true; //stop double clicking                 
                    rollDice();
                    diceRolled = true; 
                    gameFunctions[diceRoll[0]]();       

                    //update the dice image
                    $('.dice1').attr('name', diceRoll[0]);
                    $('.dice2').attr('name', diceRoll[1]);

                    $('body').addClass('teal');
                    $('#diceResult').text(diceCombined);
                    $('.results').fadeIn('fast');
                };
                diceRolled = false; //stop double clicking                 
            }
        });

        //duel init
        $('#duel .diceRollerDuel').on('click', function(e) {
            var id = $(this).parent().parent().attr('id');
            $(this).parent().hide();
            
            //check if both dice have been rolled
            var playerButtons = $('.diceRollerDuel');

            //reset DiceRoll
            diceRoll = [0, 0]; 

            //check which player is rolling
            if (id == 'orange') {
                diceRoll[0] = Math.floor(Math.random() * 6) + 1;
                $('.dice1').attr('name', diceRoll[0]); 
                $(this).addClass('rolled');
            };
            if (id == 'pink') {
                diceRoll[1] = Math.floor(Math.random() * 6) + 1;
                $('.dice2').attr('name', diceRoll[1]);         
                $(this).addClass('rolled');
            };            

            setTimeout( function() {
                if ( $(playerButtons[0]).hasClass('rolled') && $(playerButtons[1]).hasClass('rolled') == true) {
                    gameFunctions[diceRoll[0]]();       
                }
            }, 50)
            //run standard functions for overall total

        });

        //navigation
        $('.goBack').on('click', function(e) {
           $('body').removeClass('teal'); 
        });

    }
}



var gameFunctions = {
    1: function() {
        if (diceRoll[1] == 1) {
            //double 1s - duel!
            gameFunctions.twoforMe();
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
            gameFunctions.twoForTwo();
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
                $('.instructions').text('Threeman drink 3x!');
                $('#rollInstructions').text('Roll again');
                gameFunctions.checkVirgin();
                
            } else {
                gameFunctions.duel();
            }
        } else if (diceRoll[1] == 4) {
            gameFunctions.toLeft();
            if (threeManExists == true) {
                $('.instructions').append('<br> and Threeman drinks!');
                $('#rollInstructions').text('Roll again');            
            }
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
            if (threeManExists == true) {
                $('.instructions').append('<br> and Threeman drinks!');
                $('#rollInstructions').text('Roll again');            
            }
        } else if (diceRoll[1] == 4) {
            gameFunctions.duel();
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
            gameFunctions.doubleSix();
        }
    },                    
    checkTotals: function() {


    },
    doubleSix: function() {
        if (threeManExists == true) {
            $('.instructions').text('Everyone except Threeman, drink 2!');  
            $('#rollInstructions').text('Roll again');                              
        } else {
            gameFunctions.checkVirgin();
        }
    },
    check3man: function() {
        console.log('Check for a 3 man function run');
        if (threeManExists == true) {
            $('.instructions').text('Threeman drinks!');
            $('#rollInstructions').text('Roll again');            
        } else {
            //nothing?
            gameFunctions.checkVirgin();
        }
    },
    threeman: function() {
        console.log('Three man function run');
        virgin = false;
        threeManExists = true;
        $('.instructions').text('You are the new Threeman! Put on the sweet hat, and drink to say hello!');
        $('#rollInstructions').text('Roll again');        
    },
    social: function() {
        console.log('Social function run');
        virgin = false;
        $('.instructions').text('Everyone drink!');
        $('#rollInstructions').text('Roll again');
    },
    duel: function() {
        console.log('Duel function run');        
        virgin = false;
        $('.instructions').html('Pick 2 to people duel<br>Loser drinks the difference');
        $('#rollInstructions').text('Roll again');        
    },
    toLeft: function() {
        console.log('To the left function run');
        virgin = false;
        $('#rollInstructions').text('Roll again');        
        $('.instructions').text('Drink to the left!');
    },
    toRight: function() {
        console.log('To the right function run');
        virgin = false;
        $('.instructions').text('Drink to the right!');
        $('#rollInstructions').text('Roll again');
    },
    twoForTwo: function() {
        console.log('Two for two');
        virgin = false;
        $('.instructions').text('Pick 2 people to drink 2 drinks');
        $('#rollInstructions').text('Roll again');
    },
    twoforMe: function() {
        console.log('Two for Me');
        virgin = false;
        $('.instructions').text('Two drinks for you!');
        $('#rollInstructions').text('Roll again');
        
    },    
    checkVirgin: function() {
        console.log('Virgin check run');
        if (virgin == true) {
            $('.instructions').text('Virgin roll, drink and go again!')
            virgin = false; 
            $('#rollInstructions').text('Roll again');
        } else {
            $('.instructions').html('Nothing... <br>Next players turn!')
            console.log('----------');
            console.log('NEW PLAYER');
            console.log('----------');            
            $('#rollInstructions').text('<- Pass phone left');
            
            $('#rollInstructions').addClass('passPhone');
            $('.passPhone').on('click.remove', function(e) {
                // reset style back to start
                $('body').removeClass('teal');
                $('.results').fadeOut('fast');
                $('.passPhone').unbind('click.remove');
                $('.passPhone').removeClass('passPhone');            
            });
            
            virgin = true;                    
        }
    },
    resetDice: function() {

        initGame.init();
    }
}

