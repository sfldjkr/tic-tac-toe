let gameDiv = document.querySelector('#gameBoard');
let restartButton = document.querySelector('.restart');
let showWinnerDiv = document.querySelector('#showanswer');

let gameBoard = (() => {
    gameboard = [['null','null','null'],['null','null','null'],['null','null','null']];
    hasWon = false;
    wonGamePieces = [];
    return {gameboard};
})();

let factoryUser = (name) => {
    let myTurn = false;
    let iHaveWon = false;
    return {name, myTurn, iHaveWon};
};



let playGame = (PLayerOneName, playerTwoName) => {
        let player1 = factoryUser(PLayerOneName);
        let player2 = factoryUser(playerTwoName);
        player1.myTurn = true;

        let checkIfWon = () => {
            let rowCount = 0;
            for (row of gameBoard.gameboard) {
                // checking if straight line has matched
                if (row[0] !== 'null') {
                    if (row[0] === row[1] && row[0] === row[2]) {
                        gameBoard.wonGamePieces = [[[rowCount],[0]],[[rowCount],[1]],[[rowCount],[2]]];
                        gameBoard.hasWon = true;
                        player1.myTurn ? player2.iHaveWon = true : player1.iHaveWon = true; 
                        if (player1.iHaveWon) {
                            showWinnerDiv.innerHTML = `${player1.name} Has Won The Game`;

                        }
                        else if (player2.iHaveWon) {
                            showWinnerDiv.innerHTML = `${player2.name} Has Won The Game`; 

                        };
                        displayGrid(gameBoard.gameboard);
                    };
                };
                rowCount++;
            };

                // check if vertical line has matched
                // check each row from the first column
                for (let i = 0; i < 3; i++) {
                    let firstRow = gameBoard.gameboard[0];
                    let secondRow = gameBoard.gameboard[1];
                    let thirdRow = gameBoard.gameboard[2];
    
                    if (firstRow[0] !== 'null' || firstRow[1] !== 'null' || firstRow[2] !== 'null') {
                        if (firstRow[i] === secondRow[i] && firstRow[i] === thirdRow[i] && firstRow[i] !== 'null' && secondRow[i] !== 'null' && thirdRow[i] !== 'null') {
                            gameBoard.wonGamePieces = [[[0],[i]],[[1],[i]],[[2],[i]]];
                           
                            gameBoard.hasWon = true;
                            player1.myTurn ? player2.iHaveWon = true : player1.iHaveWon = true; 
                            if (player1.iHaveWon) {
                                showWinnerDiv.innerHTML = `${player1.name} Has Won The Game`; 
                            }
                            else if (player2.iHaveWon) {
                                showWinnerDiv.innerHTML = `${player2.name} Has Won The Game`; 
   
                            };
                            displayGrid(gameBoard.gameboard);
                        };

                    };
                };
                // checking matches vertically
                // there are two condition
                // checked firstrow-first index == center == lastrow -lastindex

                if (gameBoard.gameboard[0][0] === gameBoard.gameboard[1][1] && gameBoard.gameboard[0][0] === gameBoard.gameboard[2][2] && gameBoard.gameboard[0][0] !== 'null' && gameBoard.gameboard[1][1] !== 'null' && gameBoard.gameboard[2][2] !== 'null') {
                    gameBoard.wonGamePieces = [[[0],[0]],[[1],[1]],[[2],[2]]];
                           
                    gameBoard.hasWon = true;
                    player1.myTurn ? player2.iHaveWon = true : player1.iHaveWon = true; 
                    if (player1.iHaveWon) {
                        showWinnerDiv.innerHTML = `${player1.name} Has Won The Game`;

                    }
                    else if (player2.iHaveWon) {
                        showWinnerDiv.innerHTML = `${player2.name} Has Won The Game`; 

                    };
                    displayGrid(gameBoard.gameboard);
                };

                if (gameBoard.gameboard[0][2] === gameBoard.gameboard[1][1] && gameBoard.gameboard[0][2] === gameBoard.gameboard[2][0] && gameBoard.gameboard[0][2] !== 'null' && gameBoard.gameboard[1][1] !== 'null' && gameBoard.gameboard[2][0] !== 'null') {
                    gameBoard.wonGamePieces = [[[0],[2]],[[1],[1]],[[2],[0]]];
                           
                    gameBoard.hasWon = true;
                    player1.myTurn ? player2.iHaveWon = true : player1.iHaveWon = true; 
                    if (player1.iHaveWon) {
                        showWinnerDiv.innerHTML = `${player1.name} Has Won The Game`;

                    }
                    else if (player2.iHaveWon) {
                        showWinnerDiv.innerHTML = `${player2.name} Has Won The Game`; 

                    };
                    displayGrid(gameBoard.gameboard);
                };

            };

        let checkIfTie = () => {
            let hasTied = true;
            for (row of gameBoard.gameboard) {
                for (column of row) {
                    if (column === "null") {
                        return false;
                    };
                };
            }
            return hasTied;
        };

        let userChoosed = (e) => {
            if (!gameBoard.hasWon) {
                    let i = e.target.id;
                    let firstIndex = Number(i[0]);
                    let secondIndex = Number(i[1]); 
                    if (gameBoard.gameboard[firstIndex][secondIndex] === 'null') {
                        let symbol = '';
                        player1.myTurn ? symbol = 'X' : symbol = 'Y';
                        gameBoard.gameboard[firstIndex][secondIndex] = symbol;
                        if (player1.myTurn) {
                            player1.myTurn = false;
                            player2.myTurn = true;

                        }
                        else {
                            player2.myTurn = false;
                            player1.myTurn = true;

                        };
                        displayGrid(gameBoard.gameboard);
            
                        // check if any user has won the game
                        // if has then change the hasWon status and stop the game
                        checkIfWon();
                    };
                };
                let hasTiedNow = checkIfTie();
                console.log(hasTiedNow);
                console.log
                if (hasTiedNow) {
                    console.log('has tied');
                    console.log(gameBoard.gameboard);
                    restartGame();
                };
        };


    let displayGrid = (array) => {
            
            gameDiv.innerHTML = '';
            if (!player1.iHaveWon && !player2.iHaveWon) {
                if (player1.myTurn) {
                    showWinnerDiv.innerHTML = `It's ${player1.name}'s Turn`;
                }
                else {
                    showWinnerDiv.innerHTML = `It's ${player2.name}'s Turn`;
                };
            };
            for(let i = 0; i < array.length; i++) {
                for (let v = 0; v < array[i].length; v++) {
                    let indiviualDiv = document.createElement('div');
                    indiviualDiv.classList.add('indivisualDiv');
                    if (array[i][v] == 'X') {
                        indiviualDiv.innerHTML = `<img src="./images/alpha-x.svg" alt="X">`;
                        indiviualDiv.classList.add('redDiv');
                    }
                    else if (array[i][v] === 'Y') {
                        indiviualDiv.innerHTML = `<img src="./images/alpha-y.svg" alt="y">`;
                        indiviualDiv.classList.add('blueDiv');
                    }
                    else {
                        indiviualDiv.innerHTML = ``;
                    };
                    indiviualDiv.id = `${i}${v}`;
                    if (gameBoard.hasWon) {
                        for (index of gameBoard.wonGamePieces) {
                            if (i === index[0][0] && v === index[1][0]) {
                                indiviualDiv.classList.remove('blueDiv');
                                indiviualDiv.classList.remove('redDiv');

                                if (player1.iHaveWon) {
                                    indiviualDiv.classList.add('redWon');
                                }
                                else if (player2.iHaveWon) {
                                    indiviualDiv.classList.add('blueWon');   
                                };
                            }
                        };
                        // check if this index is in gameboard.wonPieces

                    };
                    indiviualDiv.addEventListener('click', userChoosed);
    
                    gameDiv.appendChild(indiviualDiv);
                };
            };

    };    
    displayGrid(gameBoard.gameboard);
    restartButton.style.display = 'block'; 
};


let getPlayersName = () => {

    const favDialog = document.getElementById("favDialog");
    let playerOneName = document.querySelector('#playeronename');
    let playerTwoName = document.querySelector('#playertwoname');
    const confirmBtn = favDialog.querySelector("#confirmBtn");

    favDialog.showModal();

    confirmBtn.addEventListener("click", (event) => {
        event.preventDefault();
        favDialog.close();
        playGame(playerOneName.value, playerTwoName.value);
    });
};
getPlayersName();

let restartGame = () => {
    gameDiv.innerHTML = '';
    gameBoard.hasWon = false;
    gameBoard.wonGamePieces = [];
    showWinnerDiv.innerHTML = '';
    getPlayersName();
    gameBoard.gameboard = [['null','null','null'],['null','null','null'],['null','null','null']];
    let playerOneName = document.querySelector('#playeronename');
    let playerTwoName = document.querySelector('#playertwoname');
    playerOneName.value = '';

    playerTwoName.value = '';
    restartButton.style.display = 'none';
};

restartButton.addEventListener('click', () => {
    restartGame();
})