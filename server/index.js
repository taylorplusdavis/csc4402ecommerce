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

app.post("/api/get/user", (req, res) => {
  const id = req.body.id;
  db.query("SELECT * FROM user WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//Route to get last 5 products
app.get("/api/get/recent", (req, res) => {
  db.query("SELECT * FROM product LIMIT 5", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      // const length = result?.data?.length;
      // result.data = result.data?.slice(length - 4, length);
      res.send(result);
    }
  });
});

app.get("/api/get/wishlist", (req, res) => {
  const id = req.body.id;

  db.query(
    "SELECT * FROM product WHERE id=(SELECT product_id FROM wishlist WHERE user_id = 1 AND product_id=product.id)",
    [id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        const length = result?.data?.length;
        result.data = result.data?.slice(length - 4, length);
        res.send(result);
      }
    }
  );
});

// Route to add a client
app.post("/api/send/registeruser", (req, res) => {
  const firstName = req.body.first_name;
  const lastName = req.body.last_name;
  const email = req.body.email;
  const password = req.body.password;

  db.query(
    "INSERT INTO user (first_name, last_name, email, password) VALUES (?,?,?,?)",
    [firstName, lastName, email, password],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.post("/api/send/wishlistadd", (req, res) => {
  const id = req.body.id;
  const product = req.body.product;

  db.query(
    "INSERT INTO wishlist (user_id, product_id) VALUES (?,?)",
    [id, product],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.post("/api/send/wishlistremove", (req, res) => {
  const id = req.body.id;
  const product = req.body.product;

  db.query(
    "DELETE FROM wishlist WHERE user_id = ? AND product_id = ?",
    [id, product],
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
  const email = req.body.email;
  const password = req.body.password;

  db.query(
    `SELECT id FROM user WHERE email = ? AND password = ?`,
    [email, password],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({ message: "Wrong Email/Password combination!" });
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

app.get("/api/get/accessories", (req, res) => {
  db.query("SELECT * FROM product WHERE sex = 'A' ", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/api/update/firstname", (req, res) => {
  const id = req.body.id;
  const firstname = req.body.first_name;

  db.query(
    "UPDATE user SET first_name = ? WHERE id = ?",
    [firstname, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("First name updated!");
      }
    }
  );
});

app.post("/api/update/lastname", (req, res) => {
  const id = req.body.id;
  const last_name = req.body.last_name;

  db.query(
    "UPDATE user SET last_name = ? WHERE id = ?",
    [last_name, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Last name updated!");
      }
    }
  );
});

app.post("/api/update/email", (req, res) => {
  const id = req.body.id;
  const email = req.body.email;

  db.query(
    "UPDATE user SET email = ? WHERE id = ?",
    [email, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Email updated!");
      }
    }
  );
});

app.post("/api/update/password", (req, res) => {
  const id = req.body.id;
  const password = req.body.password;

  db.query(
    "UPDATE user SET password = ? WHERE id = ?",
    [password, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Password updated!");
      }
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
