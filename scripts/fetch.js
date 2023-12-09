// document.addEventListener('DOMContentLoaded', () => {
//     fetch('http://localhost:3000/getAll')
//         .then(res => res.json())
//         .then(data => console.log(data));
// });

// const createBtnf = document.getElementById('createbtn');
// const loginBtnf = document.getElementById('loginbtn');

// if(createBtnf) createBtnf.addEventListener('click', () => {
//     const usernameInput = document.getElementById('usernameinput');
//     const emailInput = document.getElementById('emailinput');
//     const passInput1 = document.getElementById('passinput1');
    
    

//     fetch('http://localhost:3000/createAccount', {

//         headers: {
//             'Content-type': 'application/json'
//         },
//         method: 'POST',
//         body: JSON.stringify({ username: usernameInput.value, email: emailInput.value, password: passInput1.value })
//     });
// });

// if(loginBtnf) loginBtnf.addEventListener('click', () => {
//     const emailInput = document.getElementById('emailinput');
//     const passInputL = document.getElementById('passinputL');
    
    

//     fetch('http://localhost:3000/login', {

//         headers: {
//             'Content-type': 'application/json'
//         },
//         method: 'POST',
//         body: JSON.stringify({ email: emailInput.value, password: passInputL.value })
    
    
//     }).then(res => {if( res.status === 302 ) {
//         fetch('http://localhost:3000/signup');
//     }
// });

    
// });

