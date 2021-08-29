const colors = {
    r: "red",
    b: "blue",
    a: "aqua",
    v: "blueviolet",
    g: "gray",
    o: "orange",
    y: "yellow",
    k: "black",
};

// Thoi gian re-renderBoard lai mot lan
const delay = 350;
const delayFast = 20;

// Xac dinh game co dang chay
let gameOnGoing = false;
const setGameOnGoing = (s) => gameOnGoing = s;

// Khoi tao game tetris
const tetris = new Tetris(setGameOnGoing, renderMainBoard, renderSideBoard);

// Set click listeners for buton
const start = document.getElementById("start-game");
const resume = document.getElementById("resume-game");

let intervalFast=thottling();
// Luu tru cac su kien co the xay ra 
const keyDownEventHandlers = {
    ArrowDown: () => {intervalFast();},
    s: () => {intervalFast();},
    ArrowRight: tetris.moveRight,
    d: tetris.moveRight,
    ArrowLeft: tetris.moveLeft,
    a: tetris.moveLeft,
    j: tetris.rotateLeft,
    k: tetris.rotateRight,
    Escape: () => {
        setGameOnGoing(false);
        resume.style.display = 'block';
    },
};


// Dem lan choi
let counter = 0;

// Luu tru id cua loop game
let idInterval;


const modal = document.getElementById('modal');

function showFlex(element){
    element.style.display = "flex";
}

function pauseGame() {
    clearInterval(idInterval);
    showFlex(modal); // modal : generate.js
}

function thottling()
{
    let id;
    return function() {
        if (!id)
        {
            id = setTimeout(() => {
                loop();
                id=undefined;
            }, delayFast);
        }
    }
}


// Set key listeners for document
document.onkeydown = (e) => {
    let handler = keyDownEventHandlers[e.key];
    if (handler) {
        handler();
        renderMainBoard(tetris.board);
    }
};


// Can them chuc nang tiep tuc game
start.onclick = (e) => {
    // An modal di
    modal.style.display = "none";
    // Bat dau game
    gameOnGoing = true;
    idInterval = setInterval(loop, delay); 
    
    tetris.fillSideBar();

    if (counter > 0)
    {
        resetBoard();
        tetris.newGame();
    }
    counter++;
}

resume.onclick = (e) => {
    setGameOnGoing(true);
    idInterval = setInterval(loop, delay); 
    modal.style.display = "none";
}