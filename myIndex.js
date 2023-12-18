const express = require("express");
const app = express();

// registering middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const products = require("./products.json");

app.get("/products", (req, res) => {
  res.send(products);
});

app.get("/products/title", (req, res) => {
  const title = req.query.title;
  console.log(title);

  const product = products.find(
    (product) => product.title.toLowerCase() === title.toLowerCase()
  );
  if (product) {
    res.send({
      ok: true,
      data: product,
    });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

app.get("/products/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);

  const product = products.find((product) => product.id === id);
  if (product) {
    res.send({
      ok: true,
      data: product,
    });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

/*
app.get("*", (req, res) => {
  res.send("Hello world");
});
*/

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
