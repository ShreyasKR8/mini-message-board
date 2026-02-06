const db = require('../db/queries');

async function getUsers(req, res) {
    const userData = await db.getUsers();
    // console.log(userData);
    // res.render('index', { title: 'Mini message board', messagesData: messages })
    res.render("index", { title: 'Mini message board', messagesData: userData });
}

async function getMessages(req, res) {
    const messageId = Number(req.params.id);
    const result = await db.getMessages(messageId);
    const messages = { message: result[0].message, sent_date: result[0].sent_date};
    if (!messages) {
        return res.status(404).send("Message not found");
    }
    // console.log(req.params.id);
    res.render("messageDetails", { messageDetails: messages });
}

function postMessage(req, res) {
    const messageText = req.body.messageText;
    const messageAuthor = req.body.author;

    db.postNewMessage(messageAuthor, messageText);
    
    //To send users back to the index page after submitting a new message-
    res.redirect("/");
}

module.exports = {
    getUsers,
    getMessages,
    postMessage,
};