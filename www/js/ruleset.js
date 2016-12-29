var globalRules = {
    vessel: 10,
    offTable: 0,
    dice: 2,
}



var threeManExists = false;
var selectedDoors = [];
var virgin = true;
var diceRolled = false;

var offTableNew3Man = false;
var offTableFinishDrink = false;

var audio = {};
audio["duelStart"] = new Audio();
audio["duelStart"].src = "audio/its-time-to-duel.mp3";

//vibrate
navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;


var initGame = {
    init: function() {

        virgin = true;
        diceRolled = false; 

        $('.diceRoller').on('click', function(e) {
            if ($(this).hasClass('passPhone') == false ) {
                                
                if (diceRolled == false){
                    
                    if ( $(this).hasClass('duelTime') ) {
                        // reset style back to start
                        $('body').removeClass('teal');
                        $('.results').fadeOut('fast');
                        $('.instructions').text('');
                        $('.rollInstructions').text('');
                        $(this).removeClass('duelTime');

                        //take us to duel page
                        window.location.hash = '#duel';

                        audio["duelStart"].play();
                        return false;
                    };

                    diceRolled = true; //stop double clicking                 

                    //check the 1% off the table rule
                    if( offTableNew3Man == true || offTableFinishDrink == true) {
                        var offTableRoll = Math.floor(Math.random() * 100) + 1
                        console.log(offTableRoll);
                        //1/100 means 1%
                        if (offTableRoll == 1) {
                            $('.instructions').html('You rolled off the table...<br>'); 
                            
                            if (offTableNew3Man == true) {
                                $('.instructions').append('You are the new Three Man! Take a drink and roll again<br>');
                            }
                            if (offTableFinishDrink == true) {
                                $('.instructions').append('Finish your drink and roll again');
                            }

                            if (navigator.vibrate) {
                                navigator.vibrate(1500);
                            };                            
                            $('.rollInstructions').text('Roll again');   

                            $('body').addClass('offTable');
                            $('.results').fadeIn('fast');
                            
                            return false;              
                        }
                    }

                    rollDice();
                    diceRolled = true; 
                    gameFunctions[diceRoll[0]]();       

                    //update the dice image
                    $('.dice1').attr('name', diceRoll[0]);
                    $('.dice2').attr('name', diceRoll[1]);

                    //NEW DICE CODE
                    angle = {};
                    $(this).data('n', $(this).data('n') ? 0 : 5);
                    var n = $(this).data('n');
                    $('.cube').attr('style', '');
                    angle = { x: 360 * n, y: 360 * n };
                    angle1 = { x: 360 * n, y: 360 * n }

                    switch (diceRoll[0]) {
                        case 1:
                        break;
                        case 2:
                        angle.y = 360 * n + 90;
                        break;
                        case 3:
                        angle.x = 360 * n + 90;
                        break;
                        case 4:
                        angle.x = 360 * n - 90;
                        break;
                        case 5:
                        angle.y = 360 * n - 90;
                        break;
                        case 6:
                        angle.x = 360 * n + 180;
                        break;
                    }
                    switch (diceRoll[1]) {
                        case 1:
                        break;
                        case 2:
                        angle1.y = 360 * n + 90;
                        break;
                        case 3:
                        angle1.x = 360 * n + 90;
                        break;
                        case 4:
                        angle1.x = 360 * n - 90;
                        break;
                        case 5:
                        angle1.y = 360 * n - 90;
                        break;
                        case 6:
                        angle1.x = 360 * n + 180;
                        break;
                    }
                    $('.dice1 .cube').css({ '-webkit-transform': 'translateZ(-100px) rotateX(' + angle.x + 'deg) rotateY(' + angle.y + 'deg)', '-webkit-transition': '3s' })
                    $('.dice2 .cube').css({ '-webkit-transform': 'translateZ(-100px) rotateX(' + angle1.x + 'deg) rotateY(' + angle1.y + 'deg)', '-webkit-transition': '3s' })

                    //NEW DICE CODE END
                };
                diceRolled = false; //stop double clicking                 
            }
            $(".cube").bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){ 
                $('body').addClass('teal');
                $('body').removeClass('teal');
                
                $('#diceResult').text(diceCombined);
                $('.results').fadeIn('fast');      
            });
        });

        //duel init
        $('#duel .diceRollerDuel').on('click', function(e) {
            var id = $(this).parent().parent().attr('id');
            $(this).parent().fadeOut('fast');
            
            //check if both dice have been rolled
            var playerButtons = $('.diceRollerDuel');

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

            // when both players have rolled
            setTimeout( function() {
                if ( $(playerButtons[0]).hasClass('rolled') && $(playerButtons[1]).hasClass('rolled') == true) {
                    
                    if ( diceRoll[0] > diceRoll[1] ) {
                        $('#orange .duelResult').html("<h3>You win!</h3>");
                        $('#pink .duelResult').html("<h3>You lose!</h3><p>Drink " + (diceRoll[0] - diceRoll[1]) + "<span class='bitch'> </span>!</p>")
                        if ( (diceRoll[0] - diceRoll[1]) >= 5 ) {
                            $('.bitch').text(', bitch');
                        }                        
                    }
                    if ( diceRoll[1] > diceRoll[0] ) {
                        $('#pink .duelResult').html("<h3>You win!</h3>");
                        $('#orange .duelResult').html("<h3>You lose!</h3><p>Drink " + (diceRoll[1] - diceRoll[0]) + "<span class='bitch'> </span>!</p>")                        
                        if ( (diceRoll[1] - diceRoll[0]) >= 5 ) {
                            $('.bitch').text(', bitch');
                        }
                    }

                    $('.rolled').removeClass('rolled');

                    //run standard functions for overall total
                    $('#diceResult').text(diceCombined);
                    gameFunctions[diceRoll[0]]();     

                    $('#duel .rollInstructions').html('<a class="diceRoller" href="#game">Pass device back</a>');
                    $('.rollInstructions').addClass('passPhone');

                    $('.passPhone').on('click.remove', function(e) {
                        // reset style back to start
                        $('.duelResult').html('');
                        $('.dueller .button').show();
                        $('body').removeClass('teal');
                        $('.results').fadeOut('fast');
                        $('.passPhone').unbind('click.remove');
                        $('.passPhone').removeClass('passPhone');            
                    });
                }
            }, 50)

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
            gameFunctions.check3man();
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
            gameFunctions.check3man();
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
            //6
            if (threeManExists == true) {
                $('.instructions').text('Threeman drink 3x!');
                $('.rollInstructions').text('Roll again');
            } else {
                gameFunctions.duel();
            }
        } else if (diceRoll[1] == 4) {
            //7
            gameFunctions.toLeft();
            if (threeManExists == true) {
                $('.instructions').append('<br> and Threeman drinks!');
                $('.rollInstructions').text('Roll again');            
            }
        } else if (diceRoll[1] == 5) {
            //8
            gameFunctions.check3man();
        } else if (diceRoll[1] == 6) {
            //9
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
                $('.rollInstructions').text('Roll again');            
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
            gameFunctions.check3man();
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
            $('.rollInstructions').text('Roll again');                              
        } else {
            gameFunctions.checkVirgin();
        }
    },
    check3man: function() {
        console.log('Check for a 3 man function run');
        if (threeManExists == true) {
            $('.instructions').text('Threeman drinks!');
            $('.rollInstructions').text('Roll again');            
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
        $('.rollInstructions').text('Roll again');        
    },
    social: function() {
        console.log('Social function run');
        virgin = false;
        $('.instructions').text('Everyone drink!');
        $('.rollInstructions').text('Roll again');
    },
    duel: function() {
        console.log('Duel function run');        
        virgin = false;
        diceRoll = [];//reset dice roll
        $('.instructions').html('Pick 2 people to duel<br>Loser drinks the difference');
        $('.rollInstructions').text('Pass device to Duellers'); 
        $('.rollInstructions').addClass('duelTime'); 
    },
    toLeft: function() {
        console.log('To the left function run');
        virgin = false;
        $('.rollInstructions').text('Roll again');        
        $('.instructions').text('Drink to the left!');
    },
    toRight: function() {
        console.log('To the right function run');
        virgin = false;
        $('.instructions').text('Drink to the right!');
        $('.rollInstructions').text('Roll again');
    },
    twoForTwo: function() {
        console.log('Two for two');
        virgin = false;
        $('.instructions').text('Pick 2 people to drink 2 drinks');
        $('.rollInstructions').text('Roll again');
    },
    twoforMe: function() {
        console.log('Two for Me');
        virgin = false;
        $('.instructions').text('Two drinks for you!');
        $('.rollInstructions').text('Roll again');
        
    },    
    checkVirgin: function() {
        if (window.location.hash != '#duel') {
            console.log('Virgin check run');
            if (virgin == true) {
                $('.instructions').text('Virgin roll, drink and go again!')
                virgin = false; 
                $('.rollInstructions').text('Roll again');
            } else {
                $('.instructions').html('Nothing... <br>Next players turn!')
                console.log('----------');
                console.log('NEW PLAYER');
                console.log('----------');            
                $('.rollInstructions').text('<- Pass device left');
                if (navigator.vibrate) {
                    navigator.vibrate(500);
                };
                $('.rollInstructions').addClass('passPhone');
                $('.passPhone').on('click.remove', function(e) {
                    // reset style back to start
                    $('body').removeClass('teal');
                    $('.results').fadeOut('fast');
                    $('.passPhone').unbind('click.remove');
                    $('.passPhone').removeClass('passPhone');            
                });
                
                virgin = true;                    
            }
        }
    },
    offTable: function() {

    },
    resetDice: function() {
        initGame.init();
    }
}

