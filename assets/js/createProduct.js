if (!localStorage.getItem("user")) {
  location.href = "/index";
}

document.addEventListener("DOMContentLoaded", function () {
  console.log("Brugerid: ", JSON.parse(localStorage.getItem("user")).user_id);

  document.getElementById("product-form").addEventListener("submit", (e) => {
    e.preventDefault();

    //Her hentes data'en fra frontend
    const product_name = document.getElementById("product_name").value;
    const product_price = document.getElementById("price").value;
    const product_image = document.getElementById("image").value;
    const product_category = document.getElementById("productCategory").value;

    const newProduct = {
      product_name,
      product_price,
      product_image,
      product_category,
      user_id: JSON.parse(localStorage.getItem("user")).user_id,
    };

    console.log(newProduct);

    //Fetch template med URL der sender videre til products controller
    fetch("http://localhost:3333/products", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newProduct),
    })
      .then((data) => {
        data.text().then((txt) => {
          alert(txt);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  });
});
