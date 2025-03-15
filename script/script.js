let noText = document.getElementById("noText");
const learn = document.getElementById("learn");

learn.style.display = "none";

function info(id) {
  document.getElementById("wordDetails").showModal();
  let url = `https://openapi.programming-hero.com/api/word/${id}`;

  fetch(url)
    .then((response) => response.json())
    .then((words) => {
      let details = document.getElementById("Details");
      let meaning = words.data.meaning;

      if (meaning != null || meaning != undefined) {
        details.innerHTML = `
    <h1 class="text-2xl font-bold">${words.data.word}(<i class="fa-solid fa-microphone">:${words.data.pronunciation}</i>)</h1>
    <h1 class="font-bold mt-3">Meaning</h1>
    <h1 class="font-bold mt-1">${words.data.meaning}</h1>
    <h1 class="font-bold mt-3">Example</h1>
    <h1 class="mt-1">${words.data.sentence}</h1>
    <h1 class="font-bold mt-3 mb-1">সমার্থক শব্দ গুলো</h1>
    <div id="synonyms" class="grid grid-cols-2 md:grid-cols-4 gap-5">
    </div>
    <div class="modal-action flex">
      <form method="dialog">
        <button class="btn bg-[#422AD5] text-white rounded-lg">Complete Learning</button>
      </form>
    </div>
    `;
        let syn = document.getElementById("synonyms");
        for (let synonym of words.data.synonyms) {
          let synWord = document.createElement("div");
          synWord.innerHTML = `<h1 class="font-bold bg-slate-200 rounded-lg text-center text-sm p-2">${synonym}</h1>`;
          syn.appendChild(synWord);
        }
      } else {
        details.innerHTML = `
    <h1 class="text-2xl font-bold">${words.data.word}(<i class="fa-solid fa-microphone">:${words.data.pronunciation}</i>)</h1>
    <h1 class="font-bold mt-3">Meaning</h1>
    <h1 class="font-bold mt-1">No Word Meaning is Found</h1>
    <h1 class="font-bold mt-3">Example</h1>
    <h1 class="mt-1">${words.data.sentence}</h1>
    <h1 class="font-bold mt-3 mb-1">সমার্থক শব্দ গুলো</h1>
    <div id="synonyms" class="grid grid-cols-2 md:grid-cols-4 gap-5">
    </div>
    <div class="modal-action flex">
      <form method="dialog">
        <button class="btn bg-[#422AD5] text-white rounded-lg">Complete Learning</button>
      </form>
    </div>
    `;
        let syn = document.getElementById("synonyms");
        for (let synonym of words.data.synonyms) {
          let synWord = document.createElement("div");
          synWord.innerHTML = `<h1 class="font-bold bg-slate-200 rounded-lg text-center text-sm p-2">${synonym}</h1>`;
          syn.appendChild(synWord);
        }
      }
    });
}

function lesson1(id) {
  showLoader();
  inactiveBtn();
  activeBtn(id);
  let url = `https://openapi.programming-hero.com/api/level/${id}`;
  noText.style.display = "none";
  fetch(url)
    .then((response) => response.json())
    .then((words) => loadWords(words.data));
}

const loadWords = (Words) => {
  learn.innerHTML = "";
  learn.style.display = "grid";
  if (Words.length === 0) {
    removeLoader();
    noText.style.display = "flex";
    learn.style.display = "none";

    noText.innerHTML = `
    <img src="assets/alert-error.png" alt="">
    <h1 class="text-center mb-5">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</h1>
    <h1 class="text-center text-2xl md:text-5xl">নেক্সট Lesson এ যান</h1>
    `;
  }
  Words.forEach((word) => {
    let meaning = word.meaning;

    if (meaning != null || meaning != undefined) {
      let card = document.createElement("div");
      card.innerHTML = `
        <div class="card h-[220px] p-5 shadow-lg bg-white">
                <div class="card-body items-center text-center">
                    <h2 class="card-title">${word.word}</h2>
                    <p>Meaning/Pronunciation</p>
                    <h1>"${word.meaning}/${word.pronunciation}"</h1>
                    <div class="flex items-center justify-between w-4/5 text-xl">
                        <i onclick="info(${word.id})" class="fa-solid fa-circle-info p-2"></i>
                        <i class="fa-solid fa-volume-high"></i>
                    </div>
                </div>
            </div>
        `;

      learn.appendChild(card);
    } else {
      let card = document.createElement("div");
      card.innerHTML = `
        <div class="card h-[220px] p-5 shadow-lg bg-white">
                <div class="card-body items-center text-center">
                    <h2 class="card-title">${word.word}</h2>
                    <p>Meaning/Pronunciation</p>
                    <h1>"No Word meaning is Found/${word.pronunciation}"</h1>
                    <div class="flex items-center justify-between w-4/5 text-xl">
                        <i onclick="info(${word.id})" class="fa-solid fa-circle-info p-2"></i>
                        <i class="fa-solid fa-volume-high"></i>
                    </div>
                </div>
            </div>
        `;

      learn.appendChild(card);
    }
    removeLoader();
  });
};

let header = document.getElementById("header");
let hero = document.getElementById("hero");
let learnSec = document.getElementById("learnSec");
let FAQ = document.getElementById("FAQ");

header.style.display = "none";
learnSec.style.display = "none";
FAQ.style.display = "none";

function login() {
  let username = document.getElementById("username").value;
  let pin = document.getElementById("pin").value;

  if (typeof(username) == "string") {
    if (pin == 123456) {
      hero.style.display = "none";
      header.style.display = "flex";
      learnSec.style.display = "flex";
      FAQ.style.display = "flex";
    }else{
        alert("Enter correct pin number");
    }
  }else{
    alert("Enter name in string not in number");
  }
}

function logout() {
  hero.style.display = "flex";
  header.style.display = "none";
  learnSec.style.display = "none";
  FAQ.style.display = "none";
}

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
}

function showLoader() {
  document.getElementById("learn").classList.add("hidden");
  document.getElementById("loader").classList.remove("hidden");
}

function removeLoader() {
  document.getElementById("learn").classList.remove("hidden");
  document.getElementById("loader").classList.add("hidden");
}

function activeBtn(lesson) {
  document.getElementById(lesson).classList.add("btnBg");
}

function inactiveBtn(lesson) {
  let activeBtns = document.getElementsByClassName("btnBg");

  for (let btn of activeBtns) {
    btn.classList.remove("btnBg");
  }
}
