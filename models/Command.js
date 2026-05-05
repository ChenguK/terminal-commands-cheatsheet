const mongoose = require("mongoose");
const slugify = require("slugify");

const variantSchema = new mongoose.Schema({
  command: String,
  description: String,
  example: String,
  difficulty: String
});

const commandSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },

  slug: {
    type: String,
    unique: true,
    required: true
  },

  description: { 
    type: String, 
    required: true 
  },

  category: { 
    type: String, 
    required: true },

  tags: {
    primary: [String],
    secondary: [String],
    context: [String],
    intent: [String],
    tools: [String]
  },

  example: String,

  difficulty: { 
    type: String, 
    required: true,
    enum: ["beginner", "intermediate", "advanced"],
  },

  variants: [variantSchema]
});

commandSchema.pre("validate", function () {
  if (!this.slug && this.name) {
    this.slug = slugify(this.name, {
      lower: true,
      strict: true
    });
  }
});

module.exports = mongoose.model("Command", commandSchema);
