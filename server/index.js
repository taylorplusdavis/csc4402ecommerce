const express = require("express");
const db = require("./config/db");
const cors = require("cors");

const app = express();
const PORT = 3001;
app.use(cors());
app.use(express.json());

//Route to get all clients
app.get("/api/get", (req, res) => {
  db.query("SELECT * FROM clientstest", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// Route to add a client
app.post("/api/create", (req, res) => {
  const firstName = req.body.FirstName;
  const lastName = req.body.LastName;
  const email = req.body.Email;
  db.query(
    "INSERT INTO clientstest (FirstName, LastName, Email) VALUES (?,?,?)",
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
app.post("/api/get", (req, res) => {
  let firstName = req.body.FirstName;
  let lastName = req.body.LastName;
  let email = req.body.Email;
  let customStatement = req.body.CustomStatement;

  if (customStatement !== undefined) {
    db.query(`${customStatement}`, [customStatement], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  } else
    db.query(
      `SELECT * FROM clientstest WHERE FirstName = ? OR LastName = ? OR Email = ?`,
      [firstName, lastName, email],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
