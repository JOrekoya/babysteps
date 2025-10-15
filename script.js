let toggleColorButton = document.querySelector("#toggle-color");
toggleColorButton.addEventListener("click", toggleColor);

let sleepStartValue = document.querySelector("#sleep-start").value;
let sleepEndValue = document.querySelector("#sleep-end").value;


function toggleColor() {
            if (document.body.style.backgroundColor == 'lightblue') {
                document.body.style.backgroundColor = 'lightpink';
            } else if (document.body.style.backgroundColor == 'lightpink') {
                document.body.style.backgroundColor = '';
            } else if (document.body.style.backgroundColor == '') {
                document.body.style.backgroundColor = 'lightblue';
            }
        }

function logFeeding() {
    

}