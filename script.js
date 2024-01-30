let gameOver = false;
let currentPlayer = "X";
let header = document.getElementsByTagName("h1")[0];

var cols = Array.from(document.getElementsByClassName("col"));
var rows = Array.from(document.getElementsByClassName("row"));


for (let col of cols) {
    col.addEventListener("click", e => {
        if (!gameOver) {
            col.innerHTML = "<div style='position: absolute; top: 50%; left: 50%;'>" + currentPlayer + "</div>";
            if (checkIfGameOver(e)) return;
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            header.innerHTML = "Player " + currentPlayer + " turn";
        }
    })
}

const checkIfGameOver = (e) => {
    if (playerWon(e)) {
        header.innerHTML = "Game over! Player " + currentPlayer + " won!";
        gameOver = true;
        return true;
    }
};

const playerWon = (e) => {
    const rowsAmount = rows.length;
    const colsAmount = cols.length / rowsAmount;

    const currentIndex = cols.findIndex(x => x === e.target);
    // check left to right
    if (cols[currentIndex - 1] !== undefined && cols[currentIndex].innerHTML === cols[currentIndex - 1].innerHTML && cols[currentIndex + 1] !== undefined && cols[currentIndex].innerHTML === cols[currentIndex + 1].innerHTML) {
        return true;
    }

    // check left and left
    if (cols[currentIndex - 1] !== undefined && cols[currentIndex].innerHTML === cols[currentIndex - 1].innerHTML && cols[currentIndex - 2] !== undefined &&  cols[currentIndex].innerHTML === cols[currentIndex - 2].innerHTML) {
        return true;
    }

    // check right and right
    if (cols[currentIndex + 1] !== undefined && cols[currentIndex].innerHTML === cols[currentIndex + 1].innerHTML && cols[currentIndex + 2] !== undefined && cols[currentIndex].innerHTML === cols[currentIndex + 2].innerHTML) {
        return true;
    }

    // Check upper to bottom
    if (cols[currentIndex - colsAmount] !== undefined && cols[currentIndex].innerHTML === cols[currentIndex - colsAmount].innerHTML && cols[currentIndex + colsAmount] !== undefined && cols[currentIndex].innerHTML === cols[currentIndex + colsAmount].innerHTML) {
        return true;
    }

    // Check upper and upper
    if (cols[currentIndex - colsAmount] !== undefined && cols[currentIndex].innerHTML === cols[currentIndex - colsAmount].innerHTML && cols[currentIndex - 2 * colsAmount] !== undefined && cols[currentIndex].innerHTML === cols[currentIndex - 2 * colsAmount].innerHTML) {
        return true;
    }

    // Check bottom and bottom
    if (cols[currentIndex + colsAmount] !== undefined && cols[currentIndex].innerHTML === cols[currentIndex + colsAmount].innerHTML && cols[currentIndex + 2 * colsAmount] !== undefined && cols[currentIndex].innerHTML === cols[currentIndex +  2 * colsAmount].innerHTML) {
        return true;
    }

    // Check left upper to right bottom
    if (cols[currentIndex - colsAmount - 1] !== undefined && cols[currentIndex].innerHTML === cols[currentIndex - colsAmount - 1].innerHTML && cols[currentIndex + colsAmount + 1] !== undefined && cols[currentIndex].innerHTML === cols[currentIndex + colsAmount + 1].innerHTML) {
        return true;
    }

    // Check left upper and left upper
    if (cols[currentIndex - colsAmount - 1] !== undefined && cols[currentIndex].innerHTML === cols[currentIndex - colsAmount - 1].innerHTML && cols[currentIndex - 2 * colsAmount - 2] !== undefined && cols[currentIndex].innerHTML === cols[currentIndex -  2 * colsAmount - 2].innerHTML) {
        return true;
    }

    // Check right bottom and right bottom
    if (cols[currentIndex + colsAmount + 1] !== undefined && cols[currentIndex].innerHTML === cols[currentIndex + colsAmount + 1].innerHTML && cols[currentIndex + 2 * colsAmount + 2] !== undefined && cols[currentIndex].innerHTML === cols[currentIndex +  2 * colsAmount + 2].innerHTML) {
        return true;
    }

    // Check left bottom to right upper
    if (cols[currentIndex + colsAmount - 1] !== undefined && cols[currentIndex].innerHTML === cols[currentIndex + colsAmount - 1].innerHTML && cols[currentIndex - colsAmount + 1] !== undefined && cols[currentIndex].innerHTML === cols[currentIndex - colsAmount + 1].innerHTML) {
        return true;
    }

    // Check left bottom and left bottom
    if (cols[currentIndex + colsAmount - 1] !== undefined && cols[currentIndex].innerHTML === cols[currentIndex + colsAmount - 1].innerHTML && cols[currentIndex + 2 * colsAmount - 2] !== undefined && cols[currentIndex].innerHTML === cols[currentIndex +  2 * colsAmount - 2].innerHTML) {
        return true;
    }

    // Check right upper and right upper
    if (cols[currentIndex - colsAmount + 1] !== undefined && cols[currentIndex].innerHTML === cols[currentIndex - colsAmount + 1].innerHTML && cols[currentIndex - 2 * colsAmount + 2] !== undefined && cols[currentIndex].innerHTML === cols[currentIndex -  2 * colsAmount + 2].innerHTML) {
        return true;
    }

    return false;
};