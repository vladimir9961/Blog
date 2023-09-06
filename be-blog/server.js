const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
const cors = require("cors");

// Middleware
app.use(express.json());
app.use(cors());
app.use("/public", express.static(path.join(__dirname)));
app.use("/images", express.static(path.join(__dirname, "public/images")));

// Import the database connection function
const connectToDatabase = require("./config/db");

// Connect to the database
connectToDatabase();

// connect();
const routes = require("./routes/routes");

app.use(routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
