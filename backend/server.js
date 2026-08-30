const express = require("express");
const cors = require("cors");
const pool = require("./db/database");

const applicationsRouter = require("./routes/applications");

const app = express();

const PORT = process.env.PORT || 3001;

app.use(cors({ origin: "http://localhost:5173" }));
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

app.listen(PORT, () => {
    console.log(
        `Love Thy Neighbor Housing backend running on port ${PORT}`
    );
});

app.get("/api/applications", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM applications ORDER BY created_at DESC"
        );

        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Failed to retrieve applications"
        });
    }
});