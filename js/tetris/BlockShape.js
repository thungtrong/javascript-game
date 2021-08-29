const colorsCanUse = ["r", "b", "a", "v", "o", "y"];

class ShapeBlock {
    constructor(forms, color = "r", currentForm=0) {
        this.forms = forms;
        this.currentForm = currentForm;
        this.color = color;
    }

    rotateRight() {
        this.currentForm = (this.currentForm + 1) % this.forms.length;
    }
    rotateLeft() {
        this.currentForm =
            this.currentForm == 0
                ? this.forms.length - 1
                : this.currentForm - 1;
    }

    getForm() {
        return this.forms[this.currentForm];
    }

    getFormFullFill(){
        let tmp = [...this.forms[this.currentForm]];
        let rows = tmp.length;
        let cols = tmp[0].length;
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                tmp[row][col] = tmp[row][col] !== "k" ? this.color : "k";
            }
        }
        return tmp;
    }
    
    
    getNumForm() {
        return this.forms.length;
    }

    getColor() {
        return this.color;
    }

    getNumColumn() {
        return this.forms[0][0].length;
    }

    pickRandomShape() {
        let i = Math.floor(Math.random() * colorsCanUse.length);
        this.color = colorsCanUse[i];
        
        this.currentForm = Math.floor(Math.random() * this.forms.length);
        return new ShapeBlock(this.forms, this.color, this.currentForm);
    }

}

const square = new ShapeBlock([
    [
        ["k", "k", "k"],
        ["k", "x", "x"],
        ["k", "x", "x"],
    ],
]);

const t = new ShapeBlock([
    [
        ["k", "k", "k"],
        ["x", "x", "x"],
        ["k", "x", "k"],
    ],
    [
        ["k", "k", "x"],
        ["k", "x", "x"],
        ["k", "k", "x"],
    ],
    [
        ["k", "k", "k"],
        ["k", "x", "k"],
        ["x", "x", "x"],
    ],
    [
        ["k", "x", "k"],
        ["k", "x", "x"],
        ["k", "x", "k"],
    ],
]);

const z1 = new ShapeBlock([
    [
        ["k", "k", "k"],
        ["k", "x", "x"],
        ["x", "x", "k"],
    ],
    [
        ["k", "x", "k"],
        ["k", "x", "x"],
        ["k", "k", "x"],
    ],
]);

const z2 = new ShapeBlock([
    [
        ["k", "k", "k"],
        ["x", "x", "k"],
        ["k", "x", "x"],
    ],
    [
        ["k", "k", "x"],
        ["k", "x", "x"],
        ["k", "x", "k"],
    ],
]);

const l1 = new ShapeBlock([
    [
        ["k", "x", "k"],
        ["k", "x", "k"],
        ["k", "x", "x"],
    ],
    [
        ["k", "k", "k"],
        ["x", "x", "x"],
        ["x", "k", "k"],
    ],
    [
        ["k", "x", "x"],
        ["k", "k", "x"],
        ["k", "k", "x"],
    ],
    [
        ["k", "k", "k"],
        ["k", "k", "x"],
        ["x", "x", "x"],
    ],
]);

const l2 = new ShapeBlock([
    [
        ["k", "k", "x"],
        ["k", "k", "x"],
        ["k", "x", "x"],
    ],
    [
        ["k", "k", "k"],
        ["x", "k", "k"],
        ["x", "x", "x"],
    ],
    [
        ["k", "x", "x"],
        ["k", "x", "k"],
        ["k", "x", "k"],
    ],
    [
        ["k", "k", "k"],
        ["x", "x", "x"],
        ["k", "k", "x"],
    ],
]);

i = new ShapeBlock([
    [
        ["k", "x"],
        ["k", "x"],
        ["k", "x"],
        ["k", "x"],
    ],
    [
        ["k", "k", "k", "k"],
        ["x", "x", "x", "x"],
    ],
]);

const shapeBlocks = [square, t, z1, z2, l1, l2, i];
