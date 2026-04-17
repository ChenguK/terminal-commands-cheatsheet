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
    explanation: {
      type: String,
    },
    slug: {
      type: String,
      lowercase: true,
      unique: true,
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

commandSchema.pre("save", function (next) {
  this.slug = this.name
  .toLowerCase()
  .replace(/\s+/g, "-");
  
  next();
});

module.exports = mongoose.model("Command", commandSchema);
