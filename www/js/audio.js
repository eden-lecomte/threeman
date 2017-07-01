var audioEffect = new Audio();
var audio = {};

var audioInit = {
    twoforMe: function() {
        var _audio = ['2/2.mp3', '2/2alt.mp3', '2/2alt1.mp3'];
        playEffect(_audio);
    },
    twoforTwo: function() {
        var _audio = ['two4two.mp3'];
        playEffect(_audio);
    },    
    threeIsRolled: function() {
        var _audio = ['3/solo32.mp3', '3/solo33.mp3', '3/solo34.mp3', '3/solo35.mp3'];
        playEffect(_audio);
    }, 
    four: function() {
        var _audio = ['4/4.mp3', '4/4alt.mp3'];
        playEffect(_audio);
    },       
    newThreeman: function() {
        var _audio = ['new3Man.mp3', 'new3man1.mp3', 'new3man2.mp3', '3/3.mp3', '3/3alt1.mp3', '3/3alt3.mp3', '3/3alt5.mp3', '3/3alt7.mp3', '3/3alt8.mp3', '3/3alt9.mp3', '3/3alt10.mp3'];
        playEffect(_audio);
    },        
    virginRoll: function() {
        var _audio = ['Virgin.mp3', 'VirginRoll.mp3'];
        playEffect(_audio);        
    },
    nextPlayer: function() {
        var _audio = ['NextPlayer.mp3', 'NextPlayer1.mp3', 'NextPlayer2.mp3', '9/9alt.mp3'];
        playEffect(_audio);        
    },    
    doubleThrees: function() {
        var _audio = ['two3s.mp3', '6/6alt.mp3'];
        playEffect(_audio);                
    },
    seven: function() {
        var _audio = ['7/7.mp3', '7/7alt.mp3', '7/7alt1.mp3', '7/7alt2.mp3'];
        playEffect(_audio);          
    },
    social: function() {
        var _audio = ['10/10alt.mp3', '10/10alt1.mp3'];
        playEffect(_audio);                  
    },
    eleven: function() {
        var _audio = ['11/11.mp3', '11/11alt.mp3', '11/11alt1.mp3'];
        playEffect(_audio); 
    },
    doubleSix: function() {
        var _audio = ['12/12.mp3', '12/12alt.mp3', '12/12alt1.mp3', '12/12alt2.mp3', '12/12alt3.mp3'];
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
audio["welcome"].src = "audio/Welcometothreeman.mp3";

audio["mlghorn"] = new Audio();
audio["mlghorn"].src = "audio/3airhorn.mp3";
audio["mlghorn"].volume = 0.8;
