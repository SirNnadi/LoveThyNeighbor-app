const pool = require("../db/database");

describe("Database Connection", () => {

    afterAll(async () => {
        await pool.end();
    });

    test("connects to the database successfully", async () => {
        const result = await pool.query("SELECT 1");
        expect(result.rows).toBeDefined();
    });

    test("applications table exists", async () => {
        const result = await pool.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_name = 'applications'
        `);
        expect(result.rows.length).toBe(1);
    });

});
