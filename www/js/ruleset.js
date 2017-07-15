var globalRules = {
    vessel: 10,
    offTable: 0,
    dice: 2,
}



var threeManExists = false;
var virgin = true;
var diceRolled = false;
var offTheTableTrigger = false;

var offTableNew3Man = false;
var offTableFinishDrink = false;
var drinkValue = 1;

var current3ManDrinks = 0;
var previous3ManDrinks = 0;

var proEdition = false;

//Controls dice rotation multiplier
var n = $(window).data('n');

//vibrate
navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;


var initGame = {
    init: function() {
        if (soundOn == true) {
            try{
                audio["welcome"].play();
            } catch (err) {
                $('.sound').addClass('mute');
                soundOn = false;
            }           
        };

        virgin = true;
        diceRolled = false; 

        $('.diceRoller').on('click touchstart', function(e) {
            $("#game .dice2 .cube").unbind();

            $('body').removeClass('teal');
            $('body').removeClass('offTable');

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
                        
                        return false;
                    };

                    diceRolled = true; //stop double clicking 

                    $('.results').fadeOut('fast');    
                    $('.menuToggles').fadeOut('fast'); 
                    $('.diceroll .diceRoller').parent().fadeOut('fast');                   
                    $('span.desc').css('color', '#aff2d1');

                    rollDice();

                    //update dice with correct angles to rotate to
                    setDiceAngle();

                    //rotate dice
                    if (offTheTableTrigger == true) {
                        
                        function randomTangent() {
                            //return a random number between 500, 1500 and -500,-1500
                            return Math.floor(Math.random() * $('body').width()/2 + (Math.random() < 0.5 ? -( ( $('body').width()/2 ) * 2 ) : $('body').width()/2 ));
                        };

                        $('.dice1 .cube').css({ '-webkit-transform': 'translate('+ randomTangent() +'px, '+ randomTangent() +'px) rotateX(' + angle.x + 'deg) rotateY(' + angle.y + 'deg)', '-webkit-transition': '2s' })
                        $('.dice2 .cube').css({ '-webkit-transform': 'translate('+ randomTangent() +'px, '+ randomTangent() +'px) rotateX(' + angle1.x + 'deg) rotateY(' + angle1.y + 'deg)', '-webkit-transition': '2s' })
                    } else {
                        $('.dice1 .cube').css({ '-webkit-transform': 'translateZ(-100px) rotateX(' + angle.x + 'deg) rotateY(' + angle.y + 'deg)', '-webkit-transition': '2s' })
                        $('.dice2 .cube').css({ '-webkit-transform': 'translateZ(-100px) rotateX(' + angle1.x + 'deg) rotateY(' + angle1.y + 'deg)', '-webkit-transition': '3s' })
                    }
                };

            }
            $("#game .dice2 .cube").one("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){ 
                setTimeout( function() {
                    $('body').addClass('teal');

                    //update the dice image
                    $('.dice1').attr('name', diceRoll[0]);
                    $('.dice2').attr('name', diceRoll[1]);                

                    if (offTheTableTrigger == true) {
                        gameFunctions.offTableAction();  
                        return false;
                    }

                    gameFunctions[diceRoll[0]]();

                    //check off the table rules
                    gameFunctions.offTable();   

                    $('#diceResult').text(diceCombined);
                    $('#illustration img').attr('src', 'img/icon' + diceCombined + '.png');

                    $('#diceResult').css('font-size', $('.results').width()*0.7 + 'px');
                    $('.instructions').css('font-size', '');

                    $('.instructions').fadeIn();
                    $('.results').fadeIn('fast');   
                    $('span.desc').css('color', '#211f34');
                    
                    $('.menuToggles').fadeOut('fast'); 

                    diceRolled = false; //resume click ability                                 
                    $("#game .dice2 .cube").unbind();
                }, 200);                    
            });
        });

        //duel init
        $('#duel .diceRollerDuel').on('click touchstart', function(e) {
            var id = $(this).parent().parent().attr('id');
            $(this).parent().fadeOut('fast');
            
            //check if both dice have been rolled
            var playerButtons = $('#duel .cube');
            
            //check which player is rolling
            if (id == 'orange') {
                diceRoll[0] = Math.floor(Math.random() * 6) + 1;
                
                //NEW DICE CODE
                angle = {};

                $('.dice1 .cube').attr('style', '');
                angle = { x: 360 * n, y: 360 * n };

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
                };

                $('.dice1').attr('name', diceRoll[0]); 
                $('.dice1 .cube').css({ '-webkit-transform': 'translateZ(-100px) rotateX(' + angle.x + 'deg) rotateY(' + angle.y + 'deg)', '-webkit-transition': '2s' });
                $("#duel .dice1 .cube").one("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){ 
                    $(this).addClass('rolled');                
                    $("#duel .dice1 .cube").unbind();
                });
            };
            if (id == 'pink') {
                diceRoll[1] = Math.floor(Math.random() * 6) + 1;

                //NEW DICE CODE
                angle1 = {};

                $('.dice2 .cube').attr('style', '');
                angle1 = { x: 360 * n, y: 360 * n };
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
                };


                $('.dice2').attr('name', diceRoll[1]);         
                $('.dice2 .cube').css({ '-webkit-transform': 'translateZ(-100px) rotateX(' + angle1.x + 'deg) rotateY(' + angle1.y + 'deg)', '-webkit-transition': '2s' }) ;
                $("#duel .dice2 .cube").one("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){ 
                    $(this).addClass('rolled');                
                    $("#duel .dice2 .cube").unbind();
                });                                               
            };            

            duelCheck();

            // when both players have rolled
            function duelCheck() {
                setTimeout( function() {
                    if ( $(playerButtons[0]).hasClass('rolled') && $(playerButtons[1]).hasClass('rolled') == true) {

                        virgin = false;

                        //Player 1 wins
                        if ( diceRoll[0] > diceRoll[1] ) {
                            $('#orange .duelResult').html("<h3>You win!</h3>");
                            $('#pink .duelResult').html("<h3>You lose!</h3><p>Drink " + (diceRoll[0] - diceRoll[1])*drinkValue + "<span class='bitch'></span>!</p>")
                            if ( (diceRoll[0] - diceRoll[1]) >= 5 ) {
                                $('.bitch').text(', bitch');
                            }                        
                        };

                        //Player 2 wins
                        if ( diceRoll[1] > diceRoll[0] ) {
                            $('#pink .duelResult').html("<h3>You win!</h3>");
                            $('#orange .duelResult').html("<h3>You lose!</h3><p>Drink " + (diceRoll[1] - diceRoll[0])*drinkValue + "<span class='bitch'></span>!</p>")                        
                            if ( (diceRoll[1] - diceRoll[0]) >= 5 ) {
                                $('.bitch').text(', bitch');
                            }
                        }

                        $('.rolled').removeClass('rolled');

                        //run standard functions for overall total
                        $('#diceResult').text(diceCombined);

                        //Allow for doubles within a duel
                        if (diceRoll[0] == diceRoll[1] 
                            && threeManExists === false 
                            && diceCombined != 6 
                            && diceCombined != 12
                        ){
                            $('.instructions').html('Well, that wasn\'t supposed to happen!<br>Both of you drink the total.'); 
                        } else {
                            gameFunctions[diceRoll[0]]();     
                        }

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
                            $('.diceroll .diceRoller').parent().fadeIn('fast');    
                            $('span.desc').css('color', '#aff2d1');
  
                            diceRoll = [];//reset dice roll
                            diceRolled = false;
                        });
                    } else {
                        duelCheck();
                    }
                }, 200)
            }


        });

        //navigation
        $('.goBack').on('click', function(e) {
           $('body').removeClass('teal'); 
        });

        //Orientation change
        // Listen for resize changes
        window.addEventListener("resize", function() {
            // Get screen size (inner/outerWidth, inner/outerHeight)
            $('#diceResult').css('font-size', $('.results').width()*0.7 + 'px');
        }, false);

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
                $('.instructions').text('' + drinkValue*3 + ' drinks for 3 Man!');
                $('.rollInstructions').text('Roll again');
                audioInit.doubleThrees();
                update3ManDrinks(drinkValue*3);   
                virgin = false;     
            } else {
                gameFunctions.duel();
            }
        } else if (diceRoll[1] == 4) {
            //7
            gameFunctions.toLeft();
            if (threeManExists == true) {
                $('.instructions').append('<br> and 3 Man drinks ' + drinkValue + '!');
                $('.rollInstructions').text('Roll again');   
                update3ManDrinks(drinkValue);                             
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
                $('.instructions').append('<br> and 3 Man drinks ' + drinkValue + '!');
                $('.rollInstructions').text('Roll again');            
                update3ManDrinks(drinkValue);                    
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
            virgin = false;
            $('.instructions').text('Everyone except 3 Man, drink ' + drinkValue*2 + '!');  
            $('.rollInstructions').text('Roll again');   
            audioInit.doubleSix();
        } else {
            gameFunctions.duel();
        }
    },
    check3man: function() {
        if (threeManExists == true) {
            virgin = false;
            $('.instructions').text('3 Man drinks ' + drinkValue + '!');
            $('.rollInstructions').text('Roll again');     
            audioInit.threeIsRolled();
            update3ManDrinks(drinkValue);        
        } else {
            //nothing?
            gameFunctions.checkVirgin();
        }
    },
    threeman: function() {
        virgin = false;
        threeManExists = true;
        $('.instructions').text('You are the new 3 Man! Put on the sweet hat, and drink ' + drinkValue + ' to say hello!');
        $('.rollInstructions').text('Roll again');   
        if (soundOn == true) {
            audio["mlghorn"].play();
        };
        setTimeout( function() {
            audioInit.newThreeman();  
        }, 1500); 
        new3ManDrinks(drinkValue);
    },
    social: function() {
        virgin = false;
        $('.instructions').text('Everyone drink ' + drinkValue + '!');
        $('.rollInstructions').text('Roll again');
        audioInit.social();
    },
    duel: function() {
        virgin = false;
        diceRoll = [];//reset dice roll
        //reset dice spin multiplier
        $(window).data('n', $(window).data('n') ? 0 : 5);
        n = $(window).data('n');

        $('.instructions').html('Pick 2 people to duel<br>Loser drinks the difference');
        $('.rollInstructions').text('Pass device to Duellers'); 
        $('.rollInstructions').addClass('duelTime'); 
        audioInit.duel();
    },
    toLeft: function() {
        virgin = false;
        $('.rollInstructions').text('Roll again');        
        $('.instructions').text('Drink ' + drinkValue + ' to the left!');
        audioInit.seven();
    },
    toRight: function() {
        virgin = false;
        $('.instructions').text('Drink ' + drinkValue + ' to the right!');
        $('.rollInstructions').text('Roll again');
        audioInit.eleven();        
    },
    twoForTwo: function() {
        virgin = false;
        $('.instructions').text('Pick 2 people to drink ' + drinkValue*2 + ' drinks');
        $('.rollInstructions').text('Roll again');
        audioInit.twoforTwo();
    },
    twoforMe: function() {
        virgin = false;
        $('.instructions').text('' + drinkValue*2 + ' drinks for you!');
        $('.rollInstructions').text('Roll again');
        audioInit.twoforMe();
    },    
    checkVirgin: function() {
        if (window.location.hash != '#duel') {
            if (virgin == true) {
                virgin = false; 
                $('.instructions').text('Virgin roll, drink ' + drinkValue + ' and go again!')
                $('.rollInstructions').text('Roll again');
                audioInit.virginRoll();
            } else {
                $('.instructions').html('Nothing... <br>Next players turn!')
                audioInit.nextPlayer();
                console.log('----------');
                console.log('NEW PLAYER');
                console.log('----------');            
                $('.rollInstructions').text('< Pass device left');
                if (navigator.vibrate) {
                    navigator.vibrate(500);
                };
                $('.rollInstructions').addClass('passPhone');

                $('.passPhone').on('click.remove', function(e) {
                    // reset style back to start
                    $('body').removeClass('teal');
                    $('.results').fadeOut('fast');
                    $('.menuToggles').fadeIn('fast');
                    $('span.desc').css('color', '#aff2d1');
                    $('.passPhone').unbind('click.remove');
                    $('.passPhone').removeClass('passPhone');         
                    $('.diceroll .diceRoller').parent().fadeIn('fast');      
                       
                });
                
                virgin = true;                    
                setTimeout( function() {
                    $('.passPhone').click();
                }, 8000);                
            }
        }
    },
    offTable: function() {
        //check the 1% off the table rule

        //uh oh you friccin' moron
        //set animation to roll dice off table
        // + screenshake
        //move offTable to trigger NEXT roll, rather than this one

        if( offTableNew3Man == true || offTableFinishDrink == true) {
            var offTableRoll = Math.floor(Math.random() * 100) + 1
            //1/100 means 1%
            if (offTableRoll == 1) {
                offTheTableTrigger = true;
            }
        }
    },
    offTableAction: function() {

            $('#diceResult').text('RIP');
            $('#diceResult').css('font-size', $('.results').width()*0.5 + 'px');
            
            $('.rollInstructions').text('Roll again');   
            $('.rollInstructions').hide();

            $('body').addClass('offTable');
            offTheTableTrigger = false;
            
            $('.results').fadeIn('medium');
            slowShake('body', 2000);

            $('.instructions').css('font-size', $('.instructions').width()/14 + 'px');
            $('.instructions').html('Uh oh, you friccin\' moron<br>You rolled off the table...<br>'); 
            
            if (offTableNew3Man == true && offTableFinishDrink == false) {
                $('.instructions').append('You are the new 3 Man! Drink ' + drinkValue + ' and roll again<br>');
            }
            if (offTableFinishDrink == true && offTableNew3Man == false) {
                $('.instructions').append('Finish your drink and roll again');
            }
            if (offTableFinishDrink == true && offTableNew3Man == true) {
                $('.instructions').append('Finish your drink, and enjoy being the new 3 man!');
            }

            if (navigator.vibrate) {
                navigator.vibrate(1500);
            };      
            
            setTimeout( function() {
                $('.rollInstructions').fadeIn('slow');
                diceRolled = false; //resume click ability                                             
            }, 1500)

            if (soundOn == true) {
                audio["mlghorn"].play();
            };
            setTimeout( function() {
                audioInit.offTable();  
            }, 1500); 
            new3ManDrinks(drinkValue);        
            $("#game .dice2 .cube").unbind();            

            return false;              
    },
    resetDice: function() {
        initGame.init();
    },

};


