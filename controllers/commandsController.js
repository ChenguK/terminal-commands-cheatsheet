const Command = require("../models/Command");

//GET all commands (with filtering and search)
exports.getCommands = async (req, res, next) => {
    try {
        const {tag, category, difficulty, search } = req.query;

        let query = {};
        if (tag) query.tags = tag;
        if (category) query.category = category;
        if (difficulty) query.difficulty = difficulty;

        if (search) {
            query.$text = { $search: search };
        }
        
        const commands = await Command.find(query);

        res.status(200).json(commands);
    }   catch (err) {
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