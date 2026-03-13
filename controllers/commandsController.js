const Command = require("../models/Command");
const APIQueryBuilder = require("../utils/apiQueryBuilder");

//GET all commands (with filtering and search)
exports.getCommands = async (req, res, next) => {
    try {
        const total = await Command.countDocuments();

        const features = new APIQueryBuilder(Command.find(), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();

        const commands = await features.query;

        const pages = Math.ceil(total / features.limit);

        let page = features.page;
        if (page > pages) {
            page = pages;
        }

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

