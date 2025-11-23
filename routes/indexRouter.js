const { Router } = require("express");
const express = require('express');

const indexRouter = Router();

const messages = [
  {
    id: 1,
    text: "Hi there!",
    user: "Amanda",
    added: new Date()
  },
  {
    id: 2,
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];

//handler for index route
indexRouter.get('/', (req, res) => {
    res.render('index', { title: 'Mini message board', messagesData: messages });
});

indexRouter.get('/new', (req, res) => {
    res.render('form');
});

indexRouter.get('/message', (req, res) => {
    res.render('messageDetails');
});

indexRouter.get('/message/:id', (req, res) => {
    const messageId = Number(req.params.id);
    const messageToDisplay = messages.find(message => message.id == messageId);
    if (!messageToDisplay) {
        return res.status(404).send("Message not found");
    }

    res.render('messageDetails', { messageDetails: messageToDisplay });
});

//to parse the form data into req.body of a post
indexRouter.use(express.urlencoded({ extended: true }));

indexRouter.post('/new', (req, res) => {
    const messageId = messages.length + 1;
    const messageText = req.body.messageText;
    const messageAuthor = req.body.author;

    messages.push({ id: messageId, text: messageText, user: messageAuthor, added: new Date() });
    
    //To send users back to the index page after submitting a new message-
    res.redirect("/")
})

module.exports = indexRouter;