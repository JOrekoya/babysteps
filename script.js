alert("Hello, World!")

 let changeColorButton = document.querySelector("#change-color-btn");

    changeColorButton.addEventListener("click", function() {
        document.body.style.backgroundColor = "lightblue";
    });