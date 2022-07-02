// set tampilan
// create object
const calculator = {
  result: "0", //angka yang muncul pada result
  operator: null, //operator yang dipilih
  firstNumber: null, //angka pertama yang diinputkan
  secondNumber: null,
  waitingForSecondNumber: false, //logika untuk menunggu input angka yang kedua
  waitingForOperation: false,
};

// create function

// mengupdate nilai pada result
function updateDisplay() {
  document.querySelector("#result").innerText = calculator.result;
}

function updateDisplayOperation() {
  if (calculator.waitingForOperation === true) {
    document.querySelector("#sn").innerText = calculator.secondNumber;
    document.querySelector("#eql").innerText = "=";
  } else {
    document.querySelector("#fn").innerText = calculator.firstNumber;
    document.querySelector("#op").innerText = calculator.operator;
  }
}

function removeDisplayOperation() {
  document.getElementById("fn").innerHTML = "";
  document.getElementById("sn").innerHTML = "";
  document.getElementById("op").innerHTML = "";
  document.getElementById("eql").innerHTML = "";
}

// mengset calculator ke awal/clear
function clearCalc() {
  calculator.result = "0";
  calculator.operator = null;
  calculator.firstNumber = null;
  calculator.secondNumber = null;
  (calculator.waitingForSecondNumber = false),
    (calculator.waitingForOperation = false);

  removeDisplayOperation();
}

// memasukkan angka ke dalam nilai calculator.displayNumber
function inputDigit(digit) {
  if (calculator.waitingForOperation === true) {
    clearCalc();
  }

  if (calculator.waitingForSecondNumber === true) {
    if (calculator.secondNumber === null || calculator.secondNumber === "0") {
      calculator.secondNumber = digit;
    } else if (calculator.secondNumber.length == 16) {
      return;
    } else {
      calculator.secondNumber += digit;
    }

    calculator.result = calculator.secondNumber;
  } else {
    if (calculator.result === "0") {
      calculator.result = digit;
    } else if (calculator.result.length == 16) {
      return;
    } else {
      calculator.result += digit;
    }
  }
}

// klik button negative
function inverseNumber() {
  if (calculator.result === "0") {
    return;
  } else if (calculator.waitingForSecondNumber === false) {
    calculator.result = calculator.result * -1;
  } else {
    calculator.secondNumber = calculator.secondNumber * -1;
    calculator.result = calculator.secondNumber;
  }
}

// klik button operator
function handleOperator(operator) {
  if (!calculator.waitingForSecondNumber) {
    calculator.operator = operator;
    calculator.waitingForSecondNumber = true;
    calculator.firstNumber = calculator.result;

    // mengatur nilai secondNumber
    // calculator.secondNumber = '0';
  } else {
    alert("operator sudah ditetapkan");
  }
}

// melakukan kalkukalasi
function performCalc() {
  // calculator.waitingForSecondNumber = false;

  if (calculator.firstNumber == null || calculator.operator == null) {
    alert("Anda belum menetapkan operator");

    return;
  } else if (calculator.secondNumber == null && calculator.operator !== null) {
    calculator.secondNumber = calculator.firstNumber;
  }

  let results = 0;
  // let temp = '0';
  if (calculator.operator === "+") {
    results = parseInt(calculator.firstNumber) + parseInt(calculator.result);
  } else {
    results = parseInt(calculator.firstNumber) - parseInt(calculator.result);
  }

  calculator.result = results.toString();
  calculator.waitingForOperation = true;

  // if (calculator.waitingForSecondNumber === true) {
  // 	if (calculator.operator === "+") {
  // 		results = parseInt(calculator.firstNumber) + parseInt(calculator.result);
  // 	} else {
  // 		results = parseInt(calculator.firstNumber) - parseInt(calculator.result);
  // 	}

  // 	temp = calculator.result;
  // 	calculator.waitingForSecondNumber = false;
  // } else {
  // 	if (calculator.operator === "+") {
  // 		results = parseInt(calculator.firstNumber) + parseInt(temp);
  // 	} else {
  // 		results = parseInt(calculator.firstNumber) - parseInt(temp);
  // 	}
  // }

  // calculator.firstNumber = results.toString();
  // calculator.result = results.toString();
}

// melakukan delete
function delNumber() {
  if (calculator.result.length == 1) {
    calculator.result = "0";
  } else {
    // calculator.result = calculator.result.substring(0, calculator.result.length-1);
    calculator.result = calculator.result.slice(0, -1);
  }
}

const buttons = document.querySelectorAll(".button");
// event handler button
for (let button of buttons) {
  // input angka
  button.addEventListener("click", function (event) {
    // mendapat objek elemen yang di klik
    const target = event.target;

    if (target.classList.contains("clear")) {
      clearCalc();
      updateDisplay();

      return;
    }

    if (target.classList.contains("negative")) {
      inverseNumber();
      updateDisplay();

      return;
    }

    if (target.classList.contains("equals")) {
      performCalc();
      updateDisplayOperation();
      updateDisplay();

      return;
    }

    if (target.classList.contains("operator")) {
      handleOperator(target.innerText);
      updateDisplayOperation();

      return;
    }

    if (target.classList.contains("del")) {
      delNumber();
      updateDisplay();

      return;
    }

    // button tap
    inputDigit(target.innerText);
    updateDisplay();
  });
}
