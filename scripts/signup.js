
const emailInput = document.getElementById('emailinput');
const passInput1 = document.getElementById('passinput1');
const passInput2 = document.getElementById('passinput2');
const passInvalid1 = document.getElementById('passinvalid1');
const passInvalid2 = document.getElementById('passinvalid2');
const eyeIcon1 = document.getElementById('eyeicon1');
const eyeIcon2 = document.getElementById('eyeicon2');

const tos = document.getElementById('tos');



const createBtn = document.getElementById('createbtn');



if (eyeIcon1) eyeIcon1.addEventListener('click', () => {
    eyeIcon1.classList.toggle("bi-eye");
    eyeIcon1.classList.toggle("bi-eye-slash");

    passInput1.type = (passInput1.type === "password") ? "text" : "password";

});


if (eyeIcon2) {
    eyeIcon2.addEventListener('click', () => {
        eyeIcon2.classList.toggle("bi-eye");
        eyeIcon2.classList.toggle("bi-eye-slash");

        passInput2.type = (passInput2.type === "password") ? "text" : "password";

    })
}



//validation

tos.addEventListener('change', () => validateInputs());
passInput1.addEventListener("blur", () => validateInputs());
passInput2.addEventListener("blur", () => validateInputs());

function validateInputs() {



    if (passInput1.value != passInput2.value && passInput1.value != '' && passInput2.value != '') {


        passInput2.classList.remove('is-valid');
        passInput2.classList.add('is-invalid');
        passInput1.classList.remove('is-valid');
        passInput1.classList.add('is-invalid');
        passInvalid1.innerHTML = "Passwords do not match!";
        passInvalid2.innerHTML = "Passwords do not match!";
        validateTos()

    } else {

    }
}

function validateTos() {

    (tos.checked) ? createBtn.classList.remove('disabled') : createBtn.classList.add('disabled');

}


function validateForm () {

    if(passInput1.value != passInput2.value && passInput1.value != '' && passInput2.value != '' ){
        throw new Error('passwords do not match')
    }
   
}
