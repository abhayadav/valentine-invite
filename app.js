const yesBtn = document.getElementById("yes-btn");
const noBtn = document.getElementById("no-btn");
const response = document.getElementById("response");
const rsvp = document.getElementById("rsvp");

const confettiColors = ["#cc3151", "#f48aa2", "#ffd0dc", "#f4b4c4", "#ffffff"];
let movedOnce = false;

function launchConfetti() {
  const existing = document.querySelector(".confetti");
  if (existing) existing.remove();

  const confetti = document.createElement("div");
  confetti.className = "confetti";
  document.body.appendChild(confetti);

  for (let i = 0; i < 90; i += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    const size = 6 + Math.random() * 8;
    piece.style.width = `${size}px`;
    piece.style.height = `${size + 4}px`;
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.background = confettiColors[i % confettiColors.length];
    piece.style.animationDuration = `${2.5 + Math.random() * 2.5}s`;
    piece.style.animationDelay = `${Math.random() * 0.3}s`;
    piece.style.transform = `translate3d(0, -10vh, 0) rotate(${Math.random() * 180}deg)`;
    confetti.appendChild(piece);
  }

  setTimeout(() => {
    confetti.remove();
  }, 4500);
}

function moveNoButton() {
  const bounds = rsvp.getBoundingClientRect();
  const buttonRect = noBtn.getBoundingClientRect();

  const maxLeft = bounds.width - buttonRect.width - 16;
  const maxTop = bounds.height - buttonRect.height - 16;

  const left = Math.max(8, Math.random() * maxLeft);
  const top = Math.max(8, Math.random() * maxTop);

  noBtn.style.position = "absolute";
  noBtn.style.left = `${left}px`;
  noBtn.style.top = `${top}px`;
  noBtn.textContent = "Try again";
  movedOnce = true;
}

if (yesBtn && noBtn && response && rsvp) {
  yesBtn.addEventListener("click", () => {
    response.textContent = "Yay! You just made my whole day. I love you.";
    launchConfetti();
  });

  noBtn.addEventListener("mouseenter", moveNoButton);
  noBtn.addEventListener("click", () => {
    if (!movedOnce) {
      moveNoButton();
      return;
    }
    response.textContent = "Nice try. I already saved the date.";
  });
}
