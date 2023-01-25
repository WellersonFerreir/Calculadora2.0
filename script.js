let buttons = document.querySelectorAll('.number');

for(var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function(){
        var num = this.textContent;
        display.textContent = num;
      });
}
