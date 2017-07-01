var audioEffect = new Audio();
var audio = {};

var audioInit = {
    twoforMe: function() {
        var _audio = ['2/2.ogg', '2/2alt.ogg', '2/2alt1.ogg'];
        playEffect(_audio);
    },
    twoforTwo: function() {
        var _audio = ['two4two.ogg'];
        playEffect(_audio);
    },    
    threeIsRolled: function() {
        var _audio = ['3/solo32.ogg', '3/solo33.ogg', '3/solo34.ogg', '3/solo35.ogg'];
        playEffect(_audio);
    }, 
    four: function() {
        var _audio = ['4/4.ogg', '4/4alt.ogg'];
        playEffect(_audio);
    },       
    newThreeman: function() {
        var _audio = ['new3Man.ogg', 'new3man1.ogg', 'new3man2.ogg', '3/3.ogg', '3/3alt1.ogg', '3/3alt3.ogg', '3/3alt5.ogg', '3/3alt7.ogg', '3/3alt8.ogg', '3/3alt9.ogg', '3/3alt10.ogg'];
        playEffect(_audio);
    },        
    virginRoll: function() {
        var _audio = ['Virgin.ogg', 'VirginRoll.ogg'];
        playEffect(_audio);        
    },
    nextPlayer: function() {
        var _audio = ['NextPlayer.ogg', 'NextPlayer1.ogg', 'NextPlayer2.ogg', '9/9alt.ogg'];
        playEffect(_audio);        
    },    
    doubleThrees: function() {
        var _audio = ['two3s.ogg', '6/6alt.ogg'];
        playEffect(_audio);                
    },
    seven: function() {
        var _audio = ['7/7.ogg', '7/7alt.ogg', '7/7alt1.ogg', '7/7alt2.ogg'];
        playEffect(_audio);          
    },
    social: function() {
        var _audio = ['10/10alt.ogg', '10/10alt1.ogg'];
        playEffect(_audio);                  
    },
    eleven: function() {
        var _audio = ['11/11.ogg', '11/11alt.ogg', '11/11alt1.ogg'];
        playEffect(_audio); 
    },
    doubleSix: function() {
        var _audio = ['12/12.ogg', '12/12alt.ogg', '12/12alt1.ogg', '12/12alt2.ogg', '12/12alt3.ogg'];
        playEffect(_audio);         
    }
};


function playEffect(_audio) {
    if (soundOn == true) {
        var _audioSrc = 'audio/' + _audio[Math.floor(Math.random() * _audio.length)];
        audioEffect.src = _audioSrc;
        audioEffect.play();
    };
}


//Duel
audio["duelStart"] = new Audio();
audio["duelStart"].src = "audio/its-time-to-duel.mp3";

audio["welcome"] = new Audio();
audio["welcome"].src = "audio/Welcometothreeman.ogg";

audio["mlghorn"] = new Audio();
audio["mlghorn"].src = "audio/3airhorn.mp3";
audio["mlghorn"].volume = 0.8;
