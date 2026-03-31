const choices = document.querySelectorAll(".choice");
const yourChoice = document.getElementById("your-choice");
const computerChoice = document.getElementById("computer-choice");
const result = document.getElementById("result-text");
const score = document.getElementById("score");
const startBtn = document.getElementById("popUpButton");
const popUp = document.querySelector(".pop-up");

let userScore = 0;
let compScore = 0;
const MAX = 10;

function getComputerChoice() {
  const arr = ["rock", "paper", "scissor"];
  return arr[Math.floor(Math.random() * 3)];
}

function determineWinner(user, comp) {
  if (user === comp) return "draw";

  if (
    (user === "rock" && comp === "scissor") ||
    (user === "paper" && comp === "rock") ||
    (user === "scissor" && comp === "paper")
  )
    return "user";

  return "computer";
}

startBtn.onclick = () => {
  popUp.style.display = "none";
  document.body.style.overflow = "auto";
  reset();
};

function reset() {
  userScore = 0;
  compScore = 0;
  score.textContent = "0 - 0";
  result.textContent = "Make your move!";
}

choices.forEach((btn) => {
  btn.onclick = () => {
    const user = btn.id;
    const comp = getComputerChoice();
    const win = determineWinner(user, comp);

    yourChoice.textContent = user.toUpperCase();
    computerChoice.textContent = comp.toUpperCase();

    result.className = "";

    if (win === "user") {
      userScore++;
      result.textContent = "You Win 🎉";
      result.classList.add("win");
    } else if (win === "computer") {
      compScore++;
      result.textContent = "Computer Wins 💻";
      result.classList.add("lose");
    } else {
      result.textContent = "Draw";
      result.classList.add("draw");
    }

    score.textContent = `${userScore} - ${compScore}`;

    if (userScore === MAX || compScore === MAX) {
      setTimeout(() => {
        popUp.style.display = "flex";
        startBtn.textContent = "Play Again";
      }, 500);
    }
  };
});

// Keyboard controls
document.addEventListener("keydown", (e) => {
  if (e.key === "r") document.getElementById("rock").click();
  if (e.key === "p") document.getElementById("paper").click();
  if (e.key === "s") document.getElementById("scissor").click();
});
