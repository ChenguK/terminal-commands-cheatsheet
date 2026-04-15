const express = require("express");
const router = express.Router();
const commandsController = require("../controllers/commandsController");
const validateCommand = require("../middleware/errorHandler");


/**
 * @swagger
 * /api/commands:
 *   get:
 *     summary: Get all commands
 *     description: Retrieve a paginated list of CLI commands
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A paginated list of commands
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CommandResponse'
 */
/**
 * @swagger
 * /api/commands:
 *   post:
 *     summary: Create a new command
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Command'
 *     responses:
 *       201:
 *         description: Command created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Command'
 */
/**
 * @swagger
 * /api/commands/{id}:
 *   get:
 *     summary: Get a command by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single command
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Command'
 *       404:
 *         description: Command not found
 */
/**
 * @swagger
 * /api/commands/{id}/favorite:
 *   patch:
 *     summary: Toggle favorite status
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Updated command
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Command'
 */






router
    .route("/")
    .get(commandsController.getCommands)
    .post(validateCommand,commandsController.createCommand);

router
    .route("/:id")
    .get(commandsController.getCommandById)
    .put(commandsController.updateCommand)
    .delete(commandsController.deleteCommand);

router.get("/random", async ( req, res) => {
    const count = await Command.countDocuments();
    const random = Math.floor(Math.random() * count);

    const command = await Command.findOne().skip(random);

    res.json({
        message: "Try this command today!",
        command
    });
});

router.patch("/:id/favorite", commandsController.toggleFavorite);

module.exports = router;