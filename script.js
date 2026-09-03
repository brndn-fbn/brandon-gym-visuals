/* =========================================
BRANDON / FRAME
Interactive Portfolio
========================================= */

/* =========================================
YEAR
========================================= */

const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

/* =========================================
STICKY HEADER
========================================= */

const siteHeader = document.getElementById("siteHeader");

function updateHeader() {
  if (!siteHeader) return;

  siteHeader.classList.toggle(
    "scrolled",
    window.scrollY > 40
  );
}

window.addEventListener("scroll", updateHeader, {
  passive: true
});

updateHeader();

/* =========================================
BACKGROUND MUSIC
========================================= */

const soundToggle =
  document.getElementById("soundToggle");

const soundLabel =
  document.getElementById("soundLabel");

const bgMusic =
  document.getElementById("bgMusic");

let musicPlaying = false;

function updateSoundUI() {

  if (!soundToggle || !soundLabel) {
    return;
  }

  soundToggle.classList.toggle(
    "active",
    musicPlaying
  );

  soundLabel.textContent =
    musicPlaying
      ? "Sound on"
      : "Sound off";
}

async function toggleMusic() {

  if (!bgMusic) {
    return;
  }

  if (!musicPlaying) {


    try {

      bgMusic.volume = 0.2;

      await bgMusic.play();

      musicPlaying = true;

    } catch (error) {

      console.log(
        "Audio playback failed:",
        error
      );

      musicPlaying = false;
    }


  } else {


    bgMusic.pause();

    musicPlaying = false;


  }

  updateSoundUI();
}

if (soundToggle) {

  soundToggle.addEventListener(
    "click",
    toggleMusic
  );

}

updateSoundUI();

/* =========================================
MOTION CAROUSEL
========================================= */

const slides =
  document.querySelectorAll(".film-slide");

const previousButton =
  document.getElementById("prevFilm");

const nextButton =
  document.getElementById("nextFilm");

const currentFilm =
  document.getElementById("currentFilm");

const filmTitle =
  document.getElementById("filmTitle");

const filmProgress =
  document.getElementById("filmProgress");

const motionTitles = [
  "Training Session",
  "Loaded Movement",
  "Controlled Eccentric",
  "Working Reps",
  "Isolated Movement",
  "Movement Study"
];

/* =========================================
STILLS TABS
========================================= */

const stillsTabs =
  document.querySelectorAll(".stills-tab");

function showStillsPanel(targetId) {

  stillsTabs.forEach((tab) => {

    const isActive =
      tab.dataset.target === targetId;

    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", isActive ? "true" : "false");
    tab.tabIndex = isActive ? 0 : -1;

  });

  document
    .querySelectorAll('.photo-grid[id^="panel-"]')
    .forEach((panel) => {
      panel.hidden = panel.id !== targetId;
    });

}

stillsTabs.forEach((tab) => {

  tab.addEventListener("click", () => {
    showStillsPanel(tab.dataset.target);
  });

});

let currentIndex = 0;

/* =========================================
SHOW MOTION
========================================= */

function showMotion(index) {

  if (!slides.length) {
    return;
  }

  if (index < 0) {
    index = slides.length - 1;
  }

  if (index >= slides.length) {
    index = 0;
  }

  currentIndex = index;

  slides.forEach((slide, slideIndex) => {


    slide.classList.toggle(
      "active",
      slideIndex === currentIndex
    );


  });

  if (currentFilm) {


    currentFilm.textContent =
      String(currentIndex + 1).padStart(2, "0");


  }

  if (filmTitle) {


    filmTitle.textContent =
      motionTitles[currentIndex] || "";


  }

  if (filmProgress) {


    const percentage =
      ((currentIndex + 1) / slides.length) * 100;

    filmProgress.style.width =
      `${percentage}%`;


  }
}

/* =========================================
NEXT / PREVIOUS
========================================= */

if (nextButton) {

  nextButton.addEventListener(
    "click",
    () => {
      showMotion(currentIndex + 1);
    }
  );

}

if (previousButton) {

  previousButton.addEventListener(
    "click",
    () => {
      showMotion(currentIndex - 1);
    }
  );

}

/* =========================================
KEYBOARD NAVIGATION
========================================= */

document.addEventListener(
  "keydown",
  (event) => {


    if (event.key === "ArrowRight") {
      showMotion(currentIndex + 1);
    }

    if (event.key === "ArrowLeft") {
      showMotion(currentIndex - 1);
    }


  }
);

/* =========================================
TOUCH / SWIPE
========================================= */

let touchStartX = 0;
let touchEndX = 0;

const filmStage =
  document.querySelector(".film-stage");

if (filmStage) {

  filmStage.addEventListener(
    "touchstart",
    (event) => {


      touchStartX =
        event.changedTouches[0].screenX;

    },
    { passive: true }


  );

  filmStage.addEventListener(
    "touchend",
    (event) => {


      touchEndX =
        event.changedTouches[0].screenX;

      const distance =
        touchEndX - touchStartX;


      if (Math.abs(distance) < 50) {
        return;
      }


      if (distance < 0) {

        showMotion(currentIndex + 1);

      } else {

        showMotion(currentIndex - 1);

      }

    },
    { passive: true }


  );

}

/* =========================================
INITIALIZE
========================================= */

showMotion(0);
