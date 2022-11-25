const express = require("express");
const db = require("./config/db");
const cors = require("cors");

const app = express();
const PORT = 3002;
app.use(cors());
app.use(express.json());

//Route to get all clients
app.get("/api/get/allusers", (req, res) => {
  db.query("SELECT * FROM user", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//Route to get last 5 products
app.get("/api/get/recent", (req, res) => {
  db.query("SELECT * FROM product", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      const length = result?.data?.length;
      result.data = result.data?.slice(length - 4, length);
      res.send(result);
    }
  });
});

// Route to add a client
app.post("/api/create/insertuser", (req, res) => {
  const firstName = req.body.FirstName;
  const lastName = req.body.LastName;
  const email = req.body.Email;
  db.query(
    "INSERT INTO user (first_name, last_name, email) VALUES (?,?,?)",
    [firstName, lastName, email],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

// Route to find a client
app.post("/api/get/login", (req, res) => {
  let password = req.body.Password;
  let email = req.body.Email;

  db.query(
    `SELECT * FROM user WHERE email = ? AND password = ?`,
    [email, password],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// Route to execute a query
app.post("/api/send/customstatement", (req, res) => {
  let customStatement = req.body.CustomStatement;

  db.query(`${customStatement}`, [customStatement], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//Route to get men's products
app.get("/api/get/mens", (req, res) => {
  db.query("SELECT * FROM product WHERE sex = 'M'", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//Route to get women's products
app.get("/api/get/womens", (req, res) => {
  db.query("SELECT * FROM product WHERE sex = 'F'", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
