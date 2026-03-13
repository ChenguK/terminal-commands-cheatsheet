const mongoose = require("mongoose");
require("dotenv").config();

const Command = require("../models/Command");

const commands = [
    {
        name: "ls",
        description: "List directory contents",
        category: "linux",
        tags: ["filesystem", "navigation"],
        example: "ls -la",
        difficulty: "beginner"
    },
    {
        name: "pwd",
        description: "Print working directory",
        tags: ["filesystem"],
        example: "pwd",
        category: "beginner"
    },
    {
        name: "mkdir",
        description: "Create a new directory",
        category: "linux",
        tags: ["filesystem"],
        example: "mkdir new_folder",
        difficulty: "beginner"
    },
    {
        name: "grep",
        description: "Search text using patterns",
        category: "linux",
        tags: ["search", "text"],
        example: "grep 'error' log.txt",
        difficulty: "intermediate"
    },
    {
        name: "curl",
        description: "Transfer data from a server",
        category: "network",
        tags: ["http", "api"],
        example: "curl https://example.com",
        difficulty: "intermediate"
    },
    {
        name: "git clone",
        description: "Clone a repository",
        category: "git",
        tags: ["version-control"],
        example: "git clone https://github.com/user/repo.git",
        difficulty: "beginner"
    }
];

async function seed() {
    try {

        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected");

        await Command.deleteMany({});
        console.log("Old commands removed");

        await Command.insertMany(commands);
        console.log("Seed data inserted");
    
        process.exit();

    } catch (err) {
        console.error("Seeding failed:", err);
        process.exit(1);
    }
}

seed();