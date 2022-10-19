const express = require("express");
const db = require("./config/db");
const cors = require("cors");

const app = express();
const PORT = 3001;
app.use(cors());
app.use(express.json());

//Route to get all clients
app.get("/api/get", (req, res) => {
  console.log("Accessed");
  db.query("SELECT * FROM clientstest", (err, result) => {
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
