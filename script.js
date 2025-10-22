let toggleColorButton = document.querySelector("#toggle-color");
toggleColorButton.addEventListener("click", toggleColor);

let sleepForm = document.querySelector("#sleep-form");
let feedForm = document.querySelector("#feed-form");

sleepForm.addEventListener("submit", logSleep);
feedForm.addEventListener("submit", logFeeding);

function toggleColor() {
    if (document.body.style.backgroundColor == 'lightblue') {
        document.body.style.backgroundColor = 'lightpink';
    } else if (document.body.style.backgroundColor == 'lightpink') {
        document.body.style.backgroundColor = '';
    } else if (document.body.style.backgroundColor == '') {
        document.body.style.backgroundColor = 'lightblue';
    }
}

function logSleep(event) {
    event.preventDefault();
    
    let sleepStart = document.querySelector("#sleep-start").value;
    let sleepEnd = document.querySelector("#sleep-end").value;
    
    let sleepList = document.querySelector("#sleep-records ul");
    let listItem = document.createElement("li");
    listItem.textContent = `Start: ${new Date(sleepStart).toLocaleString()} - End: ${new Date(sleepEnd).toLocaleString()}`;
    
    sleepList.appendChild(listItem);
    
    sleepForm.reset();
}

function logFeeding(event) {
    event.preventDefault();
    
    let feedStart = document.querySelector("#feed-start").value;
    let feedEnd = document.querySelector("#feed-end").value;
    
    let feedList = document.querySelector("#feed-records ul");
    let listItem = document.createElement("li");
    listItem.textContent = `Start: ${new Date(feedStart).toLocaleString()} - End: ${new Date(feedEnd).toLocaleString()}`;
    
    feedList.appendChild(listItem);
    
    feedForm.reset();
}