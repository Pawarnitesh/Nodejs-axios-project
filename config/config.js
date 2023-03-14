let config = {
  limit: 100,
  host: "localhost",
  user: "root",
  port: 3306,
  password: "Admin@123",
  db: "usersData",
  client: "mysql",
};

module.exports = config;(req, res) => {
  
  let sql = "select * from users";
  pool.query(sql, (err, resultdata) => {
    if (err) throw err;
    else res.send(resultdata);
  });
};
