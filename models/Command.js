const mongoose = require("mongoose");
const slugify = require("slugify");

const variantSchema = new mongoose.Schema({
  command: String,
  description: String,
  example: String,
  difficulty: String
});

const commandSchema = new mongoose.Schema({
  name: String,

  slug: {
    type: String,
    unique: true,
    required: true
  },

  description: String,

  category: String,

  tags: {
    primary: [String],
    secondary: [String],
    context: [String],
    intent: [String],
    tools: [String]
  },

  example: String,

  difficulty: String,

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
