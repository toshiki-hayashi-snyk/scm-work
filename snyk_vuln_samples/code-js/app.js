const express = require("express");
const cp = require("child_process");
const mysql = require("mysql");

const app = express();
// WARNING: Intentional insecure examples for SAST detection only.
const db = mysql.createConnection({host:"localhost", user:"root", password:"root", database:"test"});

// SQL Injection (concatenates user input directly)
app.get("/user", (req, res) => {
  const id = req.query.id; // e.g., 1 OR 1=1
  db.query("SELECT * FROM users WHERE id=" + id, (err, rows) => {
    if (err) return res.status(500).send("db error");
    res.json(rows);
  });
});

// Command Injection (exec with user input)
app.get("/ping", (req, res) => {
  const host = req.query.host; // e.g., 127.0.0.1; cat /etc/passwd
  cp.exec("ping -c 1 " + host, (err, stdout, stderr) => {
    if (err) return res.status(500).send("cmd error");
    res.send(stdout || "ok");
  });
});

// Reflected XSS (no output encoding)
app.get("/hello", (req, res) => {
  const name = req.query.name; // e.g., <script>alert(1)</script>
  res.send("Hello " + name);
});

app.listen(3000, () => console.log("listening on 3000"));
