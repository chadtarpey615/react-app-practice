// const playerOne = document.querySelector(".player-one");
// const playerTwo = document.querySelector(".player-two");
// const resetGame = document.querySelector(".reset");
// const firstScore = document.querySelector(".scoreOne");
// const secondScore = document.querySelector(".scoreTwo");
// const winningScore = document.querySelector(".winner");

// let playerOneScore = 0;
// let playerTwoScore = 0;
// let gameOver = Math.floor(Math.random() * 10 + 1)
// winningScore.innerHTML = gameOver;



// const addPlayerOneScore = () => {
//     playerOneScore++;
//     firstScore.innerHTML = playerOneScore;
//     if (playerOneScore === gameOver) {
//         endGame();
//         firstScore.innerHTML = "Player One wins!!"

//     }
//     console.log(playerOneScore)
// }

// const addPlayerTwoScore = () => {
//     playerTwoScore++;
//     secondScore.innerHTML = playerTwoScore;
//     if (playerTwoScore === gameOver) {
//         endGame();
//         secondScore.innerHTML = "Player two wins!!"
//     }
// }

// const endGame = () => {
//     playerOne.removeEventListener("click", addPlayerOneScore);
//     playerTwo.removeEventListener("click", addPlayerTwoScore);

//     console.log("game over")
// }

// const newGame = () => {
//     firstScore.innerHTML = "0";
//     firstScore = 0;
//     secondScore.innerHTML = "0";

//     playerOne.addEventListener("click", addPlayerOneScore);


// }


// playerOne.addEventListener("click", addPlayerOneScore);



// playerTwo.addEventListener("click", addPlayerTwoScore);

// resetGame.addEventListener("click", newGame)


///// the way colt did it //////
const p1Button = document.querySelector("#p1Btn");
const p2Button = document.querySelector("#p2Btn");
const resetButton = document.querySelector("#reset-Btn");
const p1Display = document.querySelector("#p1Display")
const p2Display = document.querySelector("#p2Display")
const winningScoreSelect = document.querySelector("#playto")

let p1Score = 0;
let p2Score = 0;
let winningScore = 5;
let isGameOver = false;

p1Button.addEventListener("click", () => {
    if (!isGameOver) {
        p1Score += 1;
        if (p1Score === winningScore) {
            isGameOver = true;
            p1Display.classList.add("winner")
            p2Display.classList.add("loser")
        }
    }

    p1Display.textContent = p1Score
}

)


p2Button.addEventListener("click", () => {
    if (!isGameOver) {
        p2Score += 1;
        if (p2Score === winningScore) {
            isGameOver = true;
            p2Display.classList.add("winner")
            p1Display.classList.add("loser")
        }
    }

    p2Display.textContent = p2Score
}

)

winningScoreSelect.addEventListener("change", (e) => {
    console.log(e.target.value)
    winningScore = parseInt(e.target.value);
    reset();
})

resetButton.addEventListener("click", reset)

const reset = () => {
    isGameOver = false;
    p1Score = 0;
    p2Score = 0;
    p1Display.textContent = 0;
    p2Display.textContent = 0;
}