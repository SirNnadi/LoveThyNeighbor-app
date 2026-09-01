const request = require("supertest");
const app = require("../server");
const pool = require("../db/database");

describe("Applications API", () => {

    afterAll(async () => {
        await pool.end();
    });

    test("GET / returns welcome message", async () => {
        const response = await request(app).get("/");
        expect(response.status).toBe(200);
        expect(response.body.application).toBe("Love Thy Neighbor Housing");
    });

    test("GET /api/health returns healthy status", async () => {
        const response = await request(app).get("/api/health");
        expect(response.status).toBe(200);
        expect(response.body.status).toBe("healthy");
    });

    test("POST /api/applications creates a new application", async () => {
        const response = await request(app)
            .post("/api/applications")
            .send({
                applicant_name: "John Doe",
                email: "john@example.com",
                household_size: 3,
                monthly_income: 2000,
                monthly_rent: 1200,
                requested_amount: 500,
                reason: "Lost job due to medical emergency"
            });
        expect(response.status).toBe(201);
        expect(response.body.applicant_name).toBe("John Doe");
    });

    test("POST /api/applications returns 400 when fields are missing", async () => {
        const response = await request(app)
            .post("/api/applications")
            .send({ applicant_name: "John Doe" });
        expect(response.status).toBe(400);
        expect(response.body.error).toBe("All fields are required");
    });

    test("GET /api/applications/:id returns 404 for non-existent application", async () => {
        const response = await request(app).get("/api/applications/99999");
        expect(response.status).toBe(404);
        expect(response.body.error).toBe("Application not found");
    });

});
