require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require("./db/database");

const applicationsRouter = require("./routes/applications");

const app = express();

const PORT = process.env.PORT || 3001;

app.use(cors({ origin: process.env.CORS_ORIGIN || "http://localhost:5173" }));
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        application: "Love Thy Neighbor Housing",
        message: "Welcome to Love Thy Neighbor Housing"
    });
});

app.get("/api/health", (req, res) => {
    res.json({
        status: "healthy"
    });
});

app.use("/api/applications", applicationsRouter);

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(
            `Love Thy Neighbor Housing backend running on port ${PORT}`
        );
    });
}

module.exports = app;