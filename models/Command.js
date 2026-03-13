const mongoose = require("mongoose");

const commandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      lowercase: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    example: {
      type: String,
    },
    difficulty: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
    },
    favorite: {
      type: Boolean,
      default: false,
    },

  },
  { timestamps: true }
);

// Text index for search capability
commandSchema.index({
  name: "text",
  description: "text",
  tags: "text",
});

module.exports = mongoose.model("Command", commandSchema);
