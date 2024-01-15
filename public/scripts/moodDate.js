let timestamp = new Date();

const errMsg = document.getElementById('error-msg');
const errAlert = document.getElementById('error-alert');
const errAlertClose = document.getElementById('error-alert-close');
const formTimestamp = document.getElementById('form-timestamp');
const date = document.getElementById("date");
const time = document.getElementById("time");
const timeChange = document.getElementById("time-change");
const dateChange = document.getElementById('date-change');
const leftDateArrow = document.getElementById("date-left");
const rightDateArrow = document.getElementById("date-right");

date.innerHTML = timestamp.toUTCString().substring(0, 16);
time.innerHTML = timestamp.toUTCString().substring(16, 22);
updateFormTimestamp();

errAlertClose.addEventListener('click', ()=>{
    errAlert.classList.remove('show') 
})

timeChange.addEventListener('click', () => {
    time.innerHTML = "<input type='time' id='time-value' value=" + timestamp.toLocaleTimeString().substring(0,5) + " />"
    timeChange.classList.add("visually-hidden");

});
time.addEventListener('focusout', () => {
    newDateTime = new Date(timestamp)
    newDateTime.setHours(document.getElementById('time-value').value.substring(0, 2));
    newDateTime.setMinutes(document.getElementById('time-value').value.substring(3, 5));
    
    if (Date.now() >= newDateTime) {timestamp = newDateTime; updateFormTimestamp(); errAlert.classList.remove('show')} 
    else if(Date.now() < newDateTime) {errMsg.innerHTML='Mood cannot be in the future!'; errAlert.classList.add('show')}
    time.innerHTML = timestamp.toUTCString().substring(16, 22);
    updateFormTimestamp()
    timeChange.classList.remove("visually-hidden");

});

dateChange.addEventListener('click', () => {
    console.log(timestamp.toISOString().substring(0, 10))
    date.innerHTML = "<input type='date' id='date-value' value=" + timestamp.toISOString().substring(0, 10) + " />"
    dateChange.classList.add("visually-hidden");

});
date.addEventListener('focusout', () => {
    newDate = new Date(timestamp)
    newDate.setDate(document.getElementById('date-value').value.substring(8, 10));
    newDate.setMonth(document.getElementById('date-value').value.substring(5, 7) - 1);
    newDate.setFullYear(document.getElementById('date-value').value.substring(0, 4));
    if (Date.now() >= newDate) {timestamp = newDate; updateFormTimestamp(); errAlert.classList.remove('show')} 
    else if(Date.now() < newDate) {errMsg.innerHTML='Mood cannot be in the future!'; errAlert.classList.add('show')}
    date.innerHTML = timestamp.toUTCString().substring(0, 16);
    updateFormTimestamp()
    dateChange.classList.toggle("visually-hidden");

});

leftDateArrow.addEventListener('click', () => {
    timestamp = new Date(timestamp.getTime() - (86400000));
    updateFormTimestamp()
    date.innerHTML = timestamp.toUTCString().substring(0, 16);
    if (Math.floor((Date.now() - timestamp) / 86400000) >= 1)
        rightDateArrow.classList.remove("visually-hidden");
    else rightDateArrow.classList.add("visually-hidden");
    dateChange.classList.remove("visually-hidden");
})

rightDateArrow.addEventListener('click', () => {
    timestamp = new Date(timestamp.getTime() + (86400000));
    updateFormTimestamp()
    date.innerHTML = timestamp.toUTCString().substring(0, 16);
    if (Math.floor((Date.now() - timestamp) / 86400000) >= 1)
        rightDateArrow.classList.remove("visually-hidden");
    else rightDateArrow.classList.add("visually-hidden");
    dateChange.classList.remove("visually-hidden");

})

function updateFormTimestamp(){
    
    formTimestamp.value=timestamp.toISOString().substring(0,16)
}
