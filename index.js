const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');

let field = [[EMPTY, EMPTY, EMPTY],
             [EMPTY, EMPTY, EMPTY],
             [EMPTY, EMPTY, EMPTY]];

let turn = 0;

startGame();
addResetListener();

function startGame () {
    renderGrid(3);
}

function renderGrid (dimension) {
    container.innerHTML = '';

    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < dimension; j++) {
            const cell = document.createElement('td');
            cell.textContent = EMPTY;
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function cellClickHandler (row, col) {
    if (field[col][row] !== EMPTY) return;

    if (turn % 2 === 0) {
        field[col][row] = CROSS;
        renderSymbolInCell(CROSS, row, col);
    } else {
        field[col][row] = ZERO;
        renderSymbolInCell(ZERO, row, col);
    }

    turn++;

    console.log(`Clicked on cell: ${row}, ${col}`);

    checkWinner();

    if (!field.flat().includes(EMPTY)){
        alert("Победила дружба");
    }

    /* Пользоваться методом для размещения символа в клетке так:
        renderSymbolInCell(ZERO, row, col);
     */
}

function checkWinner()
{
    let counter = 0;

    for (let i = 0; i < 3; i ++) {
        counter = 0;
        
        if (field[i][0] === EMPTY) {
            continue;
        }

        for (let j = 0; j < 2; j++){
            
            if (field[i][j] === field[i][j+1]) {
                counter++;
            }
        }
        
        if (counter === 2){
            alert(field[0][i]);
        }
    }

    for (let i = 0; i < 3; i ++) {
        counter = 0;
        
        if (field[0][i] === EMPTY) {
            continue;
        }

        for (let j = 0; j < 2; j++){
            
            if (field[j][i] === field[j+1][i]) {
                counter++;
            }
        }
        
        if (counter === 2){
            alert(field[0][i]);
        }
    }
    
    if (field[0][0] !== EMPTY) {
        counter = 0;

        for (let i = 0; i < 2; i++) {
            if (field[i][i] === field[i+1][i+1]) {
                counter++;
            }
        }

        if (counter === 2){
            alert(field[0][0]);
        }
    }

    
    if (field[2][0] !== EMPTY) {
        counter = 0;
        for (let i = 0; i < 2; i++) {
            
            if (field[2-i][i] === field[1-i][i+1]) {
                counter++;
            }
        }
        
        if (counter === 2){
            alert(field[2][0]);
        }
    }
}

function renderSymbolInCell (symbol, row, col, color = '#333') {
    const targetCell = findCell(row, col);

    targetCell.textContent = symbol;
    targetCell.style.color = color;
}

function findCell (row, col) {
    const targetRow = container.querySelectorAll('tr')[row];
    return targetRow.querySelectorAll('td')[col];
}

function addResetListener () {
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', resetClickHandler);
}

function resetClickHandler () {
    console.log('reset!');
}


/* Test Function */
/* Победа первого игрока */
function testWin () {
    clickOnCell(0, 2);
    clickOnCell(0, 0);
    clickOnCell(2, 0);
    clickOnCell(1, 1);
    clickOnCell(2, 2);
    clickOnCell(1, 2);
    clickOnCell(2, 1);
}

/* Ничья */
function testDraw () {
    clickOnCell(2, 0);
    clickOnCell(1, 0);
    clickOnCell(1, 1);
    clickOnCell(0, 0);
    clickOnCell(1, 2);
    clickOnCell(1, 2);
    clickOnCell(0, 2);
    clickOnCell(0, 1);
    clickOnCell(2, 1);
    clickOnCell(2, 2);
}

function clickOnCell (row, col) {
    findCell(row, col).click();
}
