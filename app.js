const express = require("express");
const app = express();
const axios = require("axios");

const mysql = require("mysql");
const config = require("./config/config");

const port = 3300;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const pool = mysql.createPool({
  connectionLimit: config.limit,
  host: config.host,
  user: config.user,
  port: config.port,
  password: config.password,
  database: config.db,
  client: config.client,
});

pool.getConnection((err) => {
  if (err) throw err;
  console.log(`databases is connected`);
});

app.get("/get", (req, res) => {
  let sql = "select * from users";
  pool.query(sql, (err, result) => {
    if (err) throw err;
    return res.status(200).json({ data: result });
  });
});

app.get("/get-users", (req, res) => {
  axios.get("http://localhost:3300/get").then((result) => {
    res.status(200).send(result.data);
  });
});

app.post("/post", (req, res) => {
  let First_Name = req.body.First_Name;
  let Last_Name = req.body.Last_Name;
  let Email = req.body.Email;
  let Mobile = req.body.Mobile;

  let sql2 =
    "insert into users(First_Name,Last_Name,Email,Mobile) values('" +
    First_Name +
    "', '" +
    Last_Name +
    "', '" +
    Email +
    "', '" +
    Mobile +
    "')";
  pool.query(sql2, (err, result) => {
    if (err) throw err;
    return res.status(200).json({ message: result });
  });
});

app.post("/post-user", async (req, res) => {
  let First_Name = req.body.First_Name;
  let Last_Name = req.body.Last_Name;
  let Email = req.body.Email;
  let Mobile = req.body.Mobile;

  const result = await axios.post("http://localhost:3300/post-user", {
    First_Name,
    Last_Name,
    Email,
    Mobile,
  });

  let data = result.data;
  console.log(data);
  res.status(200).json({ message: data });
});

app.listen(port, (err) => {
  console.log(`server connected ${port}`);
});


// create database usersData;
// use usersData;
// create table users(
// First_Name varchar(50),
// Last_Name varchar(55),
// Email varchar(55),
// Mobile varchar(255)
// );

// insert into users(First_Name,Last_Name,Email,Mobile)
// 		values ('Nitesh','pawar','pawarn@gmail.com','8888059527');
        
// select * from users;
// truncate table users;