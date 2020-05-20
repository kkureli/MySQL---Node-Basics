const express = require("express");
const bodyParser = require("body-parser");
db = require("./connection");
const PeopleRoutes = require("./routes/people");

const app = express();

app.use(bodyParser.json());

//create DB
app.get("/createdb", (req, res) => {
  let sql = "CREATE DATABASE nodemysql";
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
    res.send("Database created..");
  });
});

//create table
app.get("/createpoststable", (req, res) => {
  let sql =
    "CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))"; //primary key id olarak sectik
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.send("Posts table created...");
  });
});

//insert post 1

app.get("/addpost1", (req, res) => {
  let post = { title: "Post One", body: "This is post number one" };
  let sql = "INSERT INTO posts SET ?"; // soru isareti place holder alt satirda post koyduk soru isareti yerine
  let query = db.query(sql, post, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.send("Posts 1 added..");
  });
});

//insert post 2

app.get("/addpost2", (req, res) => {
  let post = { title: "Post Two", body: "This is post number two" };
  let sql = "INSERT INTO posts SET ?"; // soru isareti place holder alt satirda post koyduk soru isareti yerine
  let query = db.query(sql, post, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.send("Posts 2 added..");
  });
});

//Select posts

app.get("/getposts", (req, res) => {
  let sql = "SELECT * FROM posts";
  let query = db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.send("Posts fetched.." + JSON.stringify(result));
  });
});

//Select single post

app.get("/getsinglepost/:id", (req, res) => {
  let sql = `SELECT * FROM posts WHERE id=${req.params.id}`;

  let query = db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.send("Post fetched.." + JSON.stringify(result));
  });
});

//update post
app.get("/updatepost/:id", (req, res) => {
  let newTitle = "Updated Title";
  let sql = `UPDATE posts SET title='${newTitle}' WHERE id=${req.params.id}`;

  let query = db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.send("Post updated");
  });
});

//Delete post
app.get("/deletepost/:id", (req, res) => {
  let sql = `DELETE FROM posts WHERE id=${req.params.id}`;

  let query = db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.send("Post deleted...");
  });
});

app.use("/people", PeopleRoutes);

app.listen(3000);
