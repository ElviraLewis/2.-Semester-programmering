if (localStorage.getItem("user")) {
  location.href = "/index";
} //hvis du er logget ind sender den videre til update product

document.addEventListener("DOMContentLoaded", function () {
  //venter på siden er loadet færdig.


  let registerForm = document.getElementById("register-form");
  
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault(); //preventDefault så siden ikke reloader.

    const name = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const newUser = {
      name,
      password,
    };

    //Her har jeg prøvet med en anden fetch template, men ligeledes uden held. Den mere kommenteret fetch template ligger i login.js
    const url = '/users';

// request options
const options = {
    method: 'POST',
    body: JSON.stringify(newUser),
    headers: {
        'Content-Type': 'application/json'
    }
}

// send POST request
fetch(url, options)
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(error => console.log(error))
  });
});
