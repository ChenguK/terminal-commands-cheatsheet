const express = require("express");
const router = express.Router();
const commandsController = require("../controllers/commandsController");
const validateCommand = require("../middleware/errorHandler");
const Command = require("../models/Command");


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
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           example: name
 *       - in: query
 *         name: fields
 *         schema:
 *           type: string
 *           example: name,description
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *           example: git
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
 * /api/commands/{name}:
 *   get:
 *     summary: Get a command by Name
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *         type: string
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
 * /api/commands/{name}/favorite:
 *   patch:
 *     summary: Toggle favorite status
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *       - in: header
 *         name: x-user-id
 *         required: false
 *         schema:
 *           type: string
 *         description: Optional user identifier for personalized favorites
 *     responses:
 *       200:
 *         description: Updated command
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Command'
 */


/**
 * @swagger
 * /api/commands/random:
 *   get:
 *     summary: Get a random command
 *     description: Returns a random CLI command
 *     responses:
 *       200:
 *         description: A random command
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Try this command today!
 *                 command:
 *                   $ref: '#/components/schemas/Command'
 */




router
    .route("/")
    .get(commandsController.getCommands)
    .post(validateCommand,commandsController.createCommand);

router.get("/random", async ( req, res) => {
    const count = await Command.countDocuments();
    const random = Math.floor(Math.random() * count);

    const command = await Command.findOne().skip(random);

    res.json({
        message: "Try this command today!",
        command
    });
});

router
    .route("/:name")
    .get(commandsController.getCommandByName)
    .put(commandsController.updateCommand)
    .delete(commandsController.deleteCommand);



router.patch("/:name/favorite", commandsController.toggleFavorite);

module.exports = router;