const emailInput = document.getElementById('emailinput');
const passInputL = document.getElementById('passinputL');
const eyeIconL = document.getElementById('eyeiconL');
const loginBtn = document.getElementById('loginbtn');

eyeIconL.addEventListener('click', () => {

    eyeIconL.classList.toggle("bi-eye");
    eyeIconL.classList.toggle("bi-eye-slash");

    passInputL.type = (passInputL.type === "password") ? "text" : "password";

});

if (passInputL) passInputL.addEventListener("keyup", () => {
    (emailInput.value && passInputL.value) ? loginBtn.classList.remove('disabled') :
        loginBtn.classList.add('disabled')
});
if (passInputL) emailInput.addEventListener("keyup", () => {
    (emailInput.value && passInputL.value) ? loginBtn.classList.remove('disabled') :
        loginBtn.classList.add('disabled')
});