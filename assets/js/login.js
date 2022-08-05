if (localStorage.getItem('user')) {
  location.href = '/index';
} //redirect forbi log ind siden, hvis brugeren er lagret i local storage

document.addEventListener('DOMContentLoaded', function () {

  let login = document.getElementById('login-form');
  login.addEventListener('submit', (e) => {
    //lytter efter handlingen submit.
    e.preventDefault(); //sørger for koden kan køre.

    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    let user = {
      username,
      password,
    };

    console.log(user);

    fetch('http://localhost:3333/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(user),
       //Her bliver user til et objekt der vil kunne bruges i en body
    })
      .then((response) => response.json())
       //Her kommer responsen fra controlleren, som sender JSON videre til næste .then.
      .then((data) => {
        //data'en her er den samme som json'en ovenover.
        
        if (data.user_id) { //"hvis" data'en indeholder et user_id med de værdier
          localStorage.setItem('user', JSON.stringify(data)); 
          location.href = '/updateProduct';
          // Her lagrer vi brugeren i localstorage, og redirecter til updateProduct
        } else {
          alert(data.error);
          //Her sørger vi for en alert i tilfælde af der ikke er sendt noget data tilbage
        }
      })
      .catch((err) => {
        alert('error ', err.error); 
        //I denne alert sender vi både en "error" samt en fejlbesked fra controlleren 
      });
  });
});

module.exports = login;