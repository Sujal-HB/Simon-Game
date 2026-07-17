let gameSeq = [];
let userSeq = [];
let highestScore = 0;
let scoreDisplay = document.querySelector(".highestScore");

let btns = ["one", "two", "three", "four"];

let started = false;
let level = 0;

let h3 = document.querySelector("h3");

document.addEventListener("keypress", function () {
  if (started == false) {
    console.log("game is started");
    started = true;
    levelUp();
  }
});

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(() => {
    btn.classList.remove("flash");
  }, 200);
}
function userFlash(btn) {
  btn.classList.add("userFlash");
  setTimeout(() => {
    btn.classList.remove("userFlash");
  }, 200);
}

function levelUp() {
  userSeq = [];
  level++;
  h3.innerText = `Level ${level}`;

  let randIdx = Math.floor(Math.random() * 4);
  let randColor = btns[randIdx];
  let randbtn = document.querySelector(`.${randColor}`);
  gameSeq.push(randColor);
  console.log(gameSeq);
  gameFlash(randbtn);
  highest();
}

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 800);
    }
  } else {
    h3.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Highest Score : ${highestScore} <br> Press any key to start.`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(() => {
      document.querySelector("body").style.backgroundColor = "rgb(13, 17, 23)";
    }, 150);
    scoreDisplay.innerText = `Highest Score : ${highestScore}`;
    reset();
  }
}

function btnPress() {
  let btn = this;
  userFlash(btn);

  let userColor = btn.getAttribute("id");
  userSeq.push(userColor);
  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}

function highest() {
  if (level > highestScore) {
    highestScore = level;
  }
}
