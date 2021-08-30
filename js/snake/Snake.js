// quy dinh shift la head, pop la tail

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

const prohibit = {
    ArrowUp: "ArrowDown",
    ArrowDown: "ArrowUp",
    ArrowRight: "ArrowLeft",
    ArrowLeft: "ArrowRight",
};

class Snake {
    constructor(size) {
        this.chain = [{ x: 2, y: 2 }];
        // Danh sach cac moi duoc an. Chuan bi duoc noi vao
        this.queue = [];
        // y la row, x la column
        this.directions = {
            ArrowUp: { x: 0, y: -1 },
            ArrowDown: { x: 0, y: 1 },
            ArrowRight: { x: 1, y: 0 },
            ArrowLeft: { x: -1, y: 0 },
        };

        this.d = "ArrowRight";
        this.size = size - 1;

        this.bait = this.randomBait();
    }

    setDirectory(dir) {
        if (this.chain.length >= 3) {
            console.log("setDirectory: " + prohibit[dir], this.d);
            if (prohibit[dir] !== this.d) {
                this.d = dir;
            }
        } else {
            this.d = dir;
        }
    }

    reset() {
        this.chain = [{ x: 2, y: 2 }];
        this.queue = [];
        this.d = "ArrowRight";
        this.bait = this.randomBait();
    }

    newHead() {
        let head = { ...this.chain[0] };

        let d = this.directions[this.d];
        head.x += d.x;
        head.y += d.y;

        if (head.x < 0) head.x = this.size - 1;
        if (head.y < 0) head.y = this.size - 1;
        if (head.x > this.size) head.x = 0;
        if (head.y > this.size) head.y = 0;

        return head;
    }

    move() {
        let newHead = this.newHead();

        this.chain.unshift(newHead);

        // Khi head an duoc bait -> dua vao hang doi tieu hao
        if (this.equalPosition(newHead, this.bait)) {
            this.queue.push(this.bait);
            this.bait = this.randomBait();
        }

        // Neu tail == head of this.queue -> bait đã tiêu hoá xong
        // -> New tail = head of this.queue
        if (
            this.equalPosition(this.chain[this.chain.length - 1], this.queue[0])
        ) {
            this.chain.push(this.queue.shift());
        }

        return this.chain.pop();
    }

    equalPosition(p1, p2) {
        if (!(p1 && p2)) {
            return false;
        }
        return p1.x == p2.x && p1.y == p2.y;
    }

    randomBait() {
        let bait;
        let check = true;
        let len = this.chain.length;

        while (check) {
            bait = { x: randInt(0, this.size), y: randInt(0, this.size) };
            check = false;

            for (let i = 0; i < len; i++) {
                if (this.equalPosition(bait, this.chain[i])) {
                    check = true;
                    break;
                }
            }
        }
        return bait;
    }
}
