require("dotenv").config();
const mongoose = require("mongoose");
const Command = require("../models/Command");
const commands = require("./commands.json");


const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    // safer: only wipe in dev
    if (process.env.NODE_ENV !== "production") {
      await Command.deleteMany();
      console.log("Old data cleared");
    }

    await Command.insertMany(commands);

    console.log("✅ Database seeded!");
    process.exit();
  } catch (err) {
    console.error("❌ Seeding error:", err);
    process.exit(1);
  }
};

seedDB();
