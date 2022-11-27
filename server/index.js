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

// Route to find a client
app.post("/api/get/login", (req, res) => {

  const email = req.body.email;
  const password = req.body.password;

  db.query(
    `SELECT * FROM user WHERE email = ? AND password = ?`,
    [email, password],
    (err, result) => {
      if (err) {
        res.send({err: err});
      } 


      if(result.length > 0){
        res.send(result);
      }
      else{
          res.send({message: "Wrong Email/Password combination!"});
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
