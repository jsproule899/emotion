const dark_light = document.getElementById('dark-light-mode');

window.addEventListener('DOMContentLoaded', () => {
    if (getStoredTheme() == 'dark') { document.documentElement.setAttribute('data-bs-theme', 'dark'); dark_light.checked = false; }
    else if (getStoredTheme() == 'light') { document.documentElement.setAttribute('data-bs-theme', 'light'); dark_light.checked = true; }

});


const getStoredTheme = () => localStorage.getItem('theme')
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

