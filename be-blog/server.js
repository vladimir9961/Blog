const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
const cors = require("cors");

app.use(express.json());
const corsOptions = {
  origin: "https://blog-tan-ten-60.vercel.app", // Remove the trailing slash
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(function (req, res, next) {
  // Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"
  ); // Make sure this line is within res.header() method
  next();
});
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
