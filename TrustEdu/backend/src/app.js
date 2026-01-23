const express = require("express");
const cors = require("cors");

const predictionRoutes = require("./routes/predictionRoutes");
const tutorRoutes = require("./routes/tutorRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", predictionRoutes);
app.use("/api", tutorRoutes);

module.exports = app;
