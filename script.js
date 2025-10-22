let toggleColorButton = document.querySelector("#toggle-color");
toggleColorButton.addEventListener("click", toggleColor);

let sleepForm = document.querySelector("#sleep-form");
let feedForm = document.querySelector("#feed-form");

sleepForm.addEventListener("submit", logSleep);
feedForm.addEventListener("submit", logFeeding);

let totalSleepHours = 0;
let totalFeedHours = 0;

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
    
    let startTime = new Date(sleepStart);
    let endTime = new Date(sleepEnd);
    let hours = (endTime - startTime) / (1000 * 60 * 60);
    
    totalSleepHours += hours;
    
    let sleepList = document.querySelector("#sleep-records ul");
    let listItem = document.createElement("li");
    listItem.textContent = `Start: ${startTime.toLocaleString()} - End: ${endTime.toLocaleString()} (${hours.toFixed(2)} hours)`;
    
    sleepList.appendChild(listItem);
    
    let totalElement = document.querySelector("#sleep-total");
    if (!totalElement) {
        totalElement = document.createElement("p");
        totalElement.id = "sleep-total";
        document.querySelector("#sleep-records").appendChild(totalElement);
    }
    totalElement.textContent = `Total Sleep: ${totalSleepHours.toFixed(2)} hours`;
    
    sleepForm.reset();
}

function logFeeding(event) {
    event.preventDefault();
    
    let feedStart = document.querySelector("#feed-start").value;
    let feedEnd = document.querySelector("#feed-end").value;
    
    let startTime = new Date(feedStart);
    let endTime = new Date(feedEnd);
    let hours = (endTime - startTime) / (1000 * 60 * 60);
    
    totalFeedHours += hours;
    
    let feedList = document.querySelector("#feed-records ul");
    let listItem = document.createElement("li");
    listItem.textContent = `Start: ${startTime.toLocaleString()} - End: ${endTime.toLocaleString()} (${hours.toFixed(2)} hours)`;
    
    feedList.appendChild(listItem);
    
    let totalElement = document.querySelector("#feed-total");
    if (!totalElement) {
        totalElement = document.createElement("p");
        totalElement.id = "feed-total";
        document.querySelector("#feed-records").appendChild(totalElement);
    }
    totalElement.textContent = `Total Feeding: ${totalFeedHours.toFixed(2)} hours`;
    
    feedForm.reset();
}