require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");

// Initialize express and define a port
const app = express();
const PORT = 8001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", routes);

app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
