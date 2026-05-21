require("dotenv").config();
const mongoose = require("mongoose");
const slugify = require("slugify");
const Command = require("../models/Command");
const commandData = require("../data/commands.json");

const commands = Array.isArray(commandData)
  ? commandData
  : commandData.commands || [];


const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    if (process.env.NODE_ENV !== "production") {
      await Command.deleteMany({});
      console.log("Old data cleared");
    }

    const commandsWithSlugs = commands.map(cmd => ({
      ...cmd,
      slug: slugify(cmd.name, { 
        lower: true, 
        strict: true 
      })
    }));

    console.log(commands.length, "commands to insert");
    console.log(commands[0]);

    await Command.insertMany(commandsWithSlugs);

    console.log("✅ Database seeded!");
    process.exit();
  } catch (err) {
    console.error("❌ Seeding error:", err);
    process.exit(1);
  }
};

seedDB();
