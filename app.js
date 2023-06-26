//  To controll ur website

const express = require("express");
const app = express();
const port = 5000;
const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });
const helmet = require("helmet");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// To import routes file
const allArticlesRouter = require("./routes/all-articles");

// for auto refresh
// const path = require("path");
// const livereload = require("livereload");
// const liveReloadServer = livereload.createServer();
// liveReloadServer.watch(path.join(__dirname, "public"));

// const connectLivereload = require("connect-livereload");
// app.use(connectLivereload());

// liveReloadServer.server.once("connection", () => {
//   setTimeout(() => {
//     liveReloadServer.refresh("/");
//   }, 100);
// });

// mongoose
const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB_URL)
  .then((result) => {
    app.listen(process.env.PORT || port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  })

  .catch((err) => {
    console.log(err);
  });

app.use(helmet());

app.get("/", (req, res) => {
  res.redirect("/all-articles");
});

app.get("/add-new-article", (req, res) => {
  res.render("add-new-article", { mytitle: "create new article" });
});

// all-articles PATH
app.use("/all-articles", allArticlesRouter);

//  404
app.use((req, res) => {
  res.status(404).send("Sorry can't find that!");
});
