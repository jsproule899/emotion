const passInput1 = document.getElementById('passinput1');
const passInput2 = document.getElementById('passinput2');
const passInvalid1 = document.getElementById('passinvalid1');
const passInvalid2 = document.getElementById('passinvalid2');
const eyeIcon1 = document.getElementById('eye-icon1');
const eyeIcon2 = document.getElementById('eye-icon2');
const eyeIconBox1 = document.getElementById('eye-icon-box1');
const eyeIconBox2 = document.getElementById('eye-icon-box2');
const resetBtn = document.getElementById('reset-btn');

eyeIconBox1.addEventListener('click', () => {
    eyeIcon1.classList.toggle("bi-eye");
    eyeIcon1.classList.toggle("bi-eye-slash");

    passInput1.type = (passInput1.type === "password") ? "text" : "password";

});

eyeIconBox2.addEventListener('click', () => {
    eyeIcon2.classList.toggle("bi-eye");
    eyeIcon2.classList.toggle("bi-eye-slash");

    passInput2.type = (passInput2.type === "password") ? "text" : "password";

});

passInput1.addEventListener("input", () =>  validateForm());
passInput1.addEventListener("blur", () =>  validateForm());
passInput2.addEventListener("blur", () =>  validateForm());



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
    (validatePassword() && confirmPassword()) ? resetBtn.classList.remove('disabled') : resetBtn.classList.add('disabled');
    
}
