const express = require('express');
const mysql = require('mysql');
const cors = require("cors");

const port = 3001; // You can use any port you prefer

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'bop',
});

db.connect((err) => {
  if (err) {
    console.error('Database connection error: ' + err.message);
  } else {
    console.log('Connected to MySQL database');
  }
});

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.post('/register', (req, res) => {

  const username = req.body.username
  const email = req.body.email
  const password = req.body.password

  console.log(username,email,password);

  db.query("INSERT INTO users (username, email, password) VALUES (?,?,?)",
  [username,email,password],
  (err,result) => {
    console.log(err);
  })

  console.log("registration attempt received");
})

app.post('/login', (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  console.log(username, password);
  console.log("login attempt received");

  db.query(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password],
    (err, result) => {
      if (err){
        res.send({err: err})
      }

      if (result.length > 0) {
        res.send(result)
      } else {
        res.send({message: "Incorrect username/password combination!"})
      }
    }
  )
  
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
