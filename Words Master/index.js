/**
 * Restrict inputs to just letters - DONE!!
 * 1. Make each input field accept only one letter - DONE!!
 * 2. Pass on next key press to the next input field
 * 3. Validation .....
 */
const letters = document.querySelectorAll(".letter-board");
const wordLength = 5;
let currentWord = "";
let currentRow = 0

const isLetter = (letter) => {
  return /^[a-zA-Z]$/.test(letter);
}
const addLetter = (letter) => {
  if(currentWord.length < wordLength) currentWord += letter;
  
  letters[currentRow * wordLength + currentWord.length - 1].innerText = letter;
  
}
const init = () => {
  document.addEventListener("keydown", (event) => {
    const key = event.key;

    if (key == "Backspace") return backSpace();
    if (key === "Enter") return;
    if (isLetter(key)) addLetter(key);
  });
};

init();