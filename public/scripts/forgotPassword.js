const emailInput = document.getElementById('email-input');
const forgotBtn = document.getElementById('forgot-btn');


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
emailInput.addEventListener("keyup", () => {
    (emailInput.value && validateEmail()) ? forgotBtn.classList.remove('disabled') :
        forgotBtn.classList.add('disabled')
});

emailInput.addEventListener("blur", () => {
    validateEmail();
});


