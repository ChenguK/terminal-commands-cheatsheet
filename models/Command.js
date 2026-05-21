const mongoose = require("mongoose");
const slugify = require("slugify");

const variantSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  command: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  example: {
    type: String,
    required: true
  },

  difficulty: {
    type: String,
    enum: ["beginner", "intermediate", "advanced"],
    required: true
  }
});

const commandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  slug: {
    type: String,
    required: true
  },

  summary: {
    type: String,
    required: true
  },

  category: {
    type: String,
    required: true
  },

  context: [
    {
      type: String
    }
  ],

  exampleUses: [
    {
      type: String
    }
  ],

  tags: {
    primary: [String],
    secondary: [String],
    context: [String],
    intent: [String],
    tools: [String]
  },

  example: {
    type: String,
    required: true
  },

  difficulty: {
    type: String,
    enum: ["beginner", "intermediate", "advanced"],
    required: true
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
