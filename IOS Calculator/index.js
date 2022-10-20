const display = document.querySelector(".row-1");

let numberInput = [];
let calculatedValue = 0;

const setInnerHtml = (value) =>
  (document.querySelector(".row-1").innerHTML = `<p>${value}</p>`);

const backspace = () => {
  const displayValue = display.innerText;
  if (displayValue.length > 1) {
    const updatedValue = displayValue.slice(0, -1);
    setInnerHtml(updatedValue);
    numberInput[numberInput.length - 1] = parseInt(updatedValue);
    return;
  } else return setInnerHtml("0");
};

const initializDisplay = (value = 0) => {
  numberInput = [];
  setInnerHtml(value);
};

const performOperation = (value) => {
  const operatorOne = numberInput[0];
  const operatorTwo = numberInput[2];
  const operand = numberInput[1];

  if (value === "C") return initializDisplay();

  if (value === "backspace") return backspace();

  for (let i = 0; i < numberInput.length; i++) {}

  if (value === "=") {
    switch (operand) {
      case "+":
        calculatedValue = operatorOne + operatorTwo;
        initializDisplay(calculatedValue);
        break;
      case "-":
        calculatedValue = operatorOne - operatorTwo;
        initializDisplay(calculatedValue);
        break;
      case "*":
        calculatedValue = operatorOne * operatorTwo;
        initializDisplay(calculatedValue);
        break;
      case "÷":
        calculatedValue = operatorOne / operatorTwo;
        initializDisplay(calculatedValue);
        break;
      default:
        break;
    }
  }
};
const getUserInput = (value) => {
  const displayData = display.innerText;
  if (displayData === "0" && displayData.length === 1) display.innerText = "";
  if (Number.isNaN(parseInt(value))) {
    if (value !== "C" && value !== "backspace") {
      numberInput = [...numberInput, parseInt(displayData), value];
      setInnerHtml("0");
    }

    return performOperation(value);
  }
  setInnerHtml((display.innerText += value));
};
