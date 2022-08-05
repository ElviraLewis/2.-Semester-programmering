if (!localStorage.getItem("user")) {
  location.href = "/index";
}

document.addEventListener("DOMContentLoaded", function () {
  let submit = document.getElementById("submit");

  submit.addEventListener("click", (e) => {
    e.preventDefault();


    let updatedUser = {};

    let user_id = JSON.parse(localStorage.getItem("user")).user_id;
    
   
    let name = document.getElementById("userName").value;
    if (name !== "") updatedUser.name = name;

    let password = document.getElementById("password").value;
    if (password !== "") updatedUser.password = password;

    console.log(updatedUser);
  
      //fetch template med PUT, til brugeren personlige side
      fetch(`http://localhost:3333/users/${user_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        //det under er det som bliver sendt til serveren.
        body: JSON.stringify(updatedUser),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            alert(data.error);
          } else {
            alert(data.message);
          }
        })
        .catch((err) => {
          alert("Error:", err);
        });
  });
});
