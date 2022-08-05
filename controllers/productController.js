const express = require('express');
const router = express.Router();
const { User } = require('../model/User.js');
const { Product } = require('../model/Product.js');
const { executeSQL } = require('../database/executeSQL');

//Oprette produkt

router.post('/', async (req, res) => {

    //Hvis der ikke er en fejl opretter den produkt normalt
    let product1 = new Product(
      null,
      req.body.product_name,
      req.body.product_price,
      req.body.product_image,
      req.body.product_category,
      req.body.user_id
    );
    let result = product1.saveUserProduct();
    //Her sendes det nye produkt til modellen via saveUserProduct()
    res.status(200).send('Din vare er nu oprettet');
  }
);

//Opdaterer produkt.

router.put('/:id', async (req, res) => {
  let user = new User(req.body.user_id);
  let result = await user.updateProduct(req.body);

  if (Object.keys(result).length === 0) {
    //Hvis længden af result er === 0 betyder det at der ikke findes et match.
    return res.status(401).json({ error: 'Dette produkt blev ikke opdateret' }); 
    //sender en fejlbesked tilbage
  }
  res.send({ message: 'Dit produkt er nu opdateret' });
});

//Slet produkt

router.delete('/:productid/', async (req, res) => {

  let user = new User(req.body.user_id);
  let result = await user.deleteProduct(req.params.productid);
  if (result === false) {
    return res.status(401).json({ error: 'Varer kunne ikke slettes, da den ikke kunne findes'}); 
    //Her sikrer vi os at der bliver sendt en fejlmeddelelse hvis deleteproduct ikke lykkedes
  }
  res.send({ text: 'Sletning lykkedes,' });
});

module.exports = router;
