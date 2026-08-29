const express = require("express");

const app = express();

const PORT = process.env.PORT || 3001;

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

app.listen(PORT, () => {
    console.log(
        `Love Thy Neighbor Housing backend running on port ${PORT}`
    );
});