const { executeSQL } = require("../database/executeSQL");

class Product {
  constructor(
    product_id,
    product_name,
    product_price,
    product_image,
    product_category,
    product_timestamp,
    user_id
  ) {
    this.product_id = product_id;
    this.product_name = product_name;
    this.product_price = product_price;
    this.product_image = product_image;
    this.product_category = product_category;
    this.product_timestamp = product_timestamp;
    this.user_id = user_id;
  }

  async saveUserProduct() {
    let result = await executeSQL(
      `INSERT INTO dbo.Products (product_name, product_price, product_category, user_id) 
      VALUES ('${this.product_name}', ${this.product_price}, '${this.product_image}', 
      '${this.product_category}', '${this.user_id}')`
    );
    return result;
  }

  async saveUser() {
    let result = await executeSQL(
      `INSERT INTO dbo.Brugere (name, password, user_id) 
      VALUES ('${this.user_name}', '${this.password}', '${this.user_id}')`
    );
    return result;
  }

  async exists() {
    let result = await executeSQL(
      `SELECT * FROM dbo.Products WHERE product_id = ${this.product_id}`
    );

    let foundProducts = Object.keys(result).length; 
    //tjekker hvor mange users den finder med det id fra this.user_id

    if (foundProducts == 1) {
      //Hvis den finder ét id er den true
      return true;
    } else if (foundProducts > 1) {
      console.log("Multiple products with same id");
      //finder den mere end ét id er den false 
      return false;
    } else {
      //og hvis der ikke findes nogen er den også false
      return false;
    }
  }
  async existsProduct() {
    let result = await executeSQL(
      `SELECT * 
      FROM dbo.Products 
      WHERE product_id = ${this.product_id} 
      AND user_id = ${this.user_id}`
    );
    if (!result["1"]) {
      return false;
    }
    return true;
  }

  async showAllProducts() {
    let result = await executeSQL(
      `SELECT * 
      FROM dbo.Products`
    );
    if (!result["1"]) {
      return false;
    }
    return result;
  }
}

module.exports = { Product };
