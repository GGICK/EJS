const express = require("express");
const app = express();
const path = require("path");
const expressLayouts = require("express-ejs-layouts");

app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(expressLayouts);
app.use(express.static("public"));

const users2 = [
  { name: "kim", age: 17, role: "front" },
  { name: "lee", age: 25, role: "back" },
  { name: "park", age: 30, role: "full" },
  { name: "choi", age: 16, role: "front" },
];

app.get("/", (req, res) => {
  const data = { message: "눈아프다" };
  res.render("index", {
    tasks: tasks,
    users2,
    data,
    people: [{ name: "park" }, { name: "lee" }, { name: "kim" }],
  });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/form", (req, res) => {
  res.render("form");
});

app.post("/submit", (req, res) => {
  const { name, email } = req.body;
  res.render("result", { name, email });
});

let tasks = [];
app.post("/addTask", (req, res) => {
  const newTask = req.body.newTask;
  if (newTask) {
    tasks.push(newTask);
  }
  res.redirect("/");
});

app.post("deleteTask", (req, res) => {
  const deleteTask = req.body.task;
  tasks = tasks.filter((task) => task !== deleteTask);
  res.redirect("/");
});

app.listen(8000, () => {
  console.log("연결 http://localhost:8000");
});
