const emailInput = document.getElementById('email-input');
const eyeIconBox = document.getElementById('eye-icon-box')
const passInput = document.getElementById('pass-input');
const eyeIcon = document.getElementById('eye-icon');
const loginBtn = document.getElementById('login-btn');

eyeIconBox.addEventListener('click', () => {

    eyeIcon.classList.toggle("bi-eye");
    eyeIcon.classList.toggle("bi-eye-slash");

    passInput.type = (passInput.type === "password") ? "text" : "password";

});



function validateEmail() {
    var validEmail = /^[\w-\.]+@([\w-]+\.)+[\w+]{2,3}$/g;
    if (emailInput.value.match(validEmail)) {
        emailInput.classList.add('is-valid');
        emailInput.classList.remove('is-invalid');
        return true;
    } else if (!emailInput.value.match(validEmail) && emailInput.value != ('')) {
        emailInput.classList.add('is-invalid');
        emailInput.classList.remove('is-valid');
        return false;
    } else {
        emailInput.classList.remove('is-valid');
        emailInput.classList.remove('is-invalid');
        return false;
    }

}

function validatePassword() {
    var validPassword = /^(?=.*[0-9])(?=.*[-_+"£()=?!@#$%^&*\/\\])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9\-_+"£()=?!@#$%^&*\/\\]{8,30}$/g;
    

    if (passInput.value.match(validPassword)) {
        passInput.classList.add('is-valid');
        passInput.classList.remove('is-invalid');
        loginBtn.classList.remove('disabled')
        return true;

    } else if (!passInput.value.match(validPassword) && passInput.value != ('')) {
        passInput.classList.add('is-invalid');
        passInput.classList.remove('is-valid');
        loginBtn.classList.add('disabled')
        return false;
    } else {
        passInput.classList.remove('is-valid');
        passInput.classList.remove('is-invalid');
        loginBtn.classList.add('disabled')
        return false;
    }


}


passInput.addEventListener("keyup", () => {
    (emailInput.value && passInput.value) ? loginBtn.classList.remove('disabled') :
        loginBtn.classList.add('disabled')
});
emailInput.addEventListener("keyup", () => {
    (emailInput.value && passInput.value) ? loginBtn.classList.remove('disabled') :
        loginBtn.classList.add('disabled')
});

emailInput.addEventListener("blur", () => {
    validateEmail();
});

passInput.addEventListener("blur", () => {
    validatePassword();
});
