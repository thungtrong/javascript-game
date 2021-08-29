

// find
function findBoard(name)
{
    let board = [];
    let rows = document.getElementById(name).children[0].children;
    let len = rows.length;
    for (let i = 0; i < len; i++){
        board.push(rows[i].children);
    }
    return board;
}


// Lay ra bang gom cac element block
const boards = {
    mainBoard : findBoard("main-board"),
    leftBoard : findBoard("left-board"),
    rightBoard : findBoard("right-board")
}
function changeBlockColor(row, column, color, name="mainBoard") {
    boards[name][row][column].className = `block ${colors[color]} ${name == "mainBoard" ? "" : "no-shadow small" }`;
}

function resetBoard(){
    for (let i = 0; i < 20; i++){
        for (let j = 0; j < 10; j++){
            changeBlockColor(i, j, "k");
        }
    }
}

function renderMainBoard(board) {
    // Render lai khu vuc moi co su thay doi
    for (let row = 0; row < 20; row++) {
        for (let col = 0; col < 10; col++) {
            changeBlockColor(row, col, board[row][col]);
        }
    }
}


function renderLeftBoard(shape) {
    let numRow = boards["leftBoard"].length;
    let numBlock = boards["leftBoard"][0].length;
    
    for (let row = 0; row < numRow; row++) {
        for (let col = 0; col < numBlock; col++) {
            changeBlockColor(row, col, "k", "leftBoard");
        }
    }
    
    numRow = shape.length;
    numBlock = shape[0].length;
    let colStart = numBlock > 2 ? 1 : 2;
    colStart = numBlock === 4 ? 0 : colStart;
    
    for (let row = 0; row < numRow; row++) {
        for (let col = 0; col < numBlock; col++) {
            changeBlockColor(row+1, col+colStart, shape[row][col], "leftBoard");
        }
    }
}

function renderRightBoard(listShape) {
    let numRow = boards["rightBoard"].length;
    let numBlock = boards["rightBoard"][0].length;
    
    for (let row = 0; row < numRow; row++) {
        for (let col = 0; col < numBlock; col++) {
            changeBlockColor(row, col, "k", "rightBoard");
        }
    }

    let shape;
    let numShape = listShape.length;
    let colStart;
    
    let count = 1;

    for (let i = 0; i < numShape; ++i) {
        shape = listShape[i];
        numRow = shape.length;
        numBlock = shape[0].length;
        colStart = numBlock > 2 ? 1 : 2;

        for (let row = 0; row < numRow; row++) {
            for (let col = 0; col < numBlock; col++) {
                changeBlockColor(row+count, col+colStart, shape[row][col], "rightBoard");
            }
        }
        count += numRow + 1;
    }
}

function renderSideBoard(currentShape, nextShapes) 
{
    renderLeftBoard(currentShape);
    renderRightBoard(nextShapes);
}
