const { Router } = require("express");
const express = require('express');
const userController = require('../controllers/userController');

const indexRouter = Router();

//handler for index route
indexRouter.get('/', userController.getUsers);

indexRouter.get('/new', (req, res) => {
    res.render('form');
});

indexRouter.get('/message/:id', userController.getMessages);

//to parse the form data into req.body of a post
indexRouter.use(express.urlencoded({ extended: true }));

indexRouter.post('/new', userController.postMessage)
// indexRouter.post('/new', (req, res) => {
//     const messageId = messages.length + 1;
//     const messageText = req.body.messageText;
//     const messageAuthor = req.body.author;

//     messages.push({ id: messageId, text: messageText, user: messageAuthor, added: new Date() });
    
//     //To send users back to the index page after submitting a new message-
//     res.redirect("/")
// })

module.exports = indexRouter;