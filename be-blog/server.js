const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
const cors = require("cors");

app.use(express.json());
const allowedOrigins = [
  "https://blog-five-pi-59.vercel.app",
  "http://localhost:4200",
  "https://erin-awful-turkey.cyclic.cloud",
];
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};
app.use(cors(corsOptions));

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
