let buttons = document.querySelectorAll('.number');

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function () {
    var num = this.textContent;
    display.textContent = num;
  });
}

function performOperation(operator) {
  var num1 = parseFloat(display.textContent);
  var num2 = parseFloat(display.textContent);

  switch (operator) {
    case '+':
      result = num1 + num2;
      break;
    case '-':
      result = num1 - num2;
      break;
    case '*':
      result = num1 * num2;
      break;
    case '/':
      result = num1  /num2;
      break;
  }
  display.textContent = result;
}