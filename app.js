class TicTacToe{

    #playerOneSign; 

    constructor(sign){
        this.#playerOneSign = sign;
    }

    xOrO(btn){
        btn.addEventListener('click', () => {
            if(btn.classList.contains('x-sign')){
                this.#giveSelection(btn);
                this.#playerOneSign = 'x';
                this.#isX();
            }else{
                this.#giveSelection(btn);
                this.#playerOneSign = 'o';
                this.#isX();
            }
        });
    };

    #giveSelection(btn){
        if(btn.classList.contains('x-sign') && !btn.classList.contains('selected')){
            const oBtn = document.querySelector('.o-sign');
            oBtn.classList.remove('selected');
            btn.classList.add('selected');
        }else{
            const xBtn = document.querySelector('.x-sign');
            xBtn.classList.remove('selected');
            btn.classList.add('selected');
        }
    };

    #isX(){
        let x = this.#playerOneSign === 'x';
        console.log(x);
    };

    startGame(){
        const startScreen = document.querySelector('.start-screen');
        const gameScreen = document.querySelector('.main-screen');
        startScreen.classList.add('hide');
        gameScreen.classList.remove('hide');
    }

    #changeTurn(){
        const turn = document.querySelector('.turn');
        if(turn.textContent === 'X TURN'){
            turn.textContent = 'O TURN';
        }else{
            turn.textContent = 'X TURN';
        }
    }
};

const newGame = new TicTacToe('x');

const playerOneSign = document.querySelectorAll('.selection-btn');
playerOneSign.forEach((btn) => {
    newGame.xOrO(btn);
});

const startGame = document.querySelector('.start-game');
startGame.addEventListener('click', () => {
    newGame.startGame();
});