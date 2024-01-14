const dark_light = document.getElementById('dark-light-mode');

window.addEventListener('DOMContentLoaded', () => {
    if (getStoredTheme() == 'dark') dark_light.checked = false; 
    else if (getStoredTheme() == 'light')  dark_light.checked = true; 

});



function setStoredTheme(theme) { localStorage.setItem('theme', theme) }


dark_light.addEventListener('click', () => {

    if (dark_light.checked) {
        document.documentElement.setAttribute('data-bs-theme', 'light');
        setStoredTheme('light');
    }

    else if (!dark_light.checked) {
        document.documentElement.setAttribute('data-bs-theme', 'dark');
        setStoredTheme('dark');
    }


})

