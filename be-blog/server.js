const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
const cors = require("cors");

app.use(express.json());
const allowedOrigins = [
  "https://blog-five-pi-59.vercel.app",
  "http://localhost:4200",
];
app.use(
  cors({
    origin: (origin, callback) => {
      // Check if the request origin is in the allowedOrigins array
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true); // Allow the request
      } else {
        callback(new Error("Not allowed by CORS")); // Block the request
      }
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Enable credentials (e.g., cookies)
  })
);
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