function setDiceAngle() {
    //NEW DICE CODE
    angle = {};
    angle1 = {};

    //Get window data and toggle between 0/5 to ensure full rolls
    $(window).data('n', $(window).data('n') ? 0 : 5);
    n = $(window).data('n');

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
};

//Add a slow shake that lasts defined duration
function slowShake( element, duration ) {
    $(element).addClass('shake-slow shake-constant');
    setTimeout(function() {
        $(element).removeClass('shake-slow shake-constant');
    }, duration);
};

//Add a hard shake that lasts defined duration
function hardShake( element, duration ) {
    $(element).addClass('shake shake-constant');
    setTimeout(function() {
        $(element).removeClass('shake shake-constant');
    }, duration);
};

//Add a little shake that lasts defined duration
function littleShake( element, duration ) {
    $(element).addClass('shake-little shake-constant');
    setTimeout(function() {
        $(element).removeClass('shake-little shake-constant');
    }, duration);
};


function update3ManDrinks(drinks) {
    var drinkCount = drinks;
    if (proEdition == true) {
        
        for (i = 0; i < drinkCount; i++) {
            setTimeout(function() {

                if (soundOn == true) {
                    var audioSound = new Audio();
                    audioSound.src = "audio/buttonchime02up.wav";
                    audioSound.play();

                    setTimeout(function() {
                        var audioSound;
                    }, 300);
                };
                var icon = $('<div class="newDrink" name="'+ i +'"></div>').text('+1');

                $(icon).css({
                    'margin-left': randomMargin()+'px',
                    'margin-top': randomMargin()+'px'
                });

                $('body').append(icon);
                $(icon).fadeIn(200);
                
                $(icon).animate({
                    fontSize: "40px"
                }, 300);

                littleShake(icon, 400);

                $(icon).promise().done(
                    animateDrinkCount(icon, drinkCount)
                );
            }, i*200);                
        }
    }
};

