// Gallery 
const gallery = [
  { src: "https://i.pinimg.com/736x/68/ce/6b/68ce6b82ef9f9511decf1f8141dbf9fd.jpg", name: "goro akechi" },
  { src: "https://i.pinimg.com/736x/c8/4e/17/c84e17edc6608f6896dfc085fec9e263.jpg", name: "sunday" },
  { src: "https://i.pinimg.com/1200x/bb/7f/17/bb7f174d1deec029edca8e886b46137e.jpg", name: "fyodor dostoevsky" },
  { src: "https://i.pinimg.com/736x/99/11/ac/9911acbd2eb944d9b209e414419c8ffd.jpg", name: "albedo" },
  { src: "https://i.pinimg.com/1200x/e5/98/84/e59884e32f640134a645771408d46044.jpg", name: "takuto maruki" }
];

let index = 0;
let img = document.getElementById("gallery-img");
let caption = document.getElementById("gallery-caption");

function updateGallery(direction = "next") {
  // Remove previous classes
  img.classList.remove("slide-in", "slide-left", "slide-right");
  caption.classList.remove("slide-in", "slide-left", "slide-right");

  // Set initial slide direction
  img.classList.add(direction === "next" ? "slide-right" : "slide-left");
  caption.classList.add(direction === "next" ? "slide-right" : "slide-left");

  setTimeout(() => {
    img.src = gallery[index].src;
    caption.textContent = gallery[index].name;

    img.classList.add("slide-in");
    caption.classList.add("slide-in");
  }, 20);
}

// Buttons
document.querySelector(".prev").addEventListener("click", () => {
  index = (index - 1 + gallery.length) % gallery.length;
  updateGallery("prev");
});

document.querySelector(".next").addEventListener("click", () => {
  index = (index + 1) % gallery.length;
  updateGallery("next");
});

// Optional: Swipe for mobile
let startX = 0;
const slideContent = document.querySelector(".slide-content");
slideContent.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});
slideContent.addEventListener("touchend", (e) => {
  const endX = e.changedTouches[0].clientX;
  if (endX - startX > 50) {
    // Swipe right
    index = (index - 1 + gallery.length) % gallery.length;
    updateGallery("prev");
  } else if (startX - endX > 50) {
    // Swipe left
    index = (index + 1) % gallery.length;
    updateGallery("next");
  }
});

// Initial load
updateGallery();




// Tic Tac Toe
const board = Array(9).fill(null);
let gameOver = false;

const cells = document.querySelectorAll(".cell");
const resetBtn = document.querySelector(".reset");
const message = document.querySelector(".message");
const messageText = document.getElementById("message-text");
const messageGif = document.getElementById("message-gif");

function checkWinner(b) {
  const wins = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  for (let combo of wins) {
    const [a,b1,c] = combo;
    if (b[a] && b[a] === b[b1] && b[a] === b[c]) return b[a];
  }
  return b.includes(null) ? null : "tie";
}

function minimax(b, isMaximizing) {
  const winner = checkWinner(b);
  if (winner === "x") return -1;
  if (winner === "o") return 1;
  if (winner === "tie") return 0;

  if (isMaximizing) {
    let best = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (!b[i]) {
        b[i] = "o";
        best = Math.max(best, minimax(b, false));
        b[i] = null;
      }
    }
    return best;
  } else {
    let best = Infinity;
    for (let i = 0; i < 9; i++) {
      if (!b[i]) {
        b[i] = "x";
        best = Math.min(best, minimax(b, true));
        b[i] = null;
      }
    }
    return best;
  }
}

function bestMove() {
  let bestScore = -Infinity;
  let move;
  for (let i = 0; i < 9; i++) {
    if (!board[i]) {
      board[i] = "o";
      let score = minimax(board, false);
      board[i] = null;
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }
  makeMove(move, "o");
}

function makeMove(i, player) {
  if (board[i] || gameOver) return;
  board[i] = player;
  cells[i].classList.add(player);
  cells[i].textContent = player;
  const result = checkWinner(board);
  if (result) {
    gameOver = true;
    if (result === "o") {
      messageText.textContent = "get rekt xd";
      messageGif.src = "https://media1.tenor.com/m/iX0o5br-JY4AAAAC/get-wrecked-kid-basically-homeless.gif";
      message.style.display = "block";
    } else if (result === "tie") {
      messageText.textContent = "well it's a tie ¯\\_(ツ)_/¯";
      messageGif.src = "https://media1.tenor.com/m/Zc-ZTPzlEHoAAAAd/i-don%27t-know-idk.gif";
      message.style.display = "block";
    }
  }
}

cells.forEach(cell => {
  cell.addEventListener("click", () => {
    const idx = cell.dataset.index;
    if (!board[idx] && !gameOver) {
      makeMove(idx, "x");
      if (!gameOver) bestMove();
    }
  });
});

resetBtn.addEventListener("click", () => {
  for (let i = 0; i < 9; i++) {
    board[i] = null;
    cells[i].textContent = "";
    cells[i].classList.remove("x", "o");
  }
  gameOver = false;
  message.style.display = "none";
  messageText.textContent = "";
  messageGif.src = "";
});

// Array of 30 random fun facts (all lowercase)
const funFacts = [
  "there’s a species of fungus that can control an ant’s mind and force it to climb before killing it.",
  "baby carrots are often sprayed with hydrogen peroxide to stay white and crisp.",
  "humans can get brain-eating amoebas from warm freshwater lakes.",
  "some people have died from laughing too much.",
  "the inventor of the guillotine died by falling off a horse and accidentally decapitating himself.",
  "there’s a jellyfish that can revert to its juvenile stage and essentially live forever.",
  "rats can laugh when tickled, but humans can’t hear it without special equipment.",
  "cannibalistic crickets exist and will eat weaker crickets alive.",
  "some tapeworms can grow longer than 30 feet inside a human gut.",
  "humans shed about 600,000 particles of skin every hour.",
  "there’s a fish that literally eats its own offspring after birth.",
  "some serial killers had pets that they fed human remains to.",
  "your stomach gets a new lining every 3-4 days to avoid digesting itself.",
  "there’s a parasite that makes spiders spin ‘zombie’ webs to protect it.",
  "the blood of horseshoe crabs is blue and extremely valuable for detecting bacteria.",
  "there are abandoned cities where bodies of residents were left behind due to disease outbreaks.",
  "some people can swallow their eyes slightly without damage, a phenomenon called globe luxation.",
  "cockroaches can survive for weeks without their head before dying of starvation.",
  "there’s a frog that can freeze solid in winter and thaw in spring to continue living.",
  "humans have tiny mites living in their eyelashes and eyebrows.",
  "some fungi grow out of insect corpses and literally sprout from their head.",
  "there’s a condition where people feel pain from touch that doesn’t exist, called allodynia.",
  "rats will commit suicide in groups if trapped and stressed enough, a phenomenon called 'rat despair'.",
  "there’s a parasite that turns infected rats fearless, making them walk straight into cats’ mouths.",
  "the average human poops about 1.5 pounds of bacteria-filled waste daily.",
  "some sharks can go into a trance when flipped upside down.",
  "humans can experience sleep paralysis and hallucinate shadow people watching them.",
  "there are people who can hear their eyeballs move when they look around.",
  "some octopuses will eat their own arms under extreme stress.",
  "there are fungi that make ants climb trees and cling to leaves before the ant dies, called ‘zombie ants’ again.",
  "human fingernails continue to grow for months after death in some cases due to skin dehydration."
];

const factText = document.getElementById("funfact-text");
const refreshBtn = document.getElementById("funfact-refresh");
const icon = refreshBtn.querySelector("i");

function displayFunFact() {
  const randomIndex = Math.floor(Math.random() * funFacts.length);
  factText.textContent = funFacts[randomIndex];
}

// Initial load
displayFunFact();

// Click handler with spin animation
refreshBtn.addEventListener("click", () => {
  displayFunFact();
  // Add spin
  icon.classList.add("spin");
  // Remove spin after animation ends so it can spin again
  setTimeout(() => icon.classList.remove("spin"), 500);
});

