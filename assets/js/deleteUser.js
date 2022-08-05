//const { locals } = require("../../server");

if (!localStorage.getItem("user")) {
  location.href = "/index";
}
document.addEventListener("DOMContentLoaded", function () {
  let submit = document.getElementById("submit");

  submit.addEventListener("click", (e) => {
    e.preventDefault();

    const loggedInId = JSON.parse(localStorage.getItem("user")).user_id;

    
    fetch(`http://localhost:3333/users/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      
      body: JSON.stringify({
        loggedInId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else if (JSON.parse(localStorage.getItem("user")).type_of_id !== 1) { 
          alert(data + "Bruger slettet");
          localStorage.removeItem("user");
          //Brugeren slettes, og local storage renses
        }
      })
      .catch((err) => {
        alert("Denne bruger kunne ikke slettes", err);
      });
  });
});
