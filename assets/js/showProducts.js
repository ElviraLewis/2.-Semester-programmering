if (!localStorage.getItem("user")) {
  location.href = "/login";
}

document.addEventListener("DOMContentLoaded", () => {
  let showAllProducts = document.getElementById("showAllProducts");
  let seeAll = document.getElementById("seeAll");
  const loggedInId = JSON.parse(localStorage.getItem("user")).user_id;

  showAllProducts.addEventListener("click", async (e) => {
    e.preventDefault();
    seeAll.innerHTML = `
        <tr>
            <th> Product ID </th>
            <th> Product name </th>
            <th> Category </th>
            <th> Price </th>
        </tr>    
        `;

    await fetch("http://localhost:3333/users/showMyProducts/" + loggedInId, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        for (var key of Object.keys(res.products)) {
          //Viser alle produkter
          seeAll.innerHTML += `
            <tr>
                <td>${res.products[key].product_id}</td> 
                <td>${res.products[key].product_name}</td>
                <td>${res.products[key].product_category}</td>
                <td>${res.products[key].product_price}</td>
                <td> <img src="${res.products[key].product_image}" width="150" height="100";</td>
            </tr>    
            `;
          //Her tilgås produktet og værdien af den tilhørende key i rækkefølge
        }
      });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  let seeCategory = document.getElementById("seeCategory");
  let category = document.getElementById("productCategory");

  category.addEventListener("change", async (e) => {
    e.preventDefault();
    const categoryId = document.getElementById("productCategory").value;
    seeCategory.innerHTML = `
        <tr>
            <th> Product ID </th>
            <th> Membership </th>
            <th> Product name </th>
            <th> Category </th>
            <th> Price </th>
        </tr>    
        `;

    await fetch("http://localhost:3333/users/showCategory/" + categoryId,{
        method: "GET",
      })
      .then((res) => res.json())
      .then((res) => {
        for (var key of Object.keys(res.products)) {
          //looper igennem produkterne
          seeCategory.innerHTML += `
          <tr>
              <td>${res.products[key].product_id}</td> 
              <td>${res.products[key].type_name}</td> 
              <td>${res.products[key].product_name}</td>
              <td>${res.products[key].product_category}</td>
              <td>${res.products[key].product_price}</td>
              <td> <img src="${res.products[key].product_image}" width="150" height="100";</td>
          </tr>    
          `;
        }
      });
  });
});
