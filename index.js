const express = require("express");
const app = express();
const cors = require("cors");
const config = require("./config");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
require("./loaders/db")();
require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());


app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  res.send("<h1>Initial route running...</h1>");
});
async function startServer() {
  app
    .listen(config.port, () => {
      console.log(` Server is listening on port: ${config.port}  `);
    })
    .on("error", (err) => {
      console.log("Server starting error: ", err);
      process.exit(1);
    });
}
startServer();
