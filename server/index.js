// server/index.js
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const dotenv = require('dotenv'); // Load environment variables

dotenv.config(); // Load environment variables from a .env file

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

// Database connection using mysql2 and environment variables
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    process.exit(1); // Terminate the application on database connection error
  } else {
    console.log('Connected to MySQL');
  }
});

// Define API routes and start the server
// ...

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
