const { body, validationResult } = require("express-validator");

const validateCommand = [
    body("name")
        .notEmpty()
        .withMessage("Name is required")
        .isLength({ max: 100 })
        .withMessage("Command name cannot exceed 100 characters"),
    
    
    body("description")
        .notEmpty()
        .withMessage("Description is required"),
    
    body("category")
        .notEmpty()
        .withMessage("Category is required"),

    body("difficulty")
        .optional()
        .isIn(["beginner", "intermediate", "advanced"])
        .withMessage("Difficulty must be one of: beginner, intermediate, advanced"),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                errors: errors.array() 
            });
        }
    
        next();}
];  




module.exports = validateCommand;
