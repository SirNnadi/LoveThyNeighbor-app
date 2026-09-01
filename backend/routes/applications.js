const express = require("express");
const router = express.Router();

const pool = require("../db/database");

router.get("/", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM applications ORDER BY created_at DESC"
        );
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to retrieve applications" });
    }
});

router.post("/", async (req, res) => {
    try {
        const {
            applicant_name,
            email,
            household_size,
            monthly_income,
            monthly_rent,
            requested_amount,
            reason
        } = req.body;

        // Validate required fields
        if (
            !applicant_name ||
            !email ||
            !household_size ||
            !monthly_income ||
            !monthly_rent ||
            !requested_amount ||
            !reason
        ) {
            return res.status(400).json({
                error: "All fields are required"
            });
        }

        const result = await pool.query(
            `
            INSERT INTO applications (
                applicant_name,
                email,
                household_size,
                monthly_income,
                monthly_rent,
                requested_amount,
                reason
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *
            `,
            [
                applicant_name,
                email,
                household_size,
                monthly_income,
                monthly_rent,
                requested_amount,
                reason
            ]
        );

        res.status(201).json(result.rows[0]);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to create application"
        });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            "SELECT * FROM applications WHERE id = $1",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "Application not found"
            });
        }

        res.json(result.rows[0]);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to retrieve application"
        });
    }
});

module.exports = router;
