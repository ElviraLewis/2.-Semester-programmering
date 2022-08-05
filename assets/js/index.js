if (!localStorage.getItem("user")) {
  location.href = "/login"; //redirecter til login hvis brugeren ikke er logget ind. 
}

function logout() {
  localStorage.removeItem('user');  
  location.href = '/login';
  //Her fjernes brugeren fra local storage, og bliver
  //sendt tilbage til login.ejs
}
