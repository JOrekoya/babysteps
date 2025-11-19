let toggleColorButton = document.querySelector("#toggle-color");
toggleColorButton.addEventListener("click", toggleColor);

// Set light mode on page load
document.body.classList.add('light-mode');
toggleColorButton.textContent = '☀️ Light';

// Data storage
let sleepRecords = [];
let feedRecords = [];
let currentEditId = null;
let currentEditType = null;

// Timer variables
let sleepTimerInterval = null;
let sleepTimerStart = null;
let sleepTimerSeconds = 0;

let feedTimerInterval = null;
let feedTimerStart = null;
let feedTimerSeconds = 0;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    setupMethodSwitchers();
    setupTimers();
    setupForms();
    setupEditModal();
});

function toggleColor() {
    document.body.classList.toggle('light-mode');
    
    if (document.body.classList.contains('light-mode')) {
        toggleColorButton.textContent = '☀️ Light';
    } else {
        toggleColorButton.textContent = '🌙 Dark';
    }
}

// Method Switcher
function setupMethodSwitchers() {
    const methodButtons = document.querySelectorAll('.method-btn');
    
    methodButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const method = this.dataset.method;
            const type = this.dataset.type;
            
            // Update active button
            const siblings = this.parentElement.querySelectorAll('.method-btn');
            siblings.forEach(s => s.classList.remove('active'));
            this.classList.add('active');
            
            // Update active method
            const section = this.closest('section');
            const methods = section.querySelectorAll('.input-method');
            methods.forEach(m => m.classList.remove('active'));
            section.querySelector(`#${type}-${method}-method`).classList.add('active');
        });
    });
}

// Timer Setup
function setupTimers() {
    // Sleep timer
    document.getElementById('sleep-start-btn').addEventListener('click', () => startTimer('sleep'));
    document.getElementById('sleep-stop-btn').addEventListener('click', () => stopTimer('sleep'));
    
    // Feed timer
    document.getElementById('feed-start-btn').addEventListener('click', () => startTimer('feed'));
    document.getElementById('feed-stop-btn').addEventListener('click', () => stopTimer('feed'));
}

function startTimer(type) {
    if (type === 'sleep') {
        sleepTimerStart = new Date();
        sleepTimerSeconds = 0;
        document.getElementById('sleep-start-btn').disabled = true;
        document.getElementById('sleep-stop-btn').disabled = false;
        document.querySelector('#sleep-timer-method .timer-label').textContent = 'Timer running...';
        
        sleepTimerInterval = setInterval(() => {
            sleepTimerSeconds++;
            updateTimerDisplay('sleep', sleepTimerSeconds);
        }, 1000);
    } else {
        feedTimerStart = new Date();
        feedTimerSeconds = 0;
        document.getElementById('feed-start-btn').disabled = true;
        document.getElementById('feed-stop-btn').disabled = false;
        document.querySelector('#feed-timer-method .timer-label').textContent = 'Timer running...';
        
        feedTimerInterval = setInterval(() => {
            feedTimerSeconds++;
            updateTimerDisplay('feed', feedTimerSeconds);
        }, 1000);
    }
}

function stopTimer(type) {
    if (type === 'sleep') {
        clearInterval(sleepTimerInterval);
        const endTime = new Date();
        const hours = sleepTimerSeconds / 3600;
        
        addRecord('sleep', sleepTimerStart, endTime, hours);
        
        // Reset
        sleepTimerSeconds = 0;
        updateTimerDisplay('sleep', 0);
        document.getElementById('sleep-start-btn').disabled = false;
        document.getElementById('sleep-stop-btn').disabled = true;
        document.querySelector('#sleep-timer-method .timer-label').textContent = 'Press Start to begin tracking';
    } else {
        clearInterval(feedTimerInterval);
        const endTime = new Date();
        const hours = feedTimerSeconds / 3600;
        
        addRecord('feed', feedTimerStart, endTime, hours);
        
        // Reset
        feedTimerSeconds = 0;
        updateTimerDisplay('feed', 0);
        document.getElementById('feed-start-btn').disabled = false;
        document.getElementById('feed-stop-btn').disabled = true;
        document.querySelector('#feed-timer-method .timer-label').textContent = 'Press Start to begin tracking';
    }
}

function updateTimerDisplay(type, seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    const display = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    document.getElementById(`${type}-timer-display`).textContent = display;
}

// Form Setup
function setupForms() {
    // Duration forms
    document.getElementById('sleep-duration-form').addEventListener('submit', handleSleepDuration);
    document.getElementById('feed-duration-form').addEventListener('submit', handleFeedDuration);
    
    // DateTime forms
    document.getElementById('sleep-form').addEventListener('submit', handleSleepDateTime);
    document.getElementById('feed-form').addEventListener('submit', handleFeedDateTime);
}

function handleSleepDuration(e) {
    e.preventDefault();
    const hours = parseInt(document.getElementById('sleep-duration-hours').value);
    const minutes = parseInt(document.getElementById('sleep-duration-minutes').value);
    const totalHours = hours + (minutes / 60);
    
    const endTime = new Date();
    const startTime = new Date(endTime - (totalHours * 60 * 60 * 1000));
    
    addRecord('sleep', startTime, endTime, totalHours);
    e.target.reset();
}

function handleFeedDuration(e) {
    e.preventDefault();
    const hours = parseInt(document.getElementById('feed-duration-hours').value);
    const minutes = parseInt(document.getElementById('feed-duration-minutes').value);
    const totalHours = hours + (minutes / 60);
    
    const endTime = new Date();
    const startTime = new Date(endTime - (totalHours * 60 * 60 * 1000));
    
    addRecord('feed', startTime, endTime, totalHours);
    e.target.reset();
}

