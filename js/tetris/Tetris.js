const row = ["k", "k", "k", "k", "k", "k", "k", "k", "k", "k"];
const rowg = ["g", "g", "g", "g", "g", "g", "g", "g", "g", "g"];

class Tetris {
    constructor(setGameOnGoing, renderMainBoard, renderSideBoard) {
        console.log("Constructing Game");
        this.setGameOnGoing = setGameOnGoing;
        this.renderMainBoard = renderMainBoard;
        this.renderSideBoard = renderSideBoard;

        this.rowGray = -1;

        // Tao bang
        this.newGame();
    }

    newGame() {
        console.log("New game");
        // Tao bang
        this.board = [];

        for (let i = 0; i < 20; i++) {
            if (this.board.length != 23) {
                this.board.push([...row]);
            } else {
                this.board[i] = [...row];
            }
        }
        this.board[-1] = [...row];
        this.board[-2] = [...row];
        this.board[-3] = [...row];

        this.position = {
            x: 4, // column
            y: -3, // row
        };

        this.lastPosition = {
            x: 4, // column
            y: -3, // row
        };

        this.currentShape = shapeBlocks[0]; // shape block object

        this.nextShapes = [
            // [index shape block.,
            // index rotate of shape block]
        ];

        this.setUp();
    }

    pickRandomShape()
    {
        let s = this.getRandInt(0, shapeBlocks.length);
        return shapeBlocks[s].pickRandomShape();
    }

    setUp() {
        console.log("setUp");
        // Random shape block
        this.currentShape = this.pickRandomShape();
        // Random next shape block
        let numberNext = 5;
        for (let i = 0; i < numberNext; i++) {
            
            this.nextShapes.push(
                this.pickRandomShape()
            );
        }

    }

    fillSideBar() {
        let allFormNextShape = this.nextShapes.map(value => value.getFormFullFill());
        this.renderSideBoard(this.currentShape.getFormFullFill(), allFormNextShape);
    }

    resetPositions() {
        this.position = {
            x: 4, // column
            y: -3, // row
        };

        this.lastPosition = {
            x: 4, // column
            y: -3, // row
        };
    }


    changeShape() {
        this.currentShape = this.nextShapes.shift();

        // Random new next shape
        this.nextShapes.push(
            this.pickRandomShape()
        );

        this.fillSideBar();
    }

    syncPosition() {
        this.lastPosition.y = this.position.y;
        this.lastPosition.x = this.position.x;
    }


    clearRow()
    {
        for (let i = this.rowGray; i > 0; i--) {
            this.board[i] = [...this.board[i - 1]];
        }
        this.board[0] = [...row];

        // Neu row thứ rowGray full fill
        let tmp = this.board[this.rowGray].every(this.isBlockGray);
        this.rowGray = tmp ? this.rowGray : -1;

        return this.rowGray !== -1;
    }

    moveDown = () => {
        // Neu nhu co dong can clear thi phai clear het moi tiep tuc toi khoi khac
        if (this.rowGray !== -1) {
            this.clearRow();
            this.renderMainBoard(this.board);
            return true;
        }

        this.syncPosition();
        this.position.y += 1;

        let result = this.fill();
        // result == false -> 1: end game; 2 -> Nằm trên khối khác
        if (!result) {
            if (this.checkEnd()) {
                this.setGameOnGoing(false);
            } else {
                this.resetPositions();
                let row = this.checkClearRow();
                if (row < 1) {
                //     // Co dong can clear
                //     return true;
                // } else {
                    // Game van tiep tuc bang cach chuyen sang khoi tiep theo
                    this.changeShape();
                }
            }
        }
        this.renderMainBoard(this.board);
        return false;
    }

    moveRight = () => {
        let limit = 10 - this.currentShape.getNumColumn();
        if (this.position.x < limit) {
            this.syncPosition();
            this.position.x += 1;
            let result = this.fill();

            if (!result) {
                this.position.x = this.lastPosition.x;
                this.position.y = this.lastPosition.y;
            }
        }
    }

    moveLeft = () => {
        if (this.position.x >= 0) {
            this.syncPosition();
            this.position.x -= 1;
            let result = this.fill();

            if (!result) {
                this.position.x = this.lastPosition.x;
                this.position.y = this.lastPosition.y;
            }
        }
    }

    /// Khu con loi
    rotateRight = () => {
        this.syncPosition();
        // Clear
        this.clearAtLastPosition();
        // Xoay
        this.currentShape.rotateRight();
        // Check
        let result = this.checkCanFill();
        if (!result) {
            this.currentShape.rotateLeft();
        }

        this.fill();
    }

    rotateLeft = () =>  {
        this.syncPosition();
        // Clear
        this.clearAtLastPosition();
        // Xoay
        this.currentShape.rotateLeft();
        // Check
        let result = this.checkCanFill();
        if (!result) {
            this.currentShape.rotateRight();
        }

        this.fill();
    }
    ///
    // re fill shape into board at position.
    fill(canChangeNextShape = false) {
        this.clearAtLastPosition();
        let canFill = this.checkCanFill();
        // console.log("fill", canFill);

        if (canFill) {
            let x = this.position.x;
            let y = this.position.y;
            this.fillAtPosition(x, y);
        } else {
            let x = this.lastPosition.x;
            let y = this.lastPosition.y;
            this.fillAtPosition(x, y);
        }
        return canFill;
    }

    fillAtPosition(x, y) {
        // console.log("fill at position: ", x, y);
        let form = this.currentShape.getForm();
        let blockOfShape;

        let numRow = form.length;
        let numCol = form[0].length;

        for (let row = 0; row < numRow; row++) {
            for (let column = 0; column < numCol; column++) {
                blockOfShape = form[row][column];

                if (blockOfShape !== "k") {
                    this.board[y + row][x + column] = this.currentShape.color;
                }
            }
        }
    }

    checkCanFill() {
        let form = this.currentShape.getForm();
        let numRow = form.length;
        let numCol = form[0].length;

        let blockOfShape;
        let blockOfBoard;

        let x = this.position.x;
        let y = this.position.y;

        let columnStart = 0;

        if (x == -1) {
            let col0 = this.currentShape.forms.map((value) => value[0]);
            if (col0.every(this.isBlockBlack)) {
                columnStart = 1;
            }
        }
        // console.log("Checking for fill", x, y);
        // Nếu nơi khối chuyển đến không còn rỗng thì không được phép di chuyển
        for (let row = 0; row < numRow; row++) {
            for (let column = columnStart; column < numCol; column++) {
                blockOfShape = form[row][column];

                if (blockOfShape !== "k") {
                    try {
                        blockOfBoard = this.board[y + row][x + column];
                    } catch (e) {
                        return false;
                    }
                    if (blockOfBoard !== "k") {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    clearAtLastPosition() {
        // console.log("clearAtPosition");

        let x = this.lastPosition.x;
        let y = this.lastPosition.y;

        // let x = this.position.x;
        // let y = this.position.y;

        let form = this.currentShape.getForm();
        let numRow = form.length;
        let numCol = form[0].length;
        let blockOfShape;

        for (let row = 0; row < numRow; row++) {
            for (let column = 0; column < numCol; column++) {
                blockOfShape = form[row][column];

                if (blockOfShape !== "k") {
                    this.board[y + row][x + column] = "k";
                }
            }
        }
    }

    isBlockGray(block) {
        return block === "g";
    }

    checkClearRow() {
        let result;
        let row = -1;
        for (let i = this.board.length - 1; i > 0; i--) {
            result = this.board[i].every((value) => !this.isBlockBlack(value));
            if (result) {
                this.board[i] = [...rowg];
                if (i > row) {
                    row = i;
                }
            }
        }
        this.rowGray = row;
        return row;
    }

    checkEnd() {
        let check;
        for (let i = -1; i >= -3; i--) {
            check = this.board[i].every(this.isBlockBlack);
            if (!check) {
                // console.log("END GAME OVER");
                return true;
            }
        }
        return false;
    }

    isBlockBlack(block) {
        return block === "k";
    }

    endGame() {
        this.setGameOnGoing(false);
    }

    check(call) {
        this.setGameOnGoing = call;
    }

    getRandInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    getRowData(index) {
        return this.board[index];
    }
}