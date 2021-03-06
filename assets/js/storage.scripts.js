// declare variable untuk menjadi key
const CACHE_KEY = "calculation_history";

// fungsi pengecekan Storage pada browser
function checkForStorage() {
  return typeof Storage !== "undefined";
}

// fungsi menyimpan riwayat kalkulasi
function putHistory(data) {
  if (checkForStorage()) {
    let historyData = null;
    if (localStorage.getItem(CACHE_KEY) === null) {
      historyData = [];
    } else {
      historyData = JSON.parse(localStorage.getItem(CACHE_KEY));
    }

    historyData.unshift(data);

    if (historyData.length > 5) {
      historyData.pop();
    }

    localStorage.setItem(CACHE_KEY, JSON.stringify(historyData));
  }
}

// fungsi untuk mendapatkan data dari storage
function showHistory() {
  if (checkForStorage()) {
    return JSON.parse(localStorage.getItem(CACHE_KEY)) || [];
  } else {
    return [];
  }
}

// fungsi untuk merender data riwayat kalkulasi
function renderHistory() {
  const historyData = showHistory();
  let historyList = document.querySelector("#historyList");

  // selalu hapus konten HTML pada elemen historyList agar tidak menampilkan data ganda
  historyList.innerHTML = "";

  for (let history of historyData) {
    let row = document.createElement("tr");
    row.innerHTML = "<td>" + history.firstNumber + "</td>";
    row.innerHTML += "<td>" + history.operator + "</td>";
    row.innerHTML += "<td>" + history.secondNumber + "</td>";
    row.innerHTML += "<td>" + history.result + "</td>";

    historyList.appendChild(row);
  }
}

const removeButton = document.getElementById("removeBtn");
// clear history
removeButton.addEventListener("click", function (event) {
  localStorage.removeItem(CACHE_KEY);
  renderHistory();
});

// agar history muncul di awal membuka page
renderHistory();
