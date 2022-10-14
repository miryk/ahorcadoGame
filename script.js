let wordsList = [
  "vidriera",
  "flores",
  "cigarrillos",
  "ola",
  "asado",
  "paz",
  "hueso",
  "palmera",
  "profesor",
  "sudor",
  "llavero",
  "heladera",
  "submarino",
  "servilleta",
  "hermano",
  "pesadilla",
  "trompeta",
  "sombrero",
  "fotos",
  "berenjena",
  "teja",
  "comisario",
  "diente",
  "pimienta",
  "kiwi",
  "merienda",
  "navidad",
  "cafetera",
  "viento",
  "laguna",
];

// DOM elements
const letters = document.querySelector(".letters");
const input = document.querySelector("#input");
const tries = document.querySelector(".tries span");
const wrongLetter = document.querySelector(".wrong-letter span");
const startBtn = document.querySelector("#start");
const form = document.querySelector("#input");

// states
let word;
let incorrectLetters = [];
let correctLetters = [];
let maxGuesses;

// event listeners
startBtn.addEventListener("click", init);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  // estandariza las letras en minúsculas
  let key = e.target[0].value.toLowerCase();
  assess(key);
  // vaciar el campo
  e.target[0].value = "";
});

init();

function init() {
  // esconde los mensajes
  document.getElementById("win").style.display = "none";
  document.getElementById("lose").style.display = "none";

  // genera una palabra random
  word = wordsList[Math.floor(Math.random() * wordsList.length)];
  // console.log(word);

  // inicializa letras correctas e incorrectas
  correctLetters = [];
  incorrectLetters = [];

  // inicializa contador de intentos
  maxGuesses = 10;

  // muestra intentos restantes
  tries.innerText = maxGuesses;

  // inicializa letras incorrectas
  wrongLetter.innerText = incorrectLetters;

  // se generan las cajas según la longitud de la palabra:
  let html = "";
  for (let i = 0; i < word.length; i++) {
    html += `<input type="text" disabled>`;
    letters.innerHTML = html;
  }
}

function assess(key) {
  // no es letra
  if (!key.match(/[A-Za-z]/)) {
    alert("Por favor, ingresa una letra");
    return;
  }

  // letra repetida
  if (incorrectLetters.includes(key) || correctLetters.includes(key)) {
    alert("Ya dijiste esa letra");
    return;
  }

  // letra no repetida, entonces buscar en palabra
  if (word.includes(key)) {
    for (let i = 0; i < word.length; i++) {
      if (word[i] == key) {
        correctLetters.push(key);

        // carga la letra en el cuadro
        letters.querySelectorAll("input")[i].value = key;

        if (word.length == correctLetters.length) {
          win = document.getElementById("win");
          win.style.display = "block";
        }
      }
    }
  } else {
    // cuando no tiene la letra:
    if (maxGuesses > 1) {
      maxGuesses--;
      incorrectLetters.push(key);
      tries.innerText = maxGuesses;
      wrongLetter.innerText = incorrectLetters;
    } else {
      maxGuesses--;
      tries.innerText = maxGuesses;
      lose = document.getElementById("lose");
      lose.style.display = "block";
    }
  }
}
