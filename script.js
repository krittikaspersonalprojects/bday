const reasons = [
  "Your reason #1 goes here.",
  "Your reason #2 goes here.",
  "Your reason #3 goes here.",
  "Your reason #4 goes here.",
  "Your reason #5 goes here.",
  "Your reason #6 goes here.",
  "Your reason #7 goes here.",
  "Your reason #8 goes here.",
  "Your reason #9 goes here.",
  "Your reason #10 goes here.",
  "Your reason #11 goes here.",
  "Your reason #12 goes here.",
  "Your reason #13 goes here.",
  "Your reason #14 goes here.",
  "Your reason #15 goes here.",
  "Your reason #16 goes here.",
  "Your reason #17 goes here.",
  "Your reason #18 goes here.",
  "Your reason #19 goes here.",
  "Your reason #20 goes here.",
  "Your reason #21 goes here.",
];

const garden = document.querySelector("#balloon-garden");
if (garden) {
  const reasonList = document.querySelector("#reasons-list");
  const count = document.querySelector("#revealed-count");
  const revealed = new Set();
  const colors = ["pink", "coral", "yellow", "blue", "lilac", "sage", "peach"];

  reasons.forEach((reason, index) => {
    const number = index + 1;
    const balloon = document.createElement("button");
    balloon.type = "button";
    balloon.className = `balloon balloon-${colors[index % colors.length]}`;
    balloon.setAttribute("aria-label", `Pop balloon ${number}`);
    balloon.setAttribute("aria-controls", `reason-${number}`);
    balloon.innerHTML = `<span class="balloon-number">${number}</span><span class="balloon-knot"></span><span class="balloon-string"></span>`;

    const line = document.createElement("li");
    line.className = "reason-item";
    line.id = `reason-${number}`;
    line.value = number;
    line.innerHTML = `<span class="reason-number">${String(number).padStart(2, "0")}</span><span class="reason-text"></span>`;
    line.querySelector(".reason-text").textContent = reason;

    balloon.addEventListener("click", () => {
      revealed.add(number);
      line.classList.add("is-revealed");
      balloon.classList.add("is-popped");
      balloon.setAttribute("aria-label", `Balloon ${number} popped; reason revealed`);
      count.textContent = String(revealed.size);
    });

    garden.append(balloon);
    reasonList.append(line);
  });
}

const letterDialog = document.querySelector("#letter-dialog");
const openLetter = document.querySelector("#open-letter");
const closeLetter = document.querySelector("#close-letter");

if (letterDialog && openLetter && closeLetter) {
  openLetter.addEventListener("click", () => letterDialog.showModal());
  closeLetter.addEventListener("click", () => letterDialog.close());
  letterDialog.addEventListener("click", (event) => {
    if (event.target === letterDialog) letterDialog.close();
  });
}
