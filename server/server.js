require("dotenv").config();
console.log('Dotenv config result:', require('dotenv').config());

// Debug: Check specific variables
console.log('PORT:', process.env.PORT);
console.log('MONGO_URI:', process.env.MONGO_URI);
console.log('Current working directory:', process.cwd());
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");

const connectDB = require("./config/db");

// import routes
const authRouter = require("./routes/auth.route");
const userRotuer = require("./routes/user.route");
const gigRouter = require("./routes/gig.route");
const conversationRouter = require("./routes/conversation.route");

const app = express();
const ENV = process.env;
const PORT = ENV.PORT;
const DB_URI = ENV.DB_URI;

app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
  })
);
ENV.NODE_ENV === "development" && app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

// mount routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRotuer);
app.use("/api/gigs", gigRouter);
app.use("/api/conversation", conversationRouter);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Internal Server Error";
  console.log(err);
  return res.status(errorStatus).json({ success: false, error: errorMessage });
});

app.listen(PORT, () => {
  console.log(`Server runnning on http://localhost:${PORT}/`);
  connectDB(DB_URI);
});
