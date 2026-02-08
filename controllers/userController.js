// userController
const db = require('../db/queries');

async function showHomePage(req, res) {
    const userData = await db.getUsers();
    res.render("index", { title: 'Mini message board', messagesData: userData });
}

async function showMessage(req, res) {
    const messageId = Number(req.params.id);
    const result = await db.getMessages(messageId);

    if (result.length == 0) {
        return res.status(404).send("Message not found");
    }

    const messages = { message: result[0].message, sent_date: result[0].sent_date};
    // console.log(req.params.id);
    res.render("messageDetails", { messageDetails: messages });
}

function loadMessageForm(req, res) {
    res.render('form');
}

async function postMessage(req, res) {
    const messageText = req.body.messageText;
    const messageAuthor = req.body.author;

    await db.postNewMessage(messageAuthor, messageText);
    
    //To send users back to the index page after submitting a new message-
    res.redirect("/");
}

module.exports = {
    showHomePage,
    showMessage,
    loadMessageForm,
    postMessage,
};