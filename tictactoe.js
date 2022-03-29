/**
FUNCTIONALITY 

handle player change (x or 0)
check to see if box is taken
handle restart game
handle cell played
handle win condition / result validation
handle cell click

**keep score
 */

const statusDisplay = document.querySelector('.game-status');

//game settings
let gameActive = true;
let currentPlayer = 'X'; // X or O

let gameState = [
    '','','',
    '','','',
    '','',''
];

let xScore = document.getElementById('xScore');
let oScore = document.getElementById('oScore');
let catScore = document.getElementById('catScore');
let count = 0;

let scoreObj = {
    x: 0,
    o: 0,
    c: 0
}

xScore.innerText = scoreObj.x;
oScore.innerText = scoreObj.o;
catScore.innerText = scoreObj.c;

const winningMessage =()=> `Player ${currentPlayer} has won!`;
const drawMessage =()=> `Game has ended in a draw`;
const currPlayerTurn =()=> `It's ${currentPlayer}'s turn`;

statusDisplay.innerText = currPlayerTurn();

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// handle cell clicked
const handleCellClicked =(clickedCellEvent) => {
    //grab clicked cell
    const clickedCell = clickedCellEvent.target;
    const clickedCellIdx = parseInt(clickedCell.getAttribute('data-cell-index'));
    //console.log(clickedCell, clickedCellIdx)

    //if the indexed item is not an empty string or if gameActive is false
    if (gameState[clickedCellIdx] !=='' || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIdx);
    resultValidation();
}

// handle cell played
const handleCellPlayed =(clickedCell, clickedCellIdx) => {
    gameState[clickedIdx] = currentPlayer;

    //if (currentPlayer == 'X') {
     //   clickedCell.style.color = '#109eff'
    //} else {
      //  clickedCell.style.color = '#f00';
    //}

    //ternary
    currentPlayer == 'X' ? clickedCell.style.color = '#109eff': clickedCell.style.color = 'red'

    clickedCell.innerHTML = currentPlayer;
}

//handle result validation
const resultValidation =()=> {
    let roundWon = false;

    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];

        if (a == '' || b == '' || c == '') {
            continue;
        }

        if (a == b && b == c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.innerText = winningMessage();
        if (currentPlayer == 'X') {
            scoreObj.x+= scoreObj.x
            xScore.innerText = scoreObj.x
        } else {
            oScore.innerText = scoreObj.o
        }
        gameActive = false;
        return;
    }

    let roundDraw = !gameState.includes('');

    if (roundDraw) {
        statusDisplay.innerText = drawMessage();
        scoreObj.c+=1;
        catScore.innerText = scoreObj.c
        gameActive = false;
        return;
    }

    playerChange();
}

// handle player change
const playerChange =()=> {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.innerText = currPlayerTurn();
}

// restart the game
const restartGame =()=> {
    gameActive = true;
    currentPlayer = 'X';
    gameState = [
        '','','',
        '','','',
        '','',''
    ];

    statusDisplay.innerText = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = '');
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClicked))

document.querySelector('.game-restart').addEventListener('click', restartGame);
