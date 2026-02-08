// userController
const { body, validationResult, matchedData } = require("express-validator");
const db = require('../db/queries');

exports.showHomePage = async (req, res) => {
    const userData = await db.getAllMessages();
    res.render("index", { title: 'Mini message board', messagesData: userData });
};

exports.showMessage = async (req, res) => {
    const messageId = Number(req.params.id);

    if (Number.isNaN(messageId)) {
        return res.status(400).send("Invalid message id");
    }

    const result = await db.getMessages(messageId);

    if (result.length == 0) {
        return res.status(404).send("Message not found");
    }

    const messages = { message: result[0].message, sent_date: result[0].sent_date };
    // console.log(req.params.id);
    res.render("messageDetails", { messageDetails: messages });
}

exports.loadMessageForm = (req, res) => {
    res.render('form', { errors: null });
};

const validateAuthor = [
    body("author")
        .trim()
        .notEmpty()
        .withMessage("Author name cannot be empty")
        .isLength({ min: 2, max: 30 })
        .withMessage("Author name must be between 2 and 30 characters.")
        .escape()
];

const validateMessage = [
    body("messageText")
        .trim()
        .notEmpty()
        .withMessage("Message cannot be empty")
        .isLength({ min: 1, max: 100 })
        .withMessage(`Message must be under 100 characters.`)
        .escape()
];

exports.postMessage = [
    validateAuthor,
    validateMessage,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("form", {
                errors: errors.array(),
                data: req.body,
            });
        }

        const { author, messageText } = matchedData(req);
        await db.postNewMessage(author, messageText);

        //To send users back to the index page after submitting a new message-
        res.redirect("/");
    }
];

exports.deleteUserMessagePost = async (req, res) => {
    const messageId = Number(req.params.id);

    if (Number.isNaN(messageId)) {
        return res.status(400).send("Invalid message id");
    }

    await db.deleteUserMessage(messageId);
    res.redirect('/');
};