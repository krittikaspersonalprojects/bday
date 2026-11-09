const reasons = [
  "I love the way you smile when you ragebait me.",
  "I love how you always make me laugh. Funny toh hai yaar tu (I'm funnier)",
  "I love the way you look at me when I act childish, special mention to lab's rotating chair.",
  "I love how you support me through everything.",
  "I love the way you make even ordinary moments special. Your presence makes everything the best",
  "I love how you can make me smile even on my worst days, special mention to ppi rejection smh.",
  "I love how you are affectionate even after we argue about something.",
  "I love the way you make me feel like I can be myself around you, I never had to pretend to be anyone else.",
  "I love how you remember all the little things I mention, even though they aren't that important.",
  "I love that we are so similar, you are literally my male version.",
  "I love how you are always there for me no matter what, I could never ask for more.",
  "I love the way you make me feel safe, now deal with the spoiled child that I am lmfaooo.",
  "I love that you communicate honestly with me, never change that. I appreciate it a lot.",
  "I love when you act like my mom and take care of me, it's the sweetest thing everrr.",
  "I love the way you make me feel appreciated and valued. I never thought I would ever feel so loved.",
  "I love how you always listen to me without any judgment, means a lot to me.",
  "I love the way you make even sitting together silently feel magical.",
  "I love how you celebrate my successes as if they were your own.",
  "I love the way you always believe in me, even if i don't believe in myself.",
  "I love how you make me feel like I'm the most important person in your world. Trust me, you are the most important person in mine.",
  "I love that you always want to stay, this really matters to me, thank you so much",
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
