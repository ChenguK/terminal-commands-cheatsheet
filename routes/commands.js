const express = require("express");
const router = express.Router();
const commandsController = require("../controllers/commandsController");

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