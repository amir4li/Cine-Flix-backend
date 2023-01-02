const express = require("express");
const userRouter = require("./routes/userRoutes");
const movieRouter = require("./routes/movieRoutes");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();
app.use(express.json());

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({  policy: "cross-origin" }));
app.use(morgan("common"));
app.use(cors("Access-Control-Allow-Origin: *"));

// Routes
app.use("/api/v1/movies", movieRouter);
app.use("/api/v1/users", userRouter);


module.exports = app;
