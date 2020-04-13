/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, diceNoGenerated;
init();



//Initialises the game
//Player 1 = 0
//Player 2 = 1
function init() {

    //reset global scores
    scores = [0, 0]; 
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';

    //reset round scores
    roundScore = 0; 
    document.getElementById('current-0').textContent = '0';   
    document.getElementById('current-1').textContent = '0';

    //reset player names
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    //remove styling from panels
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    //set active player to player 1
    activePlayer = 0; 

    //set player 1 panel to active panel
    document.querySelector('.player-0-panel').classList.add('active');

    //show the dice image and buttons
    document.querySelector('.dice').style.display = 'block';
    document.querySelector('.btn-hold').style.display = 'block';
    document.querySelector('.btn-roll').style.display = 'block';

}

//Event - clicking of the roll dice button
document.querySelector('.btn-roll').addEventListener('click', function() {

    //generate random number between 1 and 6
    diceNoGenerated = Math.floor(Math.random() * 6 + 1);

    //display the relevant dice image based on the number generated
    document.querySelector('.dice').setAttribute('src', 'dice-' + diceNoGenerated + '.png');

    //add generated number to round score if not 1
    if (diceNoGenerated !== 1)
    {
        //update round score for active player
        roundScore += diceNoGenerated;
        document.getElementById('current-' + activePlayer).textContent = roundScore;
    }
    else
    {
        //change active player
        changeActivePlayer();
    }

})

document.querySelector('.btn-hold').addEventListener('click', function() {

    //add round score to global score
    scores[activePlayer] += roundScore;

    //clear roundScore
    roundScore = 0;
    document.getElementById('current-' + activePlayer).textContent = '0';

    //display new global score for active player
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];    

    //check if the game has been won by the current player
    if (scores[activePlayer] >= 100)
    {
        gameIsOver();
    }
    else
    {
        //switch to next player
        changeActivePlayer();
    }

})

document.querySelector('.btn-new').addEventListener('click', function() {

 init();

})

function changeActivePlayer()
{
    //clear the round score 
    roundScore = 0;

    //remove active panel for previous player and set new active player   
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    document.getElementById('current-' + activePlayer).textContent = '0';
    
    //set new active player
    activePlayer = (activePlayer === 0) ? 1 : 0;
    
    //set active panel for active player
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');

}

function gameIsOver()
{
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
    document.querySelector('#name-' + activePlayer).textContent = 'Winner!';

    //hide the dice image and buttons
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.btn-hold').style.display = 'none';
    document.querySelector('.btn-roll').style.display = 'none';
}


