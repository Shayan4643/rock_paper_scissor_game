// Get DOM elements
const choices = document.querySelectorAll(".choice");
const yourChoice = document.getElementById("your-choice");
const computerChoice = document.getElementById("computer-choice");
const result = document.getElementById("result-text");
const startBtn = document.getElementById("popUpButton");
const popUp = document.querySelector(".pop-up");
const yourScore = document.getElementById("your-score");
const computerScore = document.getElementById("computer-score");
const choicesContainer = document.querySelector(".choices");

// Function to get computer choice
function getComputerChoice() {
  const options = ["rock", "paper", "scissor"];
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}

// Function to determine winner
function determineWinner(user, computer) {
  if (user === computer) return "It's a Draw!";
  if (
    (user === "rock" && computer === "scissor") ||
    (user === "paper" && computer === "rock") ||
    (user === "scissor" && computer === "paper")
  ) {
    return "You Win! 🎉";
  } else {
    return "Computer Wins! 💻";
  }
}

// Track whether a match is finished
let gameOver = false;

// Start / Play Again button
startBtn.addEventListener("click", () => {
  popUp.style.display = "none";
  // allow interactions when popup is hidden
  if (choicesContainer) choicesContainer.classList.remove("disabled");
  // If the match was over, reset scores and UI when player clicks Play Again
  if (gameOver) {
    resetGame();
  } else {
    // first-time start: ensure fresh state
    gameOver = false;
    yourScore.textContent = "0";
    computerScore.textContent = "0";
    yourChoice.textContent = "-";
    computerChoice.textContent = "-";
    result.textContent = "Make your choice!";
  }
});

// Add click events to choices
choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    if (gameOver) return; // ignore clicks after match ends
    const userChoice = choice.id;
    const computerChoiceValue = getComputerChoice();
    const resultText = determineWinner(userChoice, computerChoiceValue);

    // Update scores
    let yourCurrentScore = parseInt(yourScore.textContent) || 0;
    let computerCurrentScore = parseInt(computerScore.textContent) || 0;

    if (resultText.includes("You Win")) {
      yourCurrentScore += 1;
    } else if (resultText.includes("Computer Wins")) {
      computerCurrentScore += 1;
    }

    yourScore.textContent = yourCurrentScore;
    computerScore.textContent = computerCurrentScore;

    // Update choices and result
    yourChoice.textContent = userChoice;
    computerChoice.textContent = computerChoiceValue;
    result.textContent = resultText;

    if (yourCurrentScore === 10 || computerCurrentScore === 10) {
      // stop accepting further input and show Play Again popup
      gameOver = true;
      const winner = yourCurrentScore === 10 ? "You" : "Computer";
      result.textContent = `${winner} won the match!`;
      startBtn.textContent = "Play Again";
      // show popup so user explicitly restarts and disable choices behind it
      setTimeout(() => {
        popUp.style.display = "flex";
        if (choicesContainer) choicesContainer.classList.add("disabled");
      }, 200);
    }
  });
});

function resetGame() {
  yourScore.textContent = "0";
  computerScore.textContent = "0";
  yourChoice.textContent = "-";
  computerChoice.textContent = "-";
  result.textContent = "Make your choice!";
  gameOver = false;
  startBtn.textContent = "Start Game";
  if (choicesContainer) choicesContainer.classList.remove("disabled");
}
