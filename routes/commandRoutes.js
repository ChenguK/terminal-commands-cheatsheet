const express = require("express");
const router = express.Router();
const commandsController = require("../controllers/commandsController");
const validateCommand = require("../middleware/errorHandler");


/**
 * @swagger
 * /api/commands:
*   post:
*     summary: Create a new command
*     requestBody:
*       required: true
*       content:
*         application/json:
*           example:
*             name: ls
*             description: List directory contents
*             category: linux
*             difficulty: beginner
*     responses:
*       201:
*         description: Command created successfully
 *   get:
 *     summary: Get all commands
 *     description: Retrieve a paginated list of CLI commands
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
 *         description: A paginated list of commands
 *         content:
 *           application/json:
 *             example:
 *               total: 6
 *               page: 1
 *               pages: 2
 *               limit: 5
 *               hasNextPage: true
 *               hasPrevPage: false
 *               nextPage: 2
 *               prevPage: null
 *               results:
 *                 - name: ls
 *                   description: List directory contents
 *                   category: linux
 *                   difficulty: beginner
 *                   favorite: false
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