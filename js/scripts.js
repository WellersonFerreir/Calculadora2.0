const previousOperationText = document.querySelector("#previous-operation");
// numero acumulado
const currentOperationText = document.querySelector("#current-operation");
// numero digitado
const buttons = document.querySelectorAll("#buttons-container button");
// captura de click nos botoes
// ^^^^^^^^seleção dos elementos^^^^^^^^
class Calculator {
  constructor(previousOperationText, currentOperationText) {
    this.previousOperationText = previousOperationText;
    this.currentOperationText = currentOperationText;
    // ^^^^^^impressos na tela^^^^^^
    this.currentOperation = "";
  }

  addDigit(digit) {
    // mosto dira gito no visor
    console.log(digit);
    if (digit === "." && this.currentOperationText.innerText.includes(".")) {
      return;
    }
    // condição para nao permitir mais de 1 "."

    this.currentOperation = digit;
    this.updateScreen();
    // metodo para atualizar a tela
  }

  processOperation(operation) {

    if (this.currentOperationText.innerText === "" && operation !== "C") {
      if (this.previousOperationText.innerText !== "") {
        this.changeOperation(operation);
      }
      return;
    }

    //  VVV MATEMATICA VVV
    let operationValue;
    let previous = +this.previousOperationText.innerText.split(" ")[0];
    // separar o texto em um array de strings  ^^
    let current = +this.currentOperationText.innerText;

    switch (operation) {
      case "+":
        operationValue = previous + current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "-":
        operationValue = previous - current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "*":
        operationValue = previous * current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "/":
        operationValue = previous / current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "DEL":
        this.processDelOperator();
        break;
      case "CE":
        this.processClearCurrentOperator();
        break;
      case "C":
        this.processClearOperator();
        break;
      case "=":
        this.processEqualOperator();
        break;
      default:
        return;
    }
  }
  // ^^^^ MATEMATICA ^^^^

  updateScreen(
    operationValue = null,
    operation = null,
    current = null,
    previous = null
  ) {

    if (operationValue === null) {
      this.currentOperationText.innerText += this.currentOperation;
      // concatena o texto
    } else {
      if (previous === 0) {
        operationValue = current;
      }
      // texto que vai para cima é nulo, ate alguem digita o primeiro
      this.previousOperationText.innerText = `${operationValue} ${operation}`;
      // adiciona o valor de todas as operaçoes + o atual
      this.currentOperationText.innerText = "";
      // zera a tela de texto atual
    }
  }

  changeOperation(operation) {
    const mathOperations = ["*", "-", "+", "/"];

    if (!mathOperations.includes(operation)) {
      return;
    }

    this.previousOperationText.innerText =
      this.previousOperationText.innerText.slice(0, -1) + operation;
    // muda o operador na tela de cima
  }

  processDelOperator() {
    this.currentOperationText.innerText =
      this.currentOperationText.innerText.slice(0, -1);
      
  }

  processClearCurrentOperator() {
    this.currentOperationText.innerText = "";
    // limpa a tela de baixo
  }

  processClearOperator() {
    this.currentOperationText.innerText = "";
    this.previousOperationText.innerText = "";
    // limpa tudo
  }

  processEqualOperator() {
    let operation = this.previousOperationText.innerText.split(" ")[1];
    // pega a operação do switch na posição 2
    this.processOperation(operation);

  }
}

// ^^^^^^Logica^^^^^^

const calc = new Calculator(previousOperationText, currentOperationText);

// ativar os eventos de click

buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const value = e.target.innerText;
    // recebe o valor do texto do click
    if (+value >= 0 || value === ".") {
      console.log(value);
      calc.addDigit(value);
    } else {
      calc.processOperation(value);
      // separa o numero do operador
    }
  });
});
