const fs = require("node:fs/promises");
const express = require("express");
const Product = require("./resources/products/products.model");

const app = express();
require("dotenv").config();
require("./db/connect")();

// registering middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const products = require("./products.json");

app.get("/products", async (req, res) => {
  const products = await Product.find();

  res.send(products);
});

app.get("/products/title", (req, res) => {
  // 1 - récupérer la query title
  const title = req.query.title;

  // 2 - renvoyer au client le bon livre
  const product = products.find(
    (product) => product.title.toLowerCase() === title.toLowerCase()
  );

  if (!product)
    return res.status(404).send({
      ok: false,
      msg: "Product not found",
    });

  res.send({
    ok: true,
    data: product,
  });
});

// route parameters
app.get("/products/:id", (req, res) => {
  const id = +req.params.id;

  const product = products.find((product) => product.id === id);

  if (!product)
    return res.status(404).send({
      ok: false,
      msg: "Product not found",
    });

  res.send({ ok: true, data: product });
});

app.post("/products", async (req, res) => {
  const product = new Product(req.body);
  await product.save();

  // products.push(product);

  try {
    await fs.writeFile(__dirname + "/products.json", JSON.stringify(products));

    res.status(201).send({ ok: true, data: product });
  } catch (err) {
    console.error(err.message);

    res.status(500).send({
      ok: false,
      msg: "Problem Server",
    });
  }
});

app.put("/products/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });

    if (!product)
      return res.status(404).send({
        ok: false,
        msg: "Product not found",
      });

    res.send({ ok: true, data: product });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({
      ok: false,
      msg: "Problem updating product in the database",
    });
  }
});

app.delete("/products/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findOneAndDelete({ _id: id });

    if (!product)
      return res.status(404).send({
        ok: false,
        msg: "Product not found",
      });

    res.send({ ok: true, data: product });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({
      ok: false,
      msg: "Problem deleting product from the database",
    });
  }
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Listenning on port ${PORT}`);
});
