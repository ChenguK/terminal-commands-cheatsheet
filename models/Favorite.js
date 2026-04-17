const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({
  userId: {
    type: String, // later: ObjectName when you add auth
    required: true,
  },
  commandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Command",
    required: true,
  },
  commandName: {
    type: String,
  },
}, { timestamps: true });

// prevent duplicates
favoriteSchema.index({ userId: 1, commandName: 1 }, { unique: true });

module.exports = mongoose.model("Favorite", favoriteSchema);
