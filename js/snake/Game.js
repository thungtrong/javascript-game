{
    const btnStart = document.getElementById("start-game");
    const btnResume = document.getElementById("resume-game");
    const modal = document.getElementById("modal");

    const boardElement = [];
    const rows = board.children.length - 1;

    for (let i = 0; i < rows; i++) {
        boardElement.push([...board.children[i].children]);
    }
    const snake = new Snake(rows);

    const delay = 120;

    let id;
    function startLoop() {
        id = setInterval(loop, delay);
    }

    btnStart.onclick = function () {
        modal.style.display = "none";

        resetBoard();
        snake.reset();

        startLoop();
    };

    btnResume.onclick = function () {
        modal.style.display = "none";
        startLoop();
    };

    document.onkeydown = (e) => {
        if (e.key.includes("Arrow")) snake.setDirectory(e.key);
        if (e.key === "Escape") {
            clearInterval(id);
            modal.style.display = "flex";
            btnResume.style.display = "block";
        }
    };

    let blockRemove;

    function loop() {
        blockRemove = snake.move();
        if (blockRemove) {
            changeColor(blockRemove.x, blockRemove.y, "black");
        }
        renderSnake();
    }

    function changeColor(x, y, color) {
        try {
            boardElement[y][x].className = `block ${color}`;
        } catch (e) {
            console.log(x, y);
        }
    }

    function resetBoard() {
        let len = snake.chain.length;
        for (let i = 0; i < len; i++) {
            changeColor(snake.chain[i].x, snake.chain[i].y, "black");
        }
        changeColor(snake.bait.x, snake.bait.y, "black");
    }

    function renderSnake() {
        let len = snake.chain.length;

        for (let i = 1; i < len; i++) {
            changeColor(snake.chain[i].x, snake.chain[i].y, "white");
        }
        let check =
            boardElement[snake.chain[0].y][snake.chain[0].x].className.includes(
                "white"
            );
        if (check) {
            clearInterval(id);
            btnResume.style.display = "none";
            modal.style.display = "flex";
            alert("You lost!");
        } else {
            changeColor(snake.chain[0].x, snake.chain[0].y, "white");
        }
        changeColor(snake.bait.x, snake.bait.y, "red");
    }
}