function new3ManDrinks(drinks) {
    var drinkCount = drinks;


    if (previous3ManDrinks < current3ManDrinks) {
        previous3ManDrinks = (current3ManDrinks + drinkCount);
        $('.previous.three-man span.number').fadeOut('200').promise().done(function() {
            $('.previous.three-man span.number').text(previous3ManDrinks);
            $('.previous.three-man span.number').fadeIn('200');
        });            
    }
    current3ManDrinks = 0;
    $('.current.three-man span.number').fadeOut('200').promise().done(function() {
        $('.current.three-man span.number').text(0);
        $('.current.three-man span.number').fadeIn('200');
    });
    update3ManDrinks(drinks)
};


function animateDrinkCount(icon, drinks) {
    var object = icon;
    var drinkCount = drinks

/* Use this to interrupt halfway if want to try and form a gradient
    $(icon).animate({
        top: '30vh',
        left: '50vw',
        marginLeft: Math.floor(Math.random() * 50 + (Math.random() < 0.5 ? -100 : 100 )) +'px',
        marginTop: '15px',
    }, 500);
*/
    $(icon).animate({
        top: $('.three-man.current').css('top'),
        left: $('.three-man.current').css('left'),
        marginLeft: '0px',
        marginTop: '15px',
    }, 500);

    //end
    $(icon).animate({
        fontSize: '0px'
    }, 800);

    //must match above animation timer
    setTimeout(function() {

        $('.current.three-man span.number').animate({
            fontSize: "40px",
            top: '-5px',
            left: '-2px'
        }, 100);

        setTimeout(function() {
            current3ManDrinks = current3ManDrinks + 1;
            $('.current.three-man span.number').text(current3ManDrinks);   
            
            $('.current.three-man span.number').animate({
                fontSize: "28px",
                top: '2px',
                left: '0px'
            }, 100);
        }, 150)
    }, 800);    
    
    $(icon).promise().done(
        function() {
            $(icon).remove();
        }
    );

};


function randomMargin() {
    //return a random number between 500, 1500 and -500,-1500
    return Math.floor(Math.random() * (10 + (Math.random() < 0.5 ? -70 : 70 )));
}