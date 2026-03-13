const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const Command = require("../models/Command");

describe("Commands API", () => {

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
    });

    afterAll(async () => {
        await mongoose.connection.close();
  });
  
  beforeEach(async () => {
    await Command.deleteMany({});
  });

    test("GET /api/commands - should return empty list initially", async () => {
        const res = await request(app).get("/api/commands");
       
        expect(res.statusCode).toBe(200);
        expect(res.body.results).toEqual([]);
    });

    test("POST /api/commands - should create a new command", async () => {
        const res = await request(app)
            .post("/api/commands")
            .send({
                name: "pwd",
               description: "Print working directory",
               category: "linux"
            });
                
        expect(res.statusCode).toBe(201);
        expect(res.body.name).toBe("pwd");

     });

     test("PATCH /api/commands/:id/favorite - should toggle favorite status", async () => {

        const command = await Command.create({
            name: "mkdir",
            description: "Create directory",
            category: "linux"
        });

        const res = await request(app)
            .patch(`/api/commands/${command._id}/favorite`);
            
        expect(res.statusCode).toBe(200);
        expect(res.body.favorite).toBe(true);
        });

    test("Get /api/commands - requesting page beyond total pages return last page", async () => {

        await Command.insertMany([
            { name: "cmd1", description: "test", category: "test" },
            { name: "cmd2", description: "test", category: "test"},
            { name: "cmd3", description: "test", category: "test"},
        ]);

        const res = await request(app)
            .get("/api/commands?page=99&limit=2");

        expect(res.statusCode).toBe(200);

        expect(res.body.page).toBeLessThanOrEqual(res.body.pages);

});
});

