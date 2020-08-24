$(document).ready(function(){
        $.ajax({
            type:"GET",
            url:"load.php",
            contentType:"application/json; charset=utf-8",
            dataType:'json',

                success: function(json) {
                     const pot = [];
                    for (var klucz in json)
                        {
                            var wiersz = json[klucz]; 
                            pot.push(wiersz[0]);
                            
                        } 
                        begin(pot);
                },
                 
                error: function(blad) {
                    alert( "Wystąpił błąd");
                    console.log(blad);
                }
             
        });
});

const lettersDiv = document.getElementById("letters");
const letters = "AĄBCĆDEĘFGHIJKLŁMNŃOÓPQRSŚTUWVXYZŹŻ".split("");
let mistakes = 0;
let refreshedSentence = "";

String.prototype.setChar = function(position, char){                            // podmiana znaku na podanej pozycji w stringu
    if (position>this.length-1)  return this.toString();
    else return this.substr(0,position)+char+this.substr(position+1);
}


function begin (pot){
    const min = 0;
    const max = pot.length;
    const index = Math.floor(Math.random() * (max - min)) + min;                  // losowanie hasła z puli
    const sentenceToGuess = pot[index].toUpperCase();     

    for (var i = 0; i < letters.length; i++){
        lettersDiv.innerHTML += `<div class = "letter" onclick = "check('${sentenceToGuess}', ${i})" id = "lett${i}">${letters[i]}</div>`;
        if ((i+1)%7==0){
            lettersDiv.innerHTML += '<div style="clear: both;"></div>';
        }
    }

    mistakes = 0;
    picture = document.getElementById("picture");
    picture.innerHTML = "<img src=img/s"+mistakes+".jpg alt=''></img>";
    for (var i = 0; i < sentenceToGuess.length; i++){
        if (sentenceToGuess[i]!==" ")
            refreshedSentence += "-";
        else
            refreshedSentence += " ";
    }
    refresh();
}

function check(sentenceToGuess, letterDivNo){
    let flag = false;
    for (var i = 0; i < sentenceToGuess.length; i++){
        if (sentenceToGuess[i] == letters[letterDivNo]){
            refreshedSentence = refreshedSentence.setChar(i, letters[letterDivNo]);
            setAsCorrect(letterDivNo);
            flag = true;
            if (refreshedSentence == sentenceToGuess){
                lettersDiv.innerHTML = "Brawo, hasło odgadnięte!";
                resetButton = document.createElement('button');
                resetButton.textContent = 'Jeszcze raz?';
                document.body.appendChild(resetButton);
                resetButton.addEventListener('click', resetGame);
            }
        }
    }
    if (flag == false){
        setAsWrong(letterDivNo);
        mistakes++;
        if (mistakes < 10)
            nextImage(mistakes);
        if (mistakes == 9){
            lettersDiv.innerHTML = "Koniec gry - przegrana!<br/>Prawidłowe hasło:<br/>"+sentenceToGuess;
            resetButton = document.createElement('button');
            resetButton.textContent = 'Jeszcze raz?';
            document.body.appendChild(resetButton);
            resetButton.addEventListener('click', resetGame);   
        }
    }
    refresh();
}

function refresh(){
    var sentence = document.getElementById("sentence");
    sentence.innerHTML = refreshedSentence;
}

function setAsCorrect(letterDivNo){
    letterToSet = document.getElementById("lett"+letterDivNo);
    letterToSet.style.background = '#003300';
    letterToSet.style.border = '2px solid #00C000';
    letterToSet.style.cursor = 'default';
    letterToSet.setAttribute("onclick", ";");
}

function setAsWrong(letterDivNo){
    letterToSet = document.getElementById("lett"+letterDivNo);
    letterToSet.style.background = '#330000';
    letterToSet.style.border = '2px solid #C00000';
    letterToSet.style.cursor = 'default';
    letterToSet.setAttribute("onclick", ";");
}

function nextImage(mistakes){
        picture = document.getElementById("picture");
        picture.innerHTML = "<img src=img/s"+mistakes+".jpg alt=''></img>";
}

function resetGame(){
    resetButton.parentNode.removeChild(resetButton);
    location.reload();
}