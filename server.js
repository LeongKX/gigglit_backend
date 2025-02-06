require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(cors());

mongoose
  .connect(process.env.MONGODB_URL + "/gigglit")
  .then(() => console.log("MongoDB is connected"))
  .catch((error) => {
    console.log(error);
  });

app.get("/", (req, res) => {
  res.send("Happy coding!");
});

app.use("/api/posts", require("./routes/post"));
app.use("/api/topics", require("./routes/topic"));
app.use("/api/bookmarks", require("./routes/bookmark"));
app.use("/api/user", require("./routes/user"));

app.listen(5555, () => {
  console.log("Server is running at http://localhost:5555");
});
