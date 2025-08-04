let boxes = document.querySelectorAll(".box");
let count = 0;
let resetButton = document.querySelector(".reset");
let newbutton = document.querySelector(".new");
let msg = document.querySelector(".msg");
let hide = document.querySelector(".hide");
let turnMsg = document.querySelector(".turnMsg");
let show = document.querySelector(".h");
var countPos = 0;

let playerO = true;

const winningCombinations = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

//Main logic

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    countPos++;

    if (playerO) {
      box.innerText = "O";
      playerO = false;
      turnMsg.innerHTML = "Player X's turn";
    } else {
      box.innerText = "X";
      playerO = true;
      turnMsg.innerText = "Player O's turn";
    }

    box.setAttribute("played", countPos);
    count++;
    box.disabled = true;
    sho();
    let isWinner = winnercheck();
    if (isWinner) {
      turnMsg.innerText = "";
    }
    if (count === 9 && !isWinner) {
      nowinner();
    }
  });
});
//Reset logic
const reset = () => {
  boxes.forEach((box) => {
  box.removeAttribute("played");
 })
  countPos = 0;
  count = 0;
  playerO = true;
  turnMsg.innerText = "Player O's turn";
  enable();
  sho();
};
//Disable and enable logic
const disable = () => {
  boxes.forEach((box) => {
    box.disabled = true;
  });
};
const enable = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
    hide.classList.add("hide");
  });
};
//Show winner
const showWinner = (winner) => {
  msg.innerText = `${winner} is the winner`;
  hide.classList.remove("hide");
  disable();
};
//Show draw
const nowinner = () => {
  msg.innerText = `It's a draw`;
  hide.classList.remove("hide");
  disable();
};
//Check for winner
const winnercheck = () => {
  for (let pos of winningCombinations) {
    let pos1 = boxes[pos[0]].innerText;
    let pos2 = boxes[pos[1]].innerText;
    let pos3 = boxes[pos[2]].innerText;
    if (
      pos1 === pos2 &&
      pos1 === pos3 &&
      !(pos1 === "" && pos2 === "" && pos3 === "")
    ) {
      showWinner(pos1);
      return true;
    }
  }
  return false;
};
newbutton.addEventListener("click", reset);
resetButton.addEventListener("click", reset);

//
function sho() {
  if (countPos >= 1) {
    show.classList.remove("h");
  } else if (count === 0) {
    show.classList.add("h");
  }
}
let events = document.querySelector(".undo");
events.addEventListener("click", undo);
events.addEventListener("dblclick", undo);

//undo logic
function undo() {
  var recentBox = document.querySelector(`[played="${countPos}"]`);
  recentBox.removeAttribute("played");
  recentBox.innerText = "";
  recentBox.disabled = false;
  countPos--;
  count--;
  playerO = !playerO;
  turnMsg.innerText = playerO ? "Player O's turn" : "Player X's turn";
  sho();
};
