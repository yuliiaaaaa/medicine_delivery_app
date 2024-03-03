const express = require("express");
require("dotenv").config();
const db = require("../queries");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT;
const bodyParser = require("body-parser");

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/shops", db.getShops);
app.get("/medicines/:shopId", db.getMedicinesByShop);
app.post("/orders", db.postOrder);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
