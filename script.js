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

const memoryMoments = [
  { date: "27th May, 2026", description: "I bullied you into confessing your feelings lmfao." },
  { date: "20th June, 2026", description: "I crashed out and gave away that I liked you, it's really funny now that I think of it hehehe. Crashing out will always be my weakness ig lmfao." },
  { date: "5th August, 2026", description: "We FINALLY met after more than two months. Loved going to STORY and Dominos with you. Favourite part was being so close to you all the time and holding your hands for the first timeee yayy." },
  { date: "6th August, 2026", description: "We KISSEDDDD ahahahhaha best thing ever istgg, the moment was so perfect- you were explaining how much you love me and then the kiss (cinematic hehe)" },
  { date: "26th August, 2026", description: "First movie date and you proposeddd, best day of my life and I am not even exaggerating. No more what are we? questions lmfaoo" },
  { date: "9th October, 2026", description: "First date :)) I love how you always feed me something tor plate se, sweetest gesture ever." },
  { date: "14th October, 2026", description: "Wellll, no LIIT ever again lmfao but this day was really fun, we look SO happy in the photos haha. First ever sc + photobooth date :3" },
  { date: "12th November, 2026", description: "It's your birthdayyy, of course it will be special to me!! I wish I am there to celebrate all your birthdays, right next to you. I love you so much." },
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

const memoryRoad = document.querySelector("#memory-road");
if (memoryRoad) {
  const roadArt = document.querySelector("#memory-road-art");
  const roadPath = document.querySelector("#memory-road-path");
  const traveler = document.querySelector("#traveler-ball");
  const travelerHighlight = document.querySelector("#traveler-highlight");
  const stopsContainer = document.querySelector("#memory-stops");
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
  window.scrollTo(0, 0);
  const checkpoints = [
    { x: 800, y: 150 },
    { x: 200, y: 410 },
    { x: 800, y: 670 },
    { x: 200, y: 930 },
    { x: 800, y: 1190 },
    { x: 200, y: 1450 },
    { x: 800, y: 1710 },
    { x: 200, y: 1970 },
  ];

  memoryMoments.forEach((moment, index) => {
    const stop = document.createElement("article");
    stop.className = "memory-stop";
    stop.innerHTML = `<div class="memory-card"><span class="memory-card-number">memory ${String(index + 1).padStart(2, "0")}</span><h2 class="memory-date"></h2><p class="memory-description"></p></div>`;
    stop.querySelector(".memory-date").textContent = moment.date;
    stop.querySelector(".memory-description").textContent = moment.description;
    stop.setAttribute("aria-label", `Memory ${index + 1}: ${moment.date}`);
    stopsContainer.append(stop);
  });

  const pathLength = roadPath.getTotalLength();
  const pointsOnPath = checkpoints.map((checkpoint) => {
    let nearestLength = 0;
    let nearestDistance = Infinity;
    const samples = 1000;

    for (let sample = 0; sample <= samples; sample += 1) {
      const length = pathLength * sample / samples;
      const point = roadPath.getPointAtLength(length);
      const distance = Math.hypot(point.x - checkpoint.x, point.y - checkpoint.y);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestLength = length;
      }
    }

    return nearestLength;
  });

  let scheduledFrame = false;
  let currentDistance = 0;
  let lastFrameTime = null;
  const updateMemoryWalk = (frameTime) => {
    const roadBounds = roadArt.getBoundingClientRect();
    const roadDocumentBottom = roadBounds.bottom + window.scrollY;
    const travelDistance = Math.max(1, roadDocumentBottom - window.innerHeight);
    const progress = Math.max(0, Math.min(1, window.scrollY / travelDistance));
    const targetDistance = pathLength * progress;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const elapsed = lastFrameTime === null ? 16 : Math.min(frameTime - lastFrameTime, 64);
    lastFrameTime = frameTime;

    if (currentDistance === null || prefersReducedMotion) {
      currentDistance = targetDistance;
    } else {
      const easing = 1 - Math.exp(-elapsed / 110);
      currentDistance += (targetDistance - currentDistance) * easing;
      if (Math.abs(targetDistance - currentDistance) < 0.5) {
        currentDistance = targetDistance;
      }
    }

    const distance = currentDistance;
    const point = roadPath.getPointAtLength(distance);

    traveler.setAttribute("cx", String(point.x));
    traveler.setAttribute("cy", String(point.y));
    travelerHighlight.setAttribute("cx", String(point.x - 5));
    travelerHighlight.setAttribute("cy", String(point.y - 6));

    pointsOnPath.forEach((checkpointLength, index) => {
      if (distance >= checkpointLength) {
        stopsContainer.children[index].classList.add("is-revealed");
      }
    });

    if (!prefersReducedMotion && Math.abs(targetDistance - currentDistance) >= 0.5) {
      window.requestAnimationFrame(updateMemoryWalk);
    } else {
      scheduledFrame = false;
      lastFrameTime = null;
    }
  };

  const requestMemoryWalkUpdate = () => {
    if (!scheduledFrame) {
      scheduledFrame = true;
      window.requestAnimationFrame((frameTime) => {
        lastFrameTime = frameTime;
        updateMemoryWalk(frameTime);
      });
    }
  };

  window.addEventListener("scroll", requestMemoryWalkUpdate, { passive: true });
  window.addEventListener("resize", requestMemoryWalkUpdate);
  requestMemoryWalkUpdate();
}
