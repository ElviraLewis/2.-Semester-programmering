const express = require("express");
const router = express.Router();
const { User } = require("../model/User.js");
const { Product } = require("../model/Product");
const { executeSQL } = require("../database/executeSQL");
const { RollbackTransactionEnvChangeToken } = require("tedious/lib/token/token");

//Opdater bruger
router.put("/:id", async (req, res) => {
  let user = new User(req.params.id);
  let result = await user.updateUser(req.body);
//Her sætter vi den nye bruger data in i vores .updateUser()
  if (Object.keys(result).length === 0) {
    return res.status(401).json({ error: "Can't update this user" });
  } //Her ser jeg om der kom noget resultat tilbage, og sender fejl hvis der ikke gør
//Hvis der tilgengæld ikke bliver sendt nogen fejl, så bliver en god besked sendt tilbage
  res.send({ message: "Opdatering af bruger lykkedes" });
});



//"POST" som opretter en ny bruger
router.post("/", async (req, res) => {
  
  //Her lader vi den nye brugers data blive defineret under new "User"
    let nybruger = new User(
      null,
      req.body.name,
      req.body.password
    );
    let result = await nybruger.saveUser();
    //Her sendes data'en videre til .saveuser i model/user.js
    res.status(200).send({ msg: "Ny bruger oprettet", result: nybruger });
    //hvis brugeren er oprettet sendes beskeden videre 
});

//Slet bruger
router.delete("/", async (req, res) => {
    const result = await new User().deleteUsers(loggedInId);
    res.status(200).send({ msg: 'bruger slettet'})
  }
);

//Log ind
router.post("/login", async (req, res) => {
  //Her sættes de nye data'er ind i usermodellen, men lader user_id være null
  let user = new User(
    null,
    req.body.username,
    req.body.password
  ); //user bliver nu sendt over i loginUser(), og defineret om til loggedin
  let loggedIn = await user.loginUser(req);

  if (!loggedIn) {
    res.status(401).json({ error: "Brugernavn eller password er forkert" });
  } else {
    res.json({ user_id: loggedIn.user_id});
  }
});

//Slet bruger
router.delete("/:id", async (req, res) => {
  const user = await new User();
});

//Vis Mine Produkter
router.get("/showMyProducts/:id", async (req, res) => {
  const products = await new User().showMyProducts(req.params.id);
  //showMyProducts kaldes, og der svares i form af json
  res.json({ id: req.params.id, products });
});

//Vis Produkter efter kategori
router.get("/showCategory/:category", async (req, res) => {
  const category = req.params.category;
  const products = await new User().showCategory(category);
  //showCategory kaldes, og der svares i form af json
  res.json({ id: category, products }); 
});

module.exports = router;
module.exports = schema;