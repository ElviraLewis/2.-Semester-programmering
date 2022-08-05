if (!localStorage.getItem("user")) {
  location.href = "/index";
}

document.addEventListener("DOMContentLoaded", function () {
  let submit = document.getElementById("submit");

  submit.addEventListener("click", (e) => {
    e.preventDefault();

    let updatedProduct = {};
    let user = localStorage.getItem("user");
    user = JSON.parse(user);
    updatedProduct.user_id = user.user_id; 
    
    let product_name = document.getElementById("productName").value;
    if (product_name !== "") updatedProduct.product_name = product_name;

    let product_category = document.getElementById("productCategory").value;
    if (product_category !== "")
      updatedProduct.product_category = product_category;

    let product_price = document.getElementById("productPrice").value;
    if (product_price !== "") updatedProduct.product_price = product_price;

    let product_image = document.getElementById("productimage").value;
    if (product_image !== "") updatedProduct.product_image = product_image;

    let product_id = document.getElementById("productid").value;
    updatedProduct.product_id = product_id;
    //vi smider et id ind, så vi ved hvilken produkt vi skal opdater
    /*if (user_id !== "") updatedProduct.user_id = user_id;
    let user_id = document.getElementById("user_id").value;*/

    console.log(updatedProduct);

    fetch(`http://localhost:3333/products/${product_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      //det under er det som bliver sendt til serveren.
      body: JSON.stringify(updatedProduct),
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
