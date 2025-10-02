// insecure.js
const express = require('express');
const app = express();

// SQLインジェクションの例
app.get('/user', function (req, res) {
  db.query("SELECT * FROM users WHERE name = '" + req.query.name + "'", function (err, result) {
    res.send(result);
  });
});
app.listen(3000);

// test
