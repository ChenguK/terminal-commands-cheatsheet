const express = require("express");
const router = express.Router();
const commandsController = require("../controllers/commandsController");

/**
 * @swagger
 * /api/commands:
 *   get:
 *     summary: Get all commands
 *     description: Retrieve a list of CLI commands
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of results per page
 *     responses:
 *       200:
 *         description: A list of commands
 */




router
    .route("/")
    .get(commandsController.getCommands)
    .post(commandsController.createCommand);

router
    .route("/:id")
    .get(commandsController.getCommandById)
    .put(commandsController.updateCommand)
    .delete(commandsController.deleteCommand);

    module.exports = router;