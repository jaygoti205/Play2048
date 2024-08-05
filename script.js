let tableBody = document.getElementById("tableBody");
let gameResultDiv = document.getElementById("gameResultDiv");
let replayBtn = document.getElementById("replayBtn");

let array = [];
let score = 0;
let bestScore;
let arrayChange = true;
let boxId;      //To store Id of The single box
let CheckEmptyArray;    //Store the count of Empty position   

//Get or set the Best Score stored in local Storage
if (JSON.parse(localStorage.getItem("bestScore")) == null) {
    bestScore = 0;
    localStorage.setItem("bestScore", JSON.stringify(bestScore));
}
else {
    bestScore = JSON.parse(localStorage.getItem("bestScore"));
}

//Create table on Display Screen
function createTable() {
    for (let i = 0; i < 4; i++) {
        array[i] = [];
        let tr = document.createElement("tr");
        for (let j = 0; j < 4; j++) {
            let td = document.createElement("td");
            array[i][j] = "";
            td.setAttribute("id", `${i}${j}`);
            tr.appendChild(td);
        }
        tableBody.appendChild(tr);
    }
}

//Create random number (2 or 4) at random position
function generateRandomNumberPosition() {
    if (arrayChange) {
        let a = Math.floor(Math.random() * 4);
        let b = Math.floor(Math.random() * 4);
        if (array[a][b] == "") {
            array[a][b] = ((Math.random() * 100) % 2 == 0) ? 4 : 2;
            showUpdateOnTable();
        }
        else {
            generateRandomNumberPosition();
        }
    }
    else if (CheckEmptyArray.length === 0) {
        gameResultDiv.style.display = "flex";
        document.onkeydown = null;
    }
}

//Show the Update after addition and move the number
function showUpdateOnTable() {
    CheckEmptyArray = [];
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            let boxId = document.getElementById(`${i}${j}`);
            boxId.innerText = array[i][j];
            boxId.classList.add(`box-${array[i][j]}`);

            if (array[i][j] == "") {
                CheckEmptyArray.push(array[i][j] ) ;
            }

            if (array[i][j] == 2048) {
                let gameResultMassageText = document.getElementById("gameResultMassageText");
                gameResultMassageText.textContent = "WiN!"
                gameResultDiv.style.display = "flex";
                document.onkeydown = null;
            }
        }
    }

}

//Show the Score On the Screen
//Score are increase at every addition
function showScore(nScore) {
    let bestScoreText = document.getElementById("bestScoreText");
    let ScoreText = document.getElementById("scoreText");
    //Compare Score  and Best Score
    if (bestScore < nScore) {
        bestScore = nScore;
        localStorage.setItem("bestScore", JSON.stringify(bestScore))
    }

    ScoreText.innerText = nScore;
    bestScoreText.innerText = bestScore;
}

//Move numbers at Right side when the right key pressed 
function moveRight() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {

            //remove All classes by id
            if (array[i][j] !== "") {
                if (j == 0 || j == 1 || j === 2) {
                    if (array[i][j + 1] == "") {
                        boxId = document.getElementById(`${i}${j}`);
                        array[i][j + 1] = array[i][j];
                        array[i][j] = "";
                        arrayChange = true;
                        boxId.className = '';
                        moveRight();
                        showUpdateOnTable();
                    }
                }
            }
        }
    }
}

//sum of nearest common numbers at Right side when the right key pressed
function sumRight() {
    for (let i = 0; i < 4; i++) {
        for (let j = 3; j >= 0; j--) {
            if (array[i][j] !== "") {
                if (j == 2 || j == 1 || j === 0) {
                    if (array[i][j + 1] == array[i][j]) {
                        boxId = document.getElementById(`${i}${j}`);
                        array[i][j + 1] += array[i][j];
                        score += array[i][j + 1];
                        array[i][j] = "";
                        arrayChange = true;
                        boxId.className = '';
                        showUpdateOnTable();
                        showScore(score);
                    }
                }
            }
        }
    }
    moveRight();
}

//Move numbers at left side when the left key pressed
function moveLeft() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (array[i][j] !== "") {
                if (j == 3 || j == 2 || j === 1) {
                    if (array[i][j - 1] == "") {
                        boxId = document.getElementById(`${i}${j}`);
                        array[i][j - 1] = array[i][j];
                        array[i][j] = "";
                        arrayChange = true;
                        boxId.className = '';
                        moveLeft();
                        showUpdateOnTable();
                    }
                }
            }
        }
    }
}

//sum of nearest common numbers at Left side when the Left key pressed
function sumLeft() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (array[i][j] !== "") {
                if (j == 3 || j == 2 || j === 1) {
                    if (array[i][j - 1] == array[i][j]) {
                        boxId = document.getElementById(`${i}${j}`);
                        array[i][j - 1] += array[i][j];
                        score += array[i][j - 1];
                        array[i][j] = "";
                        arrayChange = true;
                        boxId.className = ''
                        showUpdateOnTable();
                        showScore(score);
                    }
                }
            }
        }
    }
    moveLeft();
}

//Move numbers at Bottom side when the Down key pressed
function moveBottom() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (array[i][j] !== "") {
                if (i == 0 || i == 1 || i === 2) {
                    if (array[i + 1][j] == "") {
                        boxId = document.getElementById(`${i}${j}`);
                        array[i + 1][j] = array[i][j];
                        array[i][j] = "";
                        arrayChange = true;
                        boxId.className = ''
                        moveBottom();
                        showUpdateOnTable()
                    }
                }
            }
        }
    }
}

//sum of nearest common numbers at Bottom side when the Down key pressed
function sumBottom() {
    for (let i = 3; i >= 0; i--) {
        for (let j = 0; j < 4; j++) {
            if (array[i][j] !== "") {
                if (i == 2 || i == 1 || i === 0) {
                    if (array[i + 1][j] == array[i][j]) {
                        boxId = document.getElementById(`${i}${j}`);
                        array[i + 1][j] += array[i][j];
                        score += array[i + 1][j];
                        array[i][j] = "";
                        arrayChange = true;
                        boxId.className = ''
                        showUpdateOnTable();
                        showScore(score);
                    }
                }
            }
        }
    }
    moveBottom();
}

//Move numbers at Top side when the Up key pressed
function moveTop() {
    for (let i = 0; i < 4; i++) {
        for (let j = 3; j >= 0; j--) {
            if (array[i][j] !== "") {
                if (i == 3 || i == 2 || i === 1) {
                    if (array[i - 1][j] == "") {
                        boxId = document.getElementById(`${i}${j}`);
                        array[i - 1][j] = array[i][j];
                        array[i][j] = "";
                        arrayChange = true;
                        boxId.className = ''
                        moveTop();
                        showUpdateOnTable();
                    }
                }
            }
        }
    }
}

//sum of nearest common numbers at Top side when the up key pressed
function sumTop() {
    for (let i = 0; i < 4; i++) {
        for (let j = 3; j >= 0; j--) {
            if (array[i][j] !== "") {
                if (i == 3 || i == 2 || i === 1) {
                    if (array[i - 1][j] == array[i][j]) {
                        boxId = document.getElementById(`${i}${j}`);
                        array[i - 1][j] += array[i][j];
                        score += array[i - 1][j];
                        array[i][j] = "";
                        arrayChange = true;
                        boxId.className = '';
                        showUpdateOnTable();
                        showScore(score);
                    }
                }
            }
        }
    }
    moveTop();
}

//This function are starting function to set the game and Replay Or New Game 
function playGame() {
    arrayChange = true;
    CheckEmptyArray = [];
    tableBody.innerHTML = "";
    gameResultDiv.style.display = "none";
    createTable();
    generateRandomNumberPosition();
    showScore(score = 0);
    keyClick();
}

//This function are work on key down event to handle
function keyClick() {
    document.onkeydown = function (e) {
        switch (e.keyCode) {
            case 37:
                arrayChange = false;
                moveLeft();
                sumLeft();
                generateRandomNumberPosition();
                break;
            case 38:
                arrayChange = false;
                moveTop();
                sumTop();
                generateRandomNumberPosition();
                break;
            case 39:
                arrayChange = false;
                moveRight();
                sumRight();
                generateRandomNumberPosition();
                break;
            case 40:
                arrayChange = false;
                moveBottom();
                sumBottom();
                generateRandomNumberPosition();
                break;
            default:
                break;
        }
    };
}

playGame();
replayBtn.addEventListener("click", playGame);