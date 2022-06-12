//* =================================================
//*                     IOS CALCULATOR
//* =================================================
//? Ekranlar
const prevDisp = document.querySelector(".previous-display");
const currDisp = document.querySelector(".current-display");

//?Button container
const btnContainer = document.querySelector(".buttons-container");

//? ara degerler icin degisken tanimlamalari
let currOperand = "";
let previousOperand = "";
let operation = "";

//? Butonlari tasiyan container icin event tanimlamasi
btnContainer.addEventListener("click", (e) => {
  //? Herhangi bir sayi(num) sayiya tiklanildi ise
  if (e.target.classList.contains("num")) {
    appendNumber(e.target.textContent);
    updateDisplay();
  }

  //? Herhangi bir operator butonuna (+,-,x,/) tiklanildi ise
  if (e.target.classList.contains("operator")) {
    chooseOperator(e.target.textContent);
    updateDisplay();
  }
  //? Esittir butonuna tiklanildi ise
  if (e.target.classList.contains("equal")) {
    calculate();
    updateDisplay();
  }

  // ac butonuna tıklandı ise
  if (e.target.classList.contains("ac")) {
    previousOperand = "";
    currOperand = "";
    operation = "";
    updateDisplay();
  }
  // PM butonuna tıklandı ise
  if (e.target.classList.contains("pm")) {
    if (!currOperand) return; // currOperand yoksa geri dön. işlemi yapma
    currOperand *= -1;
    updateDisplay();
  }

  // percent butonuna tıklandı ise
  if (e.target.classList.contains("percent")) {
    if (!currOperand) return;
    currOperand = currOperand / 100;
  }
});

const appendNumber = (num) => {
  //? Eger onceden 0 girilmisse ve tekrardan 0 girilise geri don
  if (currOperand === "0" && num === "0") return;

  //? Eğer ilk olarak 0 girilmisse ve sonrasinda da . haricinde baska
  //? bir sayi girilmis ise sadece girilen yeni sayiyi degiskene aktar.
  //? Orn: 09 => 9 , 03 => 3 , 0.1 => 0.1
  if (currOperand === "0" && num !== ".") {
    currOperand = num;
    return;
  }

  //? Eğer şu anki sayi . ise ve önceki girilen sayi . iceriyorsa geri don
  if (num === "." && currOperand.includes(".")) return;

  if (currOperand.length > 10) return;
  //? Girilen sayilari birlestir.
  currOperand += num;
};

const updateDisplay = () => {
  if (currOperand.toString().length > 11) {
    currOperand = Number(currOperand).toExponential(5);
  }
  currDisp.textContent = currOperand;
  prevDisp.textContent = `${previousOperand} ${operation}`;
};

const chooseOperator = (op) => {
  //? ilk sayi girisiinden sonraki islemleri gercekletir
  if (previousOperand) {
    calculate();
  }

  //? Degisken swapiing
  operation = op;
  previousOperand = currOperand;
  currOperand = "";
};

const calculate = () => {
  let calculation = 0;

  const prev = Number(previousOperand);
  const current = Number(currOperand);

  switch (operation) {
    case "+":
      calculation = prev + current;
      break;
    case "-":
      calculation = prev - current;
      break;
    case "x":
      calculation = prev * current;
      break;
    case "÷":
      calculation = prev / current;
      break;
    default:
      return;
  }

  currOperand = calculation;

  //? Esittir butonuna tiklanildiginda ekranda gozukmemesi icin
  //? previousOperand ve operation'ı silmemiz gerekir
  previousOperand = "";
  operation = "";
};
