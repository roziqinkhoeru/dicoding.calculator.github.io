// object calculator
const calculator = {
  displayNumber: "0",
  operator: null,
  firstNumber: null,
  secondNumber: null,
  resultNumber: "0",
  waitingForSecondNumber: false,
  waitingForSecondOperation: false,
  postiveNumber: true,
};

// declare var
const firstNumber = document.getElementById("firstNumber");
const secondNumber = document.getElementById("secondNumber");
const operation = document.getElementById("operation");
const equal = document.getElementById("equal");
const displayNumber = document.getElementById("displayNumber");
const buttons = document.querySelectorAll(".button");

// menampilkan angka ke dalam calculator.displayNumber
function updateDisplay() {
  displayNumber.innerText = calculator.displayNumber;
  firstNumber.innerText = calculator.firstNumber;
  operation.innerText = calculator.operator;
  if (calculator.waitingForSecondOperation === true) {
    equal.innerText = "=";
  }
  secondNumber.innerText = calculator.secondNumber;
}

// fungsi ketika menekan CE
function clearCalculator() {
  calculator.displayNumber = "0";
  calculator.operator = null;
  calculator.firstNumber = null;
  calculator.secondNumber = null;
  calculator.resultNumber = "0";
  calculator.waitingForSecondNumber = false;
  calculator.waitingForSecondOperation = false;
  equal.innerText = "";
  calculator.postiveNumber = true;
}

// fungsi ketika menekan angka
function inputDigit(digit) {
  if (calculator.waitingForSecondOperation === true) {
    clearCalculator();
  }

  if (calculator.resultNumber.length < 16) {
    if (calculator.resultNumber === "0") {
      calculator.resultNumber = digit;
    } else {
      calculator.resultNumber += digit;
    }
  } else {
    calculator.resultNumber += "";
  }
  calculator.displayNumber = calculator.resultNumber;

  console.log("panjang setela nambah =" + calculator.displayNumber.length);
  console.log("panjang setela nambah =" + calculator.resultNumber.length);
}

// fungsi ketika menekan tombol delete
function deleteNumber() {
  if (calculator.postiveNumber === true) {
    if (calculator.resultNumber.length === 1) {
      calculator.resultNumber = "0";
    } else {
      calculator.resultNumber = calculator.resultNumber.slice(0, -1);
    }
  } else {
    if (calculator.resultNumber.length === 2) {
      calculator.resultNumber = "0";
    } else {
      calculator.resultNumber = calculator.resultNumber.slice(0, -1);
    }
  }

  calculator.displayNumber = calculator.resultNumber;
}

// fungsi ketika menekan tombol negative
function inverseNumber() {
  if (calculator.resultNumber === "0") {
    return;
  }
  let inverse = parseInt(calculator.resultNumber) * -1;
  calculator.resultNumber = inverse.toString();
  calculator.displayNumber = calculator.resultNumber;
  calculator.postiveNumber = !calculator.postiveNumber;
}

// fungsi ketika menekan tombol operator
function handleOperator(operator) {
  // if (calculator.waitingForSecondNumber === false) {
  calculator.operator = operator;
  calculator.waitingForSecondNumber = true;
  calculator.firstNumber = calculator.displayNumber;

  calculator.resultNumber = "0";
  // } else {
  //   alert("Operator sudah ditetapkan");
  // }
}

// fungsi ketika menekan tombo sama dengan
function performCalculation() {
  if (calculator.waitingForSecondOperation === false) {
    if (calculator.firstNumber == null || calculator.operator == null) {
      alert("Anda belum menetapkan operator");
      return;
    }

    if (calculator.operator === "+") {
      calculator.resultNumber =
        parseInt(calculator.firstNumber) + parseInt(calculator.resultNumber);
    } else {
      calculator.resultNumber =
        parseInt(calculator.firstNumber) - parseInt(calculator.resultNumber);
    }

    calculator.secondNumber = calculator.displayNumber;
    calculator.waitingForSecondNumber = false;
    calculator.waitingForSecondOperation = true;
  } else {
    calculator.firstNumber = calculator.resultNumber;
    if (calculator.operator === "+") {
      calculator.resultNumber =
        parseInt(calculator.resultNumber) + parseInt(calculator.secondNumber);
    } else {
      calculator.resultNumber =
        parseInt(calculator.resultNumber) - parseInt(calculator.secondNumber);
    }
  }

  calculator.displayNumber = calculator.resultNumber;
}

// event saat menekan semua tombol
for (const button of buttons) {
  button.addEventListener("click", function (event) {
    // mendapatkan objek elemen yang diklik
    const target = event.target;

    // CLEAR BUTTTON
    if (target.classList.contains("clear")) {
      clearCalculator();
      updateDisplay();
      return; // agar kode dibawahnya tidak tereksekusi lagi
    }

    // DELETE BUTTON
    if (target.classList.contains("delete_btn")) {
      deleteNumber();
      updateDisplay();
      return;
    }

    // NEGATIVE BUTTON
    if (target.classList.contains("negative")) {
      inverseNumber();
      updateDisplay();
      return;
    }

    // EQUALS BUTTON
    if (target.classList.contains("equals")) {
      performCalculation();
      updateDisplay();
      return;
    }

    // OPERATOR BUTTON
    if (target.classList.contains("operator")) {
      handleOperator(target.innerText);
      updateDisplay();
      return;
    }

    inputDigit(target.innerText);
    updateDisplay();
  });
}
