const size = 25;

function Block(num) {
    let blocks = [];
    for (let i = 0; i < num; i++) {
        blocks.push(`
        <div class="block black"></div>`);
    }

    return blocks.join("\n");
}

function Row(num) {
    let rows = [];

    for (let i = 0; i < num; i++) {
        rows.push(`
            <div class="row">
                ${Block(num)}
            </div>
        `);
    }

    rows.push(`
    <div id='modal'>
        <button type="button" id="start-game">Start</button>
        <button type="button" id="resume-game">Resume</button>
    </div>
    `);
    return rows.join("\n");
}

let board = document.getElementById("main-board");
board.innerHTML = Row(size);
