const Command = require("../models/Command");
const APIQueryBuilder = require("../utils/apiQueryBuilder");
const stringSimilarity = require("string-similarity");
const Favorite = require("../models/Favorite");

// Helper for fuzzy fallback
function isCloseMatch(a, b) {
  if (Math.abs(a.length - b.length) > 1) return false;

  let mismatches = 0;
  for (let i = 0; i < Math.min(a.length, b.length); i++) {
    if (a[i] !== b[i]) mismatches++;
    if (mismatches > 2) return false;
  }

  return true;
}

// GET all commands
exports.getCommands = async (req, res, next) => {
  try {

    // FUZZY SEARCH MODE
    if (req.query.search) {
      const search = req.query.search.toLowerCase();

      const allCommands = await Command.find();

      const scored = allCommands.map((cmd) => {
        const words = [
          ...cmd.name.toLowerCase().split(" "),
          ...cmd.description.toLowerCase().split(" "),
        ];

        let score = 0;

        words.forEach((word) => {
          const similarity = stringSimilarity.compareTwoStrings(search, word);

          if (similarity > score) score = similarity;

          if (isCloseMatch(search, word)) {
            score = Math.max(score, 0.6);
          }
        });

        if (cmd.name.toLowerCase().includes(search)) score += 0.5;

        return {
          ...cmd.toObject(),
          score,
        };
      });

      const filtered = scored
        .filter((c) => c.score > 0.3)
        .sort((a, b) => b.score - a.score)
        .map(({ score, ...rest }) => rest);

        const userId = req.headers["x-user-id"] || "public";

        const favorites = await Favorite.find({ userId }).select("commandId");

        const favoriteIds = new Set(
        favorites.map(f => f.commandId.toString())
        );

        const resultsWithFavorites = filtered.map(cmd => ({
        ...cmd,
        favorite: favoriteIds.has(cmd._id.toString())
        }));


      return res.status(200).json({
        total: filtered.length,
        page: 1,
        pages: 1,
        limit: filtered.length,
        hasNextPage: false,
        hasPrevPage: false,
        nextPage: null,
        prevPage: null,
        results: resultsWithFavorites,
      });
    }

 
    // NORMAL MODE
    const features = new APIQueryBuilder(Command.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const commands = await features.query;

    const userId = req.headers["x-user-id"] || "public";

    const favorites = await Favorite.find({ userId }).select("commandId");

    const favoriteIds = new Set(
    favorites.map(f => f.commandId.toString())
    );

    const resultsWithFavorites = commands.map(cmd => ({
    ...cmd.toObject(),
    favorite: favoriteIds.has(cmd._id.toString())
}));


    // count AFTER filters applied (but BEFORE pagination)
    const total = await Command.countDocuments(
      features.query.getFilter()
    );

    const pages = Math.max(Math.ceil(total / features.limit), 1);

    let page = features.page;
    if (page > pages) page = pages;

    const hasNextPage = page < pages;
    const hasPrevPage = page > 1;

    res.status(200).json({
      total,
      page,
      pages,
      limit: features.limit,
      hasNextPage,
      hasPrevPage,
      nextPage: hasNextPage ? page + 1 : null,
      prevPage: hasPrevPage ? page - 1 : null,
      results: resultsWithFavorites,
    });
  } catch (err) {
    next(err);
  }
};

// GET single command
exports.getCommandByName = async (req, res, next) => {
  try {
    const command = await Command.findOne({ 
        name: req.params.name.toLowerCase()
    });

    if (!command) {
      return res.status(404).json({ message: "Command not found" });
    }

    const userId = req.headers["x-user-id"] || "public";

    const favorite = await Favorite.findOne({
    userId,
    commandId: command._id
    });

    res.status(200).json({
    ...command.toObject(),
    favorite: !!favorite
    });

  } catch (err) {
    next(err);
  }
};

// CREATE command
exports.createCommand = async (req, res, next) => {
  try {
    const command = await Command.create(req.body);
    res.status(201).json(command);
  } catch (err) {
    next(err);
  }
};

// UPDATE command
exports.updateCommand = async (req, res, next) => {
  try {
    const command = await Command.findOneAndUpdate(
      { name: req.params.name.toLowerCase() },
      req.body,
      { new: true, runValidators: true }
    );

    if (!command) {
      return res.status(404).json({ message: "Command not found" });
    }

    res.status(200).json(command);
  } catch (err) {
    next(err);
  }
};

//  DELETE command
exports.deleteCommand = async (req, res, next) => {
  try {
    const command = await Command.findOneAndDelete(
        { name: req.params.name.toLowerCase() 
        });

    if (!command) {
      return res.status(404).json({ message: "Command not found" });
    }

    res.status(200).json({ message: "Command deleted" });
  } catch (err) {
    next(err);
  }
};

// Toggle Favorite

exports.toggleFavorite = async (req, res, next) => {
  try {
    const userId = req.headers["x-user-id"] || "public"; 

    // Find command by name instead of ID for better UX
    const searchTerm = req.params.name.toLowerCase();

    const command = await Command.findOne({
        $or: [
            { slug: searchTerm.replace(/\s+/g, "-") },
            { name: searchTerm }
        ]
    });

    if (!command) {
      return res.status(404).json({
        success: false,
        message: "Command not found"
      });
    }

    const existing = await Favorite.findOne({
      userId,
      commandId: command._id
    });

    if (existing) {
      await existing.deleteOne();
      return res.json({ 
        success: true,
        favorite: false });
    }

    await Favorite.create({
      userId,
      commandId: command._id,
      commandName: command.name
    });

    res.json({ 
        success: true, 
        favorite: true });

  } catch (err) {
    next(err);
  }
};