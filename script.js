// alert("Hello, World!")

//  let changeColorButton = document.querySelector("#change-color-btn");

//     changeColorButton.addEventListener("click", function() {
//         document.body.style.backgroundColor = "lightblue";
//     });


function toggleColor() {
            if (document.body.style.backgroundColor === 'lightblue') {
                document.body.style.backgroundColor = 'lightpink';
            } else {
                document.body.style.backgroundColor = 'lightblue';
            }
        }