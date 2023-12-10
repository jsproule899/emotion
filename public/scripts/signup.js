
const usernameInput = document.getElementById('usernameinput');
const emailInput = document.getElementById('emailinput');
const passInput1 = document.getElementById('passinput1');
const passInput2 = document.getElementById('passinput2');
const passInvalid1 = document.getElementById('passinvalid1');
const passInvalid2 = document.getElementById('passinvalid2');
const eyeIcon1 = document.getElementById('eyeicon1');
const eyeIcon2 = document.getElementById('eyeicon2');
const tosCheckbox = document.getElementById('tos');
const createBtn = document.getElementById('createbtn');

eyeIcon1.addEventListener('click', () => {
    eyeIcon1.classList.toggle("bi-eye");
    eyeIcon1.classList.toggle("bi-eye-slash");

    passInput1.type = (passInput1.type === "password") ? "text" : "password";

});

eyeIcon2.addEventListener('click', () => {
    eyeIcon2.classList.toggle("bi-eye");
    eyeIcon2.classList.toggle("bi-eye-slash");

    passInput2.type = (passInput2.type === "password") ? "text" : "password";

});

// form validation


tosCheckbox.addEventListener('change', () => validateForm());
usernameInput.addEventListener("blur", () => { validateForm() });
emailInput.addEventListener("blur", () => { validateForm() });
passInput1.addEventListener("input", () => { validateForm() });
passInput1.addEventListener("blur", () => { validateForm() });
passInput2.addEventListener("blur", () => { validateForm(); });

function validateUsername() {
    var validUsername = /^[a-zA-Z0-9]{6,16}$/g;
    if (usernameInput.value.match(validUsername)) {
        usernameInput.classList.add('is-valid');
        usernameInput.classList.remove('is-invalid');
        return true;
    } else if (!usernameInput.value.match(validUsername) && usernameInput.value != ('')) {
        usernameInput.classList.add('is-invalid');
        usernameInput.classList.remove('is-valid');
        return false;
    } else {
        usernameInput.classList.remove('is-valid');
        usernameInput.classList.remove('is-invalid');
        return false;
    }

}

function validateEmail() {
    var validEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
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

    if (passInput1.value.match(validPassword)) {
        passInput1.classList.add('is-valid');
        passInput1.classList.remove('is-invalid');
        return true;

    } else if (!passInput1.value.match(validPassword) && passInput1.value != ('')) {
        passInput1.classList.add('is-invalid');
        passInput1.classList.remove('is-valid');

        if (!passInput1.value.match(/[0-9]/g)) { passInvalid1.innerHTML = "Password must contain a number"; return false; }
        if (!passInput1.value.match(/[a-z]/g)) { passInvalid1.innerHTML = "Password must contain a lowercase character"; return false; }
        if (!passInput1.value.match(/[A-Z]/g)) { passInvalid1.innerHTML = "Password must contain an uppercase character"; return false; }
        if (!passInput1.value.match(/[\-_+"£()=?!@#$%^&*\/\\]/g)) { passInvalid1.innerHTML = "Password must contain a special character"; return false; }
        if (!8 < passInput1.value < 30) { passInvalid1.innerHTML = "Password must have 8 to 30 characters"; return false; }

        return false;
    } else {
        passInput1.classList.remove('is-valid');
        passInput1.classList.remove('is-invalid');
        return false;
    }


}

function confirmPassword() {

    if (passInput1.value != passInput2.value && passInput1.value != '' && passInput2.value != '') {
        passInput1.classList.remove('is-valid');
        passInput1.classList.add('is-invalid');
        passInput2.classList.remove('is-valid');
        passInput2.classList.add('is-invalid');
        passInvalid1.innerHTML = "Passwords do not match!";
        passInvalid2.innerHTML = "Passwords do not match!";
        return false;

    } else if (passInput1.value == passInput2.value && passInput1.value != '' && passInput2.value != '') {
        passInput1.classList.add('is-valid');
        passInput1.classList.remove('is-invalid');
        passInput2.classList.add('is-valid');
        passInput2.classList.remove('is-invalid');
        return true;
    } else if (passInput1.value != passInput2.value && passInput1.value != '') {
        return false
    } else {
        passInput1.classList.remove('is-valid');
        passInput1.classList.remove('is-invalid');
        passInput2.classList.remove('is-valid');
        passInput2.classList.remove('is-invalid');
        return false;
    }
}


function validateForm() {
    if (validateUsername() && validateEmail() && validatePassword() && confirmPassword())
        (tosCheckbox.checked) ? createBtn.classList.remove('disabled') : createBtn.classList.add('disabled');
    else createBtn.classList.add('disabled');
}


