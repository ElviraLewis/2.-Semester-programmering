const { executeSQL } = require("../database/executeSQL");

class User {
  constructor(
    user_id = null,
    user_name = null,
    password = null
  ) {
    this.user_id = user_id;
    this.user_name = user_name;
    this.password = password;
  }

  async saveUser() {
    let result = await executeSQL(
      `INSERT INTO dbo.Brugere (name, password) 
      VALUES ('${this.user_name}', '${this.password}')`
    );
    console.log(result);
    return result;
  }

  async allUserAdds() {
    let result = await executeSQL(
      `SELECT user_id, amount_of_adds FROM dbo.Brugere WHERE user_id = ${req.params.id}`
    );
    return result;
  }

  //delete user

  async deleteUsers(id) {
    let result = await executeSQL(
      `DELETE FROM dbo.Products OUTPUT deleted.user_id WHERE user_id = ${id}`
    );
    let result2 = await executeSQL(
      `DELETE FROM dbo.Brugere OUTPUT deleted.user_id WHERE user_id = ${id};`
    );
    return { result, result2 };
  }


  //update user funktioner//

  async exists() {
    let result = await executeSQL(
      `SELECT * FROM dbo.Brugere WHERE user_id = ${this.user_id}`
    );
    let foundUsers = Object.keys(result).length; 
//Nu ser vi hvor mange brugere der findes med this.user_id
    if (foundUsers == 1) {
      //Hvis den finder et id er alt good
      return true;
    } else {
      //Hvis den ingen finder, sender den false tilbage
      return false;
    }
  }

  async updateUser(obj) {
    let exists = await this.exists();

    if (!exists) {
      //Hvis bruger id'et ikke kan findes i databasen, vil en fejlbesked blive return'et
      return "Dette brugernavn eller password findes ikke";
    }
    //ellers opdateres brugeren med matchende user_id
    let query = `UPDATE dbo.Brugere SET `;
    if (obj.name) { 
      query += `name = '${obj.name}' `;
    }
    if (obj.password) {
      query += `password = '${obj.password}' `;
    }
    query += `OUTPUT inserted.user_id
    WHERE user_id = ${this.user_id}`;
//Her bliver den gamle data skiftet ud med de nye indtastede oplysninger
//medmindre der ikke er tastet noget ind, så bliver de ikke aktuelle, og vil ikke ændre sig
    let result = await executeSQL(query);
    return result;
  }

  async updateProduct(obj) {
    let query = `UPDATE dbo.Products SET `;
    if (obj.product_name) {
      query += `product_name = '${obj.product_name}' `;
    }
    if (obj.product_category) {
      query += `, product_category = '${obj.product_category}' `;
    }
    if (obj.product_price) {
      query += `, product_price = '${obj.product_price}' `;
    }
    if (obj.product_image) {
      query += `, product_price = '${obj.product_image}' `;
    }
    query += `OUTPUT inserted.user_id
    WHERE product_id = ${obj.product_id} AND user_id = ${this.user_id}`;

    let result = await executeSQL(query);

    return result;
  }


  //slet produkt funktion

  async deleteProduct(product_id) {
    let result = await executeSQL(
      `DELETE FROM dbo.Products 
      OUTPUT deleted.product_id 
      WHERE product_id = ${product_id} 
      AND user_id = ${this.user_id};`
      //Her leder vi efter producter der matcher både det indskrevne
      //produkt Id, samt det hentede bruger Id fra local storage
    );
    if (!result["1"]) {
      return false;
    }
    return result["1"].product_id;
  }

  async loginUser(req) {
    let result = await executeSQL(
      `SELECT * FROM dbo.Brugere 
      WHERE
        user_name = '${req.body.username}'
        AND
      password = '${req.body.password}';`
      //Her checkes om brugerens username og password findes i databasen
    );
    console.log(result);
    if (!result["1"]) {
      return false;
      //Hvis den ikke gør det, vil den returnere false
    }

    return result["1"];
    //ellers returner den true
  }

  //Vis mine produkter
  async showMyProducts(id) {
    let result = await executeSQL(
      `SELECT product_id, product_name, product_category, product_price, product_image 
     FROM dbo.Products 
     WHERE user_id = ${id};`
     //Her vises alt fra vores database dbo.Products, som indeholder det hentede user id
    );
    return result;
    //og sender result tilbage
  }

  async showCategory(category) {
    let result = await executeSQL(
      `SELECT  product_id,, product_name, product_category, product_price, product_image
      FROM dbo.Products
      WHERE product_category = ${category};`
    );
    return result;
  }
}

module.exports = { User };