function handleSleepDateTime(e) {
    e.preventDefault();
    const startTime = new Date(document.getElementById('sleep-start').value);
    const endTime = new Date(document.getElementById('sleep-end').value);
    const hours = (endTime - startTime) / (1000 * 60 * 60);
    
    addRecord('sleep', startTime, endTime, hours);
    e.target.reset();
}

function handleFeedDateTime(e) {
    e.preventDefault();
    const startTime = new Date(document.getElementById('feed-start').value);
    const endTime = new Date(document.getElementById('feed-end').value);
    const hours = (endTime - startTime) / (1000 * 60 * 60);
    
    addRecord('feed', startTime, endTime, hours);
    e.target.reset();
}

// Record Management
function addRecord(type, startTime, endTime, hours) {
    const record = {
        id: Date.now(),
        startTime: startTime,
        endTime: endTime,
        hours: hours
    };
    
    if (type === 'sleep') {
        sleepRecords.unshift(record);
        renderSleepRecords();
    } else {
        feedRecords.unshift(record);
        renderFeedRecords();
    }
}

function renderSleepRecords() {
    const list = document.getElementById('sleep-records-list');
    list.innerHTML = '';
    
    let totalHours = 0;
    
    sleepRecords.forEach(record => {
        totalHours += record.hours;
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="record-content">
                <span>Start: ${record.startTime.toLocaleString()} - End: ${record.endTime.toLocaleString()} (${record.hours.toFixed(2)} hours)</span>
                <div class="record-actions">
                    <button class="edit-record-btn" data-id="${record.id}" data-type="sleep">✏️ Edit</button>
                    <button class="delete-record-btn" data-id="${record.id}" data-type="sleep">🗑️ Delete</button>
                </div>
            </div>
        `;
        list.appendChild(li);
    });
    
    // Update total
    let totalElement = document.querySelector('#sleep-total');
    if (!totalElement) {
        totalElement = document.createElement('p');
        totalElement.id = 'sleep-total';
        document.querySelector('#sleep-records').appendChild(totalElement);
    }
    totalElement.textContent = `Total Sleep: ${totalHours.toFixed(2)} hours`;
    
    // Add event listeners
    list.querySelectorAll('.edit-record-btn').forEach(btn => {
        btn.addEventListener('click', () => editRecord(btn.dataset.id, btn.dataset.type));
    });
    list.querySelectorAll('.delete-record-btn').forEach(btn => {
        btn.addEventListener('click', () => deleteRecord(btn.dataset.id, btn.dataset.type));
    });
}

function renderFeedRecords() {
    const list = document.getElementById('feed-records-list');
    list.innerHTML = '';
    
    let totalHours = 0;
    
    feedRecords.forEach(record => {
        totalHours += record.hours;
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="record-content">
                <span>Start: ${record.startTime.toLocaleString()} - End: ${record.endTime.toLocaleString()} (${record.hours.toFixed(2)} hours)</span>
                <div class="record-actions">
                    <button class="edit-record-btn" data-id="${record.id}" data-type="feed">✏️ Edit</button>
                    <button class="delete-record-btn" data-id="${record.id}" data-type="feed">🗑️ Delete</button>
                </div>
            </div>
        `;
        list.appendChild(li);
    });
    
    // Update total
    let totalElement = document.querySelector('#feed-total');
    if (!totalElement) {
        totalElement = document.createElement('p');
        totalElement.id = 'feed-total';
        document.querySelector('#feed-records').appendChild(totalElement);
    }
    totalElement.textContent = `Total Feeding: ${totalHours.toFixed(2)} hours`;
    
    // Add event listeners
    list.querySelectorAll('.edit-record-btn').forEach(btn => {
        btn.addEventListener('click', () => editRecord(btn.dataset.id, btn.dataset.type));
    });
    list.querySelectorAll('.delete-record-btn').forEach(btn => {
        btn.addEventListener('click', () => deleteRecord(btn.dataset.id, btn.dataset.type));
    });
}

function deleteRecord(id, type) {
    if (confirm('Are you sure you want to delete this record?')) {
        if (type === 'sleep') {
            sleepRecords = sleepRecords.filter(r => r.id != id);
            renderSleepRecords();
        } else {
            feedRecords = feedRecords.filter(r => r.id != id);
            renderFeedRecords();
        }
    }
}

function editRecord(id, type) {
    currentEditId = id;
    currentEditType = type;
    
    const records = type === 'sleep' ? sleepRecords : feedRecords;
    const record = records.find(r => r.id == id);
    
    if (record) {
        // Format dates for datetime-local input
        const formatDateTime = (date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            return `${year}-${month}-${day}T${hours}:${minutes}`;
        };
        
        document.getElementById('edit-start').value = formatDateTime(record.startTime);
        document.getElementById('edit-end').value = formatDateTime(record.endTime);
        document.getElementById('edit-modal').classList.add('active');
    }
}

function setupEditModal() {
    document.getElementById('edit-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const startTime = new Date(document.getElementById('edit-start').value);
        const endTime = new Date(document.getElementById('edit-end').value);
        const hours = (endTime - startTime) / (1000 * 60 * 60);
        
        const records = currentEditType === 'sleep' ? sleepRecords : feedRecords;
        const record = records.find(r => r.id == currentEditId);
        
        if (record) {
            record.startTime = startTime;
            record.endTime = endTime;
            record.hours = hours;
            
            if (currentEditType === 'sleep') {
                renderSleepRecords();
            } else {
                renderFeedRecords();
            }
        }
        
        document.getElementById('edit-modal').classList.remove('active');
    });
    
    document.getElementById('cancel-edit').addEventListener('click', function() {
        document.getElementById('edit-modal').classList.remove('active');
    });
}