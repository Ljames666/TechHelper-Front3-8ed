"use strict";
document.addEventListener('DOMContentLoaded', () => {
    // TODO: obter o tamanho da grade do usuario
    const GRID_WIDTH = 10;
    const GRID_HEIGHT = 20;
    const GRID_SIZE = GRID_WIDTH * GRID_HEIGHT;
    // não tem necessidade de digitar 200 divs por exemplo
    const grid = createGrid();
    let squares = Array.from(grid.querySelectorAll('div'));
    const startBtn = document.querySelector('.button');
    const reStartBtn = document.querySelector('.button2');
    const hamburgerBtn = document.querySelector('.toggler');
    const menu = document.querySelector('.menu');
    const span = document.getElementsByClassName('close')[0];
    const scoreDisplay = document.querySelector('.score-display');
    const linesDisplay = document.querySelector('.lines-score');
    let currentIndex = 0;
    let currentRotation = 0;
    const width = 10;
    let score = 0;
    let lines = 0;
    let timerId;
    let nextRandom = 0;
    const colors = [
        'url(images/blue_block.png)',
        'url(images/pink_block.png)',
        'url(images/purple_block.png)',
        'url(images/peach_block.png)',
        'url(images/yellow_block.png)',
    ];
    function createGrid() {
        // grid principal
        let grid = document.querySelector('.grid');
        for (let i = 0; i < GRID_SIZE; i++) {
            let gridElement = document.createElement('div');
            grid.appendChild(gridElement);
        }
        // setar a base do grid
        for (let index = 0; index < GRID_WIDTH; index++) {
            let gridElement = document.createElement('div');
            gridElement.setAttribute('class', 'block3');
            grid.appendChild(gridElement);
        }
        let previousGrid = document.querySelector('.previous-grid');
        // já que 16 é o tamanho máximo do grid em que tá todos tetrominos
        // criamos um grid aqui que pode caber em previousGrid
        for (let i = 0; i < 16; i++) {
            let gridElement = document.createElement('div');
            previousGrid.appendChild(gridElement);
        }
        return grid;
    }
    // atribuir funções aos códigos de teclas
    function control(e) {
        if (e.key === 'ArrowRight' || e.key === 'd')
            moveRight();
        if (e.key === 'ArrowUp' || e.key === 'w')
            rotate();
        if (e.key === 'ArrowLeft' || e.key === 'a')
            moveLeft();
        if (e.key === 'ArrowDown' || e.key === 's')
            moveDown();
    }
    document.addEventListener('keydown', control);
    // Os Tetrominos
    const lTetromino = [
        [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, 2],
        [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 2],
        [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 2],
        [GRID_WIDTH, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1, GRID_WIDTH * 2 + 2],
    ];
    const zTetromino = [
        [0, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1],
        [GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1],
        [0, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1],
        [GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1],
    ];
    const tTetromino = [
        [1, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2],
        [1, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 1],
        [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 1],
        [1, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1],
    ];
    const oTetromino = [
        [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
        [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
        [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
        [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
    ];
    const iTetromino = [
        [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 3 + 1],
        [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH + 3],
        [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 3 + 1],
        [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH + 3],
    ];
    const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino];
    // Seleção randomica dos tetrominos
    let random = Math.floor(Math.random() * theTetrominoes.length);
    let current = theTetrominoes[random][currentRotation];
    // move pra baixo
    let currentPosition = 4;
    // desenhar a forma
    function draw() {
        current.forEach((index) => {
            squares[currentPosition + index].classList.add('block');
            squares[currentPosition + index].style.backgroundImage = colors[random];
        });
    }
    //desfazer a forma
    function unDraw() {
        current.forEach((index) => {
            squares[currentPosition + index].classList.remove('block');
            squares[currentPosition + index].style.backgroundImage = 'none';
        });
    }
    function moveDown() {
        unDraw();
        currentPosition += width;
        draw();
        freeze();
    }
    startBtn.addEventListener('click', () => {
        if (timerId) {
            clearTimeout(timerId);
            timerId = undefined;
        }
        else {
            draw();
            timerId = setInterval(moveDown, 1000);
            nextRandom = Math.floor(Math.random() * theTetrominoes.length);
            displayShape();
        }
    });
    reStartBtn.addEventListener('click', () => location.reload());
    // mover pra esqueda
    function moveLeft() {
        unDraw();
        const isAtleftEdge = current.some((index) => (currentPosition + index) % width === 0);
        if (!isAtleftEdge)
            currentPosition -= 1;
        if (current.some((index) => squares[currentPosition + index].classList.contains('block2'))) {
            currentPosition += 1;
        }
        draw();
    }
    function moveRight() {
        unDraw();
        const isAtRightEdge = current.some((index) => (currentPosition + index) % width === width - 1);
        if (!isAtRightEdge)
            currentPosition += 1;
        if (current.some((index) => squares[currentPosition + index].classList.contains('block2'))) {
            currentPosition -= 1;
        }
        draw();
    }
    //congelar a forma
    function freeze() {
        if (current.some((index) => squares[currentPosition + index + width].classList.contains('block3') ||
            squares[currentPosition + index + width].classList.contains('block2'))) {
            // faz o bloqueio2
            /*
      achei o erro
      current.forEach((index) => squares[index + currentPosition].classList.contains('block2'));
      */
            current.forEach((index) => squares[index + currentPosition].classList.add('block2')); // <- certo
            // inicia um novo tetrimino
            random = nextRandom;
            nextRandom = Math.floor(Math.random() * theTetrominoes.length);
            current = theTetrominoes[random][currentRotation];
            currentPosition = 4;
            draw();
            displayShape();
            addScore();
            gameOver();
        }
    }
    freeze();
    // rotacionar a peça
    function rotate() {
        unDraw();
        currentRotation++;
        if (currentRotation === current.length) {
            currentRotation = 0;
        }
        current = theTetrominoes[random][currentRotation];
        draw();
    }
    // função fim de jogo
    function gameOver() {
        if (current.some((index) => squares[currentPosition + index].classList.contains('block2'))) {
            scoreDisplay.innerHTML = 'end';
            clearInterval(timerId);
        }
    }
    //mostra a peça proxima no display score
    const displayWidth = 4;
    const displaySquares = document.querySelectorAll('.previous-grid div');
    let displayIndex = 0;
    const smallTetriminoes = [
        [1, displayWidth + 1, displayWidth * 2 + 1, 2] /* lTetromino */,
        [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1] /* zTetromino */,
        [1, displayWidth, displayWidth + 1, displayWidth + 2] /* tTetromino */,
        [0, 1, displayWidth, displayWidth + 1] /* oTetromino */,
        [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1] /* iTetromino */,
    ];
    function displayShape() {
        displaySquares.forEach((square) => {
            square.classList.remove('block');
            square.style.backgroundImage = 'none';
        });
        smallTetriminoes[nextRandom].forEach((index) => {
            displaySquares[displayIndex + index].classList.add('block');
            displaySquares[displayIndex + index].style.backgroundImage = colors[nextRandom];
        });
    }
    // add score
    function addScore() {
        for (currentIndex = 0; currentIndex < GRID_SIZE; currentIndex += GRID_WIDTH) {
            const row = [
                currentIndex,
                currentIndex + 1,
                currentIndex + 2,
                currentIndex + 3,
                currentIndex + 4,
                currentIndex + 5,
                currentIndex + 6,
                currentIndex + 7,
                currentIndex + 8,
                currentIndex + 9,
            ];
            if (row.every((index) => squares[index].classList.contains('block2'))) {
                score += 10;
                lines += 1;
                scoreDisplay.innerHTML = String(score);
                linesDisplay.innerHTML = String(lines);
                row.forEach((index) => {
                    squares[index].style.backgroundImage = 'none';
                    squares[index].classList.remove('block2') || squares[index].classList.remove('block');
                });
                //splice n array
                const squaresRemoved = squares.splice(currentIndex, width);
                squares = squaresRemoved.concat(squares); // [...squares,squaresRemoved]
                squares.forEach((cell) => grid.appendChild(cell));
            }
        }
    }
    //estilizar os ouvintes( eventListeners)
    hamburgerBtn.addEventListener('click', () => {
        menu.style.display = 'flex';
    });
    span.addEventListener('click', () => {
        menu.style.display = 'none';
    });
});
