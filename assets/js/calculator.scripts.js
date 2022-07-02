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

// declare variable
const finalResult = document.getElementById("result");
const firstNumber = document.getElementById("fn");
const secondNumber = document.getElementById("sn");
const operator = document.getElementById("op");
const equal = document.getElementById("eql");
const buttons = document.querySelectorAll(".button");

// create function
// mengupdate nilai pada result
function updateDisplay() {
  finalResult.innerText = calculator.result;
  console.log("update display");
}

function updateDisplayOperation() {
  if (calculator.waitingForOperation === true) {
    secondNumber.innerText = calculator.secondNumber;
    firstNumber.innerText = calculator.firstNumber;
    equal.innerText = "=";
  } else {
    firstNumber.innerText = calculator.firstNumber;
    operator.innerText = calculator.operator;
  }
  console.log("update display operation");
  console.log(calculator.firstNumber);
  console.log(calculator.secondNumber);
}

function removeDisplayOperation() {
  firstNumber.innerHTML = "";
  secondNumber.innerHTML = "";
  operator.innerHTML = "";
  equal.innerHTML = "";

  console.log("remove display operation");
}

// mengset calculator ke awal/clear
function clearCalc() {
  calculator.result = "0";
  calculator.operator = null;
  calculator.firstNumber = null;
  calculator.secondNumber = null;
  calculator.waitingForSecondNumber = false;
  calculator.waitingForOperation = false;

  removeDisplayOperation();
  console.log("hapus semua operations");
}

// memasukkan angka ke dalam nilai calculator.displayNumber
function inputDigit(digit) {
  if (calculator.waitingForOperation === true) {
    clearCalc();
  } else {
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
  if (calculator.firstNumber == null || calculator.operator == null) {
    alert("Anda belum menetapkan operator");
    return;
  } else if (calculator.secondNumber == null && calculator.operator !== null) {
    calculator.secondNumber = calculator.firstNumber;
    calculator.waitingForSecondNumber = false;
    calculator.waitingForOperation = true;
  } else {
    let results = 0;
    // let temp = '0';
    if (calculator.waitingForOperation === false) {
      if (calculator.operator === "+") {
        results =
          parseInt(calculator.firstNumber) + parseInt(calculator.result);
      } else {
        results =
          parseInt(calculator.firstNumber) - parseInt(calculator.result);
      }

      calculator.result = results.toString();
      calculator.waitingForSecondNumber = false;
      calculator.waitingForOperation = true;
    } else {
      if (calculator.operator === "+") {
        results =
          parseInt(calculator.result) + parseInt(calculator.secondNumber);
      } else {
        results =
          parseInt(calculator.result) - parseInt(calculator.secondNumber);
      }
      // 	temp = calculator.result;
      // 	calculator.waitingForSecondNumber = false;
      // } else {
      // 	if (calculator.operator === "+") {
      // 		results = parseInt(calculator.firstNumber) + parseInt(temp);
      // 	} else {
      // 		results = parseInt(calculator.firstNumber) - parseInt(temp);
      // 	}

      calculator.firstNumber = calculator.result.toString();
      calculator.result = results.toString();

      console.log(calculator.firstNumber);
      console.log(calculator.operator);
      console.log(calculator.secondNumber);
      console.log(calculator.result);
      console.log(results);
    }
  }
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

// event handler button
for (let button of buttons) {
  // input angka
  button.addEventListener(
    "click",
    function (event) {
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
    },
    false
  );
}
