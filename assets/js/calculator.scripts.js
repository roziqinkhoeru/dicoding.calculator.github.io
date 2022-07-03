// object calculator
const calculator = {
  displayNumber: "0",
  operator: null,
  firstNumber: null,
  waitingForSecondNumber: false,
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
}

// fungsi ketika menekan CE
function clearCalculator() {
  calculator.displayNumber = "0";
  calculator.operator = null;
  calculator.firstNumber = null;
  calculator.waitingForSecondNumber = false;
}

// fungsi ketika menekan angka
function inputDigit(digit) {
  if (calculator.displayNumber.length < 16) {
    if (calculator.displayNumber === "0") {
      calculator.displayNumber = digit;
    } else {
      calculator.displayNumber += digit;
    }
  } else {
    calculator.displayNumber += "";
  }
  console.log("panjang setela nambah =" + calculator.displayNumber.length);
}

// fungsi ketika menekan tombol negative
function inverseNumber() {
  if (calculator.displayNumber === "0") {
    return;
  }
  let inverse = parseInt(calculator.displayNumber) * -1;
  calculator.displayNumber = inverse.toString();
}

// fungsi ketika menekan tombol operator
function handleOperator(operator) {
  if (!calculator.waitingForSecondNumber) {
    calculator.operator = operator;
    calculator.waitingForSecondNumber = true;
    calculator.firstNumber = calculator.displayNumber;

    // mengatur ulang nilai display number supaya tombol selanjutnya dimulai dari angka pertama lagi
    calculator.displayNumber = "0";
  } else {
    alert("Operator sudah ditetapkan");
  }
}

// fungsi ketika menekan tombo ==
function performCalculation() {
  if (calculator.firstNumber == null || calculator.operator == null) {
    alert("Anda belum menetapkan operator");
    return;
  }

  let result = 0;
  if (calculator.operator === "+") {
    result =
      parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
  } else {
    result =
      parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber);
  }

  calculator.displayNumber = result;
}

// event saat menekan semua tombpl
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
      return;
    }

    inputDigit(target.innerText);
    updateDisplay();
  });
}
