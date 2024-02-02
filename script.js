let gameOver = false;
let currentPlayer = "X";
let header = document.getElementsByTagName("h1")[0];
let leftAlign = 45;
let upperAlign = 40;

var cols = Array.from(document.getElementsByClassName("col"));
var rows = Array.from(document.getElementsByClassName("row"));


for (let col of cols) {
    col.addEventListener("click", e => handleClick(e));
}

const addLeftCol = () => {
    var rows = Array.from(document.getElementsByClassName("row"));
    leftAlign -= 3.1;

    for (let row of rows) {
        var col = document.createElement("div");
        col.classList = "col";
        row.insertBefore(col, row.firstChild);
        col.addEventListener("click", e => handleClick(e));
        col.style = "margin: 3px 3.7px;"
    }
    document.getElementById("board").style = "left: " + leftAlign + "%;";

}

const addRightCol = () => {
    var rows = Array.from(document.getElementsByClassName("row"));

    for (let row of rows) {
        var col = document.createElement("div");
        col.classList = "col";
        row.append(col);
        col.style = "margin: 3px 3.7px;"
        col.addEventListener("click", e => handleClick(e));
    }
}

const addUpperRow = () => {
    upperAlign -= 5.9;

    var row = document.createElement("div");
    row.classList = "row";
    document.getElementById("board").insertBefore(row, board.firstChild);

    for (let i = 0; i < Array.from(document.getElementsByClassName("col")).length / Array.from(document.getElementsByClassName("row")).length; i++) {
        var colDiv = document.createElement("div");
        colDiv.classList = "col";
        document.getElementsByClassName("row")[0].insertBefore(colDiv, document.getElementsByClassName("row")[0].firstChild);
        colDiv.addEventListener("click", e => handleClick(e));
        colDiv.style = "margin: 3px 3.7px;"
    }

    document.getElementById("board").style = "top: " + upperAlign + "%;";

}

const addLowerRow = () => {
    var row = document.createElement("div");
    row.classList = "row";
    document.getElementById("board").appendChild(row);

    for (let i = 0; i < Array.from(document.getElementsByClassName("col")).length / Array.from(document.getElementsByClassName("row")).length; i++) {
        var colDiv = document.createElement("div");
        colDiv.classList = "col";
        colDiv.style = "margin: 3px 3.7px;"
        document.getElementsByClassName("row")[Array.from(document.getElementsByClassName("row")).length - 1].append(colDiv);
        colDiv.addEventListener("click", e => handleClick(e));
    }
}

const handleClick = (e) => {
    if (!gameOver && e.target.innerHTML === "") {
        placeSymbol(e.target)
        if (checkIfGameOver(e)) return;
        nextPlayerTurn();
        
        const currentIndex = Array.from(document.getElementsByClassName("col")).findIndex(x => x === e.target);
        const colCount = document.getElementsByClassName("col").length;
        const rowCount = document.getElementsByClassName("row").length;

        if (isLeftColNeeded(currentIndex, colCount, rowCount))
        {
            addLeftCol();
        }
        if (isRightColNeeded(currentIndex, colCount, rowCount))
        {
            addRightCol();
        }
        if (isUpperRowNeeded(currentIndex, colCount, rowCount))
        {
            addUpperRow();
        }
        if (isLowerRowNeeded(currentIndex, colCount, rowCount))
        {
            addLowerRow();
        }
    }
}

const isLeftColNeeded = (currentIndex, colCount, rowCount) => {
    return currentIndex % (colCount / rowCount) === 0;
};

const isRightColNeeded = (currentIndex, colCount, rowCount) => {
    return currentIndex % (colCount / rowCount) === (colCount / rowCount) - 1;
};

const isUpperRowNeeded = (currentIndex, colCount, rowCount) => {
    return currentIndex < colCount / rowCount;
};

const isLowerRowNeeded = (currentIndex, colCount, rowCount) => {
    return currentIndex >= colCount - (colCount / rowCount);
};

const placeSymbol = (col) => {
    col.innerHTML = "<div>" + currentPlayer + "</div>";
}

const checkIfGameOver = (e) => {
    if (playerWon(e)) {
        header.innerHTML = "Game over! Player " + currentPlayer + " won!";
        gameOver = true;
        return true;
    }
};

const nextPlayerTurn = () => {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    header.innerHTML = "Player " + currentPlayer + " turn";
}

const playerWon = (e) => {
    rows = Array.from(document.getElementsByClassName("row"));
    cols = Array.from(document.getElementsByClassName("col"));
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