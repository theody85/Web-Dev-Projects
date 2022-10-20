const inputs = document.querySelectorAll(".letter-input");
const loader = document.querySelector(".loader");
const header = document.querySelector(".header");
const POST_URL = "https://words.dev-apis.com/validate-word";
const GET_URL = "https://words.dev-apis.com/word-of-the-day";
const WORD_LENGTH = 5;
const NUM_GUESSES = 5;
let currentRow = 0;
let currentWord = "";
let wordOfTheDay = "";

const getWordOfTheDay = async () => {
  const res = await fetch(GET_URL);
  const { word } = await res.json();

  return word;
};

const isLetter = (letter) => {
  return /^[a-zA-Z]$/.test(letter);
};

const addLetter = (letter) => {
  if (currentWord.length < WORD_LENGTH) {
    currentWord += letter;
    inputs[currentRow * WORD_LENGTH + currentWord.length - 1].value = letter;
  }
};

const backSpace = () => {
  currentWord = currentWord.slice(0, -1);
  inputs[currentRow * WORD_LENGTH + currentWord.length].value = "";
  inputs.forEach((input) =>
    input.classList.contains("invalid") ? input.classList.remove("invalid") : ""
  );
};

const setloading = (loadingStatus) => {
  if (loadingStatus) loader.style.visibility = "visible";
  else loader.style.visibility = "hidden";
};

const winFunc = () => {
  let startIndex = currentRow * WORD_LENGTH;
  let stopIndex = currentRow * WORD_LENGTH + currentWord.length - 1;

  header.classList.add("winner");
  // inputs.forEach((input, index) =>
  //   (input.value && (index >= startIndex && index <= stopIndex)) ? input.classList.add("winner") : ""
  // );

  alert("You win");
};
const lossFunc = () => {
  alert(`You lose, word is ${wordOfTheDay.toUpperCase()}`);
};
const validFunc = async (current) => {
  !wordOfTheDay ? (wordOfTheDay = await getWordOfTheDay()) : "";
  let count = 0;

  [...current].forEach((letter, i) => {
    let flag = 0;
    let shouldSkip = false;

    [...wordOfTheDay].forEach((char, j) => {
      if (letter === char) {
        flag = 1;
        shouldSkip = true;
        if (i === j) {
          inputs[currentRow * WORD_LENGTH + i].classList.add("highlight-green");
          count++;
        } else {
          for (let k = 0; k < i; k++) {
            if (current[k] === letter) flag = 0;
          }
          flag &&
            inputs[currentRow * WORD_LENGTH + i].classList.add(
              "highlight-yellow"
            );
        }
      }
      if (shouldSkip) return;
    });

    !flag &&
      inputs[currentRow * WORD_LENGTH + i].classList.add("highlight-grey");
  });

  if (count === 5) return winFunc();
  if (currentRow === NUM_GUESSES) return lossFunc();
  currentRow++;
  currentWord = "";
};

const invalidFunc = () => {
  let startIndex = currentRow * WORD_LENGTH;
  let stopIndex = currentRow * WORD_LENGTH + currentWord.length - 1;

  inputs.forEach((input, index) =>
    input.value && index >= startIndex && index <= stopIndex
      ? input.classList.toggle("invalid")
      : ""
  );
};

const validateWord = async () => {
  if (currentWord.length !== WORD_LENGTH) return;
  setloading(true);

  const res = await fetch(POST_URL, {
    method: "POST",
    body: JSON.stringify({ word: currentWord }),
  });
  const { validWord } = await res.json();
  setloading(false);

  if (validWord) return validFunc(currentWord);
  if (!validWord) return invalidFunc();
};

const init = () => {
  document.addEventListener("keydown", (event) => {
    const key = event.key;
    if (key === "Backspace") return backSpace();
    if (key === "Enter") return validateWord();
    if (!isLetter(key)) return event.preventDefault();
    addLetter(key.toLowerCase());
  });
};

init();
