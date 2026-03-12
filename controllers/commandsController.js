const Command = require("../models/Command");

//GET all commands (with filtering and search)
exports.getCommands = async (req, res, next) => {
    try {
        const { tag, category, difficulty, search, page = 1, limit = 10, sort, fields } = req.query;

        let query = {};


        if (tag) query.tags = tag;
        if (category) query.category = category;
        if (difficulty) query.difficulty = difficulty;

        if (search) {
            query.$text = { $search: search };
        }

        const pageNumber = parseInt(page);
        const limitNumber = parseInt(limit);
        let sortOption = {};
        let fieldSelection = "";

        if (fields) {
            fieldSelection = fields.split(",").join(" ");
        }

        if (sort) {
            const [field, order] = sort.split(":");
            sortOption[field] = order === "desc" ? -1 : 1;
        } else {
            sortOption.createdAt = -1; // Default sorting by newest
        }


        const commands = await Command.find(query)
            .select(fieldSelection)
            .sort(sortOption)
            .skip((pageNumber - 1) * limitNumber)
            .limit(limitNumber);

        const total = await Command.countDocuments(query);
        const pages = Math.ceil(total / limitNumber);
        const hasNextPage = pageNumber < pages;
        const hasPrevPage = pageNumber > 1;
        const nextPage = hasNextPage ? pageNumber + 1 : null;
        const prevPage = hasPrevPage ? pageNumber - 1 : null;


        res.status(200).json({
            total,
            page: pageNumber,
            pages,
            limit: limitNumber,
            hasNextPage,
            hasPrevPage,
            nextPage,
            prevPage,
            results: commands
        });
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

