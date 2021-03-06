import {
    FourInARowEvent
} from "../models/FourInARowEvent.js";

export class FourInARowView {
    constructor(data) {
        this.data = data;
        this.data.addEventListener(FourInARowEvent.CHANGED, this.Changed);

    }

    bindStartButton() {//als de game start veranderd de style en haald hij de namen in
        this.form = document.querySelector("#playerdata");
        this.form.addEventListener("submit", (event) => {
            event.preventDefault();
            this.data.data.player1Name = document.querySelector("#player1").value;
            this.data.data.player2Name = document.querySelector("#player2").value;
            document.querySelector("#player1name").innerHTML = this.data.data.player1Name + ": ";
            document.querySelector("#player2name").innerHTML = this.data.data.player2Name + ": ";
            document.getElementById("grid-container").style.visibility = "visible";
            document.getElementById("start").style.display = "none";
        });
    }

    drwawGame(handler) { //hij tekent de board en player score
        document.getElementById("gameOver").style.display = "none";
        if (this.data.player1Score === undefined) {} else {
            document.querySelector("#player1Score").innerHTML = this.data.player1Score;
            document.querySelector("#player2Score").innerHTML = this.data.player2Score;
        }
        for (let id = 0; id < 42; id++) {
            document.querySelector("board").insertAdjacentHTML("beforeend", `<div id='${id}' class='board-item'></div>`);
            let box = document.getElementById(id);
            box.addEventListener("click", () => {
                handler({
                    id
                });

            });
        }
    }

    Changed = event => {
        this.data = event.currentTarget.data
        this.gameOver();
        this.drawMove();

    };

    drawMove() { // tekent een move
        for (let y = 0; y <= 5; y++) {
            for (let x = 0; x <= 6; x++) {
                let box = document.getElementById(y * 7 + x);
                if (this.data.board[y][x] == 1) {
                    box.style.backgroundColor = "yellow";

                } else if (this.data.board[y][x] == 2) {
                    box.style.backgroundColor = "red";

                }
            }
        }
    }

    gameOver() {//laat het gameover scherm zien
        if (this.data.currentPlayer === this.data.gameStatus || this.data.gameStatus === "Tie") {
            document.getElementById("gameOver").style.display = 'block';
            let text = document.querySelector('#gameOverText');
            if (this.data.gameStatus == "tie") {
                text.innerHTML = "TIED";
            } else {
                if (this.data.gameStatus == 1) {
                    text.innerHTML = "Congratulations " + this.data.player1Name + ", you won the game.";
                    this.data.player1Score++;
                } else if (this.data.gameStatus == 2) {
                    text.innerHTML = "Congratulations " + this.data.player1Name + ", you won the game.";
                    this.data.player2Score++;
                }
                for (let y = 0; y <= 5; y++) {
                    for (let x = 0; x <= 6; x++) {
                        let match = false;
                        let i = 1;
                        let id = y * 7 + x;
                        while (!match) {
                            if (this.data.winingRow[i][0] == y && this.data.winingRow[i][1] == x) {
                                document.getElementById(id).style.opacity = '1';
                                match = true;
                            } else {
                                document.getElementById(id).style.opacity = '0.6';
                            }
                            if (i === 4) {
                                match = true;
                            }
                            i++;
                        }
                    }
                }
            }
        }
    }

    rematchButton(handler) {//verwijderd het board
        document.getElementById("rematch").addEventListener("click", () => {
            for (let i = 0; i < 42; i++) {
                document.getElementById(i).remove();
            }
            handler();
        })
    }
}