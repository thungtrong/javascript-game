// Vong lap game
function loop() {
    if (!gameOnGoing) {
        pauseGame();
    }
    else {
        tetris.moveDown();
    }
}
