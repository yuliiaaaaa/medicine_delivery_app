const { request, response } = require("express");
const pool = require("../connection.js");

const getMedicinesByShop = (request, response) => {
  const shop_id = request.params.shopId;
  console.log(shop_id);
  pool.query(
    "SELECT * FROM medicines WHERE shop_id = $1",
    [shop_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};
const getShops = (request, response) => {
  pool.query("SELECT * FROM medicineshops", (error, results) => {
    if (error) {
      console.error("Error fetching shops:", error);
      response.status(500).json({ error: "Internal server error" });
      return;
    }
    response.status(200).json(results.rows);
  });
};

const postOrder = async (req, res) => {
  try {
    console.log(req.body);
    const { user_email, user_phone, user_address, total_price, items } =
      req.body;
    const orderDate = new Date().toISOString();

    const orderResult = await pool.query(
      "INSERT INTO orders (user_email, user_phone, user_address, total_price, order_date) VALUES ($1, $2, $3, $4, $5) RETURNING id",
      [user_email, user_phone, user_address, total_price, orderDate]
    );

    const orderId = orderResult.rows[0].id;

    for (const item of items) {
      await pool.query(
        "INSERT INTO orderitems (order_id, medicine_id, quantity, subtotal, image_url, medicine_name, price) VALUES ($1, $2, $3, $4, $5, $6, $7)",
        [
          orderId,
          item.medicine_id,
          item.quantity,
          item.subtotal,
          item.image_url,
          item.medicine_name,
          item.price,
        ]
      );
    }

    res.status(201).json({ message: "Order submitted successfully" });
  } catch (error) {
    console.error("Error submitting order:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request" });
  }
};

module.exports = {
  getMedicinesByShop,
  getShops,
  postOrder,
};
