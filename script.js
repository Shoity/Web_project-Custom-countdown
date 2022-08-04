const inputContainer = document.getElementById('input-container')
const countdownForm = document.getElementById('countdownForm')
const dateEl = document.getElementById('datePicker')

const countdownEl = document.getElementById('countdown')
const countdownElTitle = document.getElementById('countdownTitle')
const countdownBtn = document.getElementById('countdownButton')
const timeEl = document.querySelectorAll('span')

const completeEl = document.getElementById('complete')
const completeElInfo = document.getElementById('completeInfo')
const completeBtn = document.getElementById('completeButton')

let countdownTitle = '';
let countdownDate = '';
let countDownValue = Date;
let countdownActive;

let savedCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Set Date Input min
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);

// Populate Countdown
function updateDOM() {
    // Updating DOM every sec
    countdownActive = setInterval(() => {
        const now = new Date().getTime();
        const distance = countDownValue - now;
        const days = Math.floor(distance / day)
        const hours = Math.floor((distance % day) / hour)
        const minutes = Math.floor((distance % hour) / minute)
        const seconds = Math.floor((distance % minute) / second)

        // Hide Input
        inputContainer.hidden = true;

        // If the countdon ended, show complete
        if (distance < 0) {
            countdownEl.hidden = true;
            clearInterval(countDownValue)
            completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
            completeEl.hidden = false;
        } else {

            // Pop countdown
            countdownElTitle.textContent = `${countdownTitle}`;
            timeEl[0].textContent = `${days}`;
            timeEl[1].textContent = `${hours}`;
            timeEl[2].textContent = `${minutes}`;
            timeEl[3].textContent = `${seconds}`;
            // Hide Complete
            completeEl.hidden = true;
            // Show countdown
            countdownEl.hidden = false;
        }
    }, second);
}

// Take Values from Input
function updateCountdown(e) {
    e.preventDefault()
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
    savedCountdown = {
        title: countdownTitle,
        date: countdownDate,
    };
    localStorage.setItem('countdown', JSON.stringify(savedCountdown))
    // Check valid date
    if (countdownDate === '') {
        alert('Select a valid date for countdown')
    } else {
        // Get current Date, update DOM
        countDownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
}
function reset() {
    // Hide Countdown, show input
    countdownEl.hidden = true;
    completeEl.hidden = true;
    inputContainer.hidden = false;
    // Stop countdown
    clearInterval(countdownActive);
    // Reset values
    countdownTitle = '';
    countdownDate = '';
    localStorage.removeItem('countdown')
}

function restorePrevCountdown() {
    if (localStorage.getItem('countdown')) {
        inputContainer.hidden = true;
        savedCountdown = JSON.parse(localStorage.getItem('countdown'));
        countdownTitle = savedCountdown.title;
        countdownDate = savedCountdown.date;
        countDownValue = new Date(countdownDate).getTime();
        updateDOM()
    }
}

// Event Listeners
countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', reset)
completeBtn.addEventListener('click', reset)

// On load
restorePrevCountdown();