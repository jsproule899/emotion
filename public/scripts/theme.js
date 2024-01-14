const getStoredTheme = () => localStorage.getItem('theme')

    if (getStoredTheme() == 'dark')  document.documentElement.setAttribute('data-bs-theme', 'dark'); 
    else if (getStoredTheme() == 'light')  document.documentElement.setAttribute('data-bs-theme', 'light');



