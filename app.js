// class TicTacToe{

//     #playerOneSign; 
//     #gameBoard; 

//     constructor(sign){
//         this.#playerOneSign = sign;
//         this.#gameBoard = [
//             [], [], [],
//             [], [], [],
//             [], [], []
//         ]
//     }

//     xOrO(btn){
//         btn.addEventListener('click', () => {
//             if(btn.classList.contains('x-sign')){
//                 this.#giveSelection(btn);
//                 this.#playerOneSign = 'x';
//                 this.#isX();
//             }else{
//                 this.#giveSelection(btn);
//                 this.#playerOneSign = 'o';
//                 this.#isX();
//             }
//         });
//     };

//     #giveSelection(btn){
//         if(btn.classList.contains('x-sign') && !btn.classList.contains('selected')){
//             const oBtn = document.querySelector('.o-sign');
//             oBtn.classList.remove('selected');
//             btn.classList.add('selected');
//         }else{
//             const xBtn = document.querySelector('.x-sign');
//             xBtn.classList.remove('selected');
//             btn.classList.add('selected');
//         }
//     };

//     #isX(){
//         let x = this.#playerOneSign === 'x';
//         console.log(x);
//     };

//     startGame(){
//         const startScreen = document.querySelector('.start-screen');
//         const gameScreen = document.querySelector('.main-screen');
//         startScreen.classList.add('hide');
//         gameScreen.classList.remove('hide');
//     }

//     #changeTurn(){
//         const turn = document.querySelector('.turn');
//         if(turn.textContent === 'X TURN'){
//             turn.textContent = 'O TURN';
//         }else{
//             turn.textContent = 'X TURN';
//         }
//     }

//     //TODO: fix this!!
//     illustMark(grid){
//         if(this.#isX){
//             // grid.classList.add('.hoverX');
//             console.log(grid.target.className);
//             let element = grid.target.className;
//             element += ' hoverX'
//         }
//     }

//     putMark(grid){
//         if(this.#isX){
//             console.log(grid.className);
//         }
//     }
// };

// const newGame = new TicTacToe('x');

// const playerOneSign = document.querySelectorAll('.selection-btn');
// playerOneSign.forEach((btn) => {
//     newGame.xOrO(btn);
// });

// const startGame = document.querySelector('.start-game');
// startGame.addEventListener('click', () => {
//     newGame.startGame();
// });


// //TODO: Don't forget to fix the hovering animation
// // const eachCell = document.querySelectorAll('.grid');
// // eachCell.forEach((cell) => {
// //     cell.addEventListener('mouseover', (grid) => {
// //         newGame.illustMark(grid);
// //     })
// // })

// const eachCell = document.querySelectorAll('.grid');
// eachCell.forEach((cell) => {
//     cell.addEventListener('click', (grid) => {
//         newGame.putMark(grid);
//     })    
// })

class TicTacToe {
    #playerOneSign;
    #currentPlayer;
    #gameBoard;

    constructor(sign) {
        this.#playerOneSign = sign;
        this.#currentPlayer = sign;
        this.#gameBoard = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];
    }

    xOrO(btn) {
        btn.addEventListener('click', () => {
            if (!btn.classList.contains('selected')) {
                this.#giveSelection(btn);
                this.#currentPlayer = this.#currentPlayer === 'x' ? 'o' : 'x';
                this.#isX();
            }
        });
    }

    #giveSelection(btn) {
        const xBtn = document.querySelector('.x-sign');
        const oBtn = document.querySelector('.o-sign');

        if (btn === xBtn) {
            oBtn.classList.remove('selected');
        } else {
            xBtn.classList.remove('selected');
        }

        btn.classList.add('selected');
    }

    #isX() {
        let x = this.#currentPlayer === 'x';
        console.log(x);
    }

    startGame() {
        const startScreen = document.querySelector('.start-screen');
        const gameScreen = document.querySelector('.main-screen');
        startScreen.classList.add('hide');
        gameScreen.classList.remove('hide');
        this.resetBoard();
    }

    resetBoard() {
        this.#gameBoard = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];
        this.#currentPlayer = this.#playerOneSign;
        this.#updateTurnText();
        this.#clearGrid();
    }

    #updateTurnText() {
        const turn = document.querySelector('.turn');
        turn.textContent = `${this.#currentPlayer.toUpperCase()} TURN`;
    }

    #clearGrid() {
        const cells = document.querySelectorAll('.grid');
        cells.forEach((cell) => {
            cell.textContent = '';
            cell.classList.remove('x', 'o');
        });
    }

    #checkForWin(player) {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (
                this.#gameBoard[a] === player &&
                this.#gameBoard[b] === player &&
                this.#gameBoard[c] === player
            ) {
                return true;
            }
        }
        return false;
    }

    #checkForTie() {
        return this.#gameBoard.flat().every((cell) => cell !== '');
    }

    illustMark(grid) {
        if (grid.target.classList.contains('grid') && !grid.target.classList.contains('x') && !grid.target.classList.contains('o')) {
            grid.target.classList.add(`hover${this.#currentPlayer.toUpperCase()}`);
        }
    }

    putMark(grid) {
        if (grid.target.classList.contains('grid') && !grid.target.classList.contains('x') && !grid.target.classList.contains('o')) {
            const cellIndex = parseInt(grid.target.classList[1]) - 1;
            const row = Math.floor(cellIndex / 3);
            const col = cellIndex % 3;

            this.#gameBoard[row][col] = this.#currentPlayer;
            grid.target.classList.add(this.#currentPlayer);
            grid.target.classList.remove(`hover${this.#currentPlayer.toUpperCase()}`);

            if (this.#checkForWin(this.#currentPlayer)) {
                this.#endGame(`${this.#currentPlayer.toUpperCase()} WINS!`);
            } else if (this.#checkForTie()) {
                this.#endGame('TIE!');
            } else {
                this.#currentPlayer = this.#currentPlayer === 'x' ? 'o' : 'x';
                this.#updateTurnText();
            }
        }
    }

    #endGame(message) {
        setTimeout(() => {
            alert(message);
            this.resetBoard();
        }, 100);
    }
}

const newGame = new TicTacToe('x');

const playerOneSign = document.querySelectorAll('.selection-btn');
playerOneSign.forEach((btn) => {
    newGame.xOrO(btn);
});

const startGame = document.querySelector('.start-game');
startGame.addEventListener('click', () => {
    newGame.startGame();
});

const eachCell = document.querySelectorAll('.grid');
eachCell.forEach((cell) => {
    cell.addEventListener('mouseover', (grid) => {
        newGame.illustMark(grid);
    });
    cell.addEventListener('click', (grid) => {
        newGame.putMark(grid);
    });
});

const resetButton = document.querySelector('.reset');
resetButton.addEventListener('click', () => {
    newGame.resetBoard();
});
