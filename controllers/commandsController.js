const Command = require("../models/Command");
const APIQueryBuilder = require("../utils/apiQueryBuilder");

//GET all commands (with filtering and search)
exports.getCommands = async (req, res, next) => {
  try {
    const features = new APIQueryBuilder(Command.find(), req.query)
      .filter()
      .search()
      .sort()
      .limitFields()
      .paginate();

    let commands = await features.query;

    if (req.query.search && commands.length === 0) {
        commands = await Command.find({
            $or: [
                { name: { $regex: req.query.search, $options: "i" } },
                { description: { $regex: req.query.search, $options: "i" } },
                { tags: { $regex: req.query.search, $options: "i" } },
            ],
        });
    }

    const total = commands.length;
    const limit = features.limit || 10;
    let page = features.page || 1;

    const pages = Math.ceil(total / limit) || 1;

    if (page > pages) page = pages;

    const hasNextPage = page < pages;
    const hasPrevPage = page > 1;

    const nextPage = hasNextPage ? page + 1 : null;
    const previousPage = hasPrevPage ? page - 1 : null;

    const start = (page - 1) * limit;
    const end = start + limit;

    commands = commands.slice(start, end);
 

    let formattedCommands = commands;
    

    // beginner mode (AFTER fetching)
    if (req.query.mode === "beginner") {
      formattedCommands = commands.map(cmd => ({
        name: cmd.name,
        whatItDoes: cmd.explanation || cmd.description,
        tryThis: cmd.example,
        difficulty: cmd.difficulty
      }));
    }

    res.status(200).json({
      success: true,
      message: "Commands retrieved successfully",
      info: {
        currentPage: page,
        totalPages: pages,
        totalCommands: total,
        next: nextPage
          ? `/api/commands?page=${nextPage}&limit=${limit}`
          : null,
        previous: previousPage
          ? `/api/commands?page=${previousPage}&limit=${limit}`
          : null
      },
      commands: formattedCommands,
    });

  } catch (err) {
    next(err);
  }
};



// GET single command
exports.getCommandById = async (req, res, next) => {
    try {
        const command = await Command.findById(req.params.id);

        if (!command) {
            return res.status(404).json({message: "Command not found"});
        }

        res.status(200).json(command);
    }   catch (err) {
        next(err);
    }
};

// CREATE command
exports.createCommand= async ( req, res, next ) => {
    try {
        const command = await Command.create(req.body);
        res.status(201).json(command);
    }   catch (err) {
        next(err);
    }
};

// UPDATE command
exports.updateCommand = async ( req, res, next ) => {
    try {
        const command = await Command.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!command) {
            return res.status(404).json({ message: "Command not found"});
        }
        res.status(200).json(command);
    }   catch (err) {
        next(err);
    }
};

// DELETE command
exports.deleteCommand = async ( req, res, next ) => {
    try {
        const command = await Command.findByIdAndDelete(req.params.id);
        
        if (!command) {
            return res.status(404).json({message: "Command not found"});
        }

        res.status(200).json({ message: "Command deleted" });
    }   catch (err) {
        next(err);
    }
};

exports.toggleFavorite = async (req, res, next) => {
    try {
        const command = await Command.findById(req.params.id);
        
        if (!command) {
            return res.status(404).json({ message: "Command not found" });
        }

        command.favorite = !command.favorite;
        await command.save();

        res.status(200).json( command );

    } catch (err) {
        next(err);
    }
    };

