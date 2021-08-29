function Block(type, color = "black") {
    return `
        <div class="block ${color} ${type ? '' : 'no-shadow'} ${type ? '' : 'small'}"></div>
    `;
}

function Row(numBlock, type) {
    let blocks = [];
    for (let i = 0; i < numBlock; i++) {
        blocks.push(Block(type));
    }
    return `
        <div class="row">
            ${blocks.join("\n")}
        </div>
    `;
}

function MainBoard(numRow, numBlock, type = 1) {
    let rows = [];
    for (let i = 0; i < numRow; i++) {
        rows.push(Row(numBlock, type));
    }
    if (type === 1) {
        rows.push("<div id=modal><button type='button' id='start-game'>Start</button><button type='button' id='resume-game'>Resume</button></div>");
    }
    // rows.push("");
    return rows.join("\n");
}


let main = document.getElementById("main-board");
main.children[0].innerHTML = MainBoard(20, 10);
let right = document.getElementById("right-board");
right.children[0].innerHTML = MainBoard(25, 5, 0);
let left = document.getElementById("left-board");
left.children[0].innerHTML = MainBoard(6, 5, 0);




