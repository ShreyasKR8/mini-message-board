// indexRouter
const { Router } = require("express");
const express = require('express');
const userController = require('../controllers/userController');

const indexRouter = Router();

//to parse the form data into req.body of a post
indexRouter.use(express.urlencoded({ extended: true }));

//handler for index route
indexRouter.get('/', userController.showHomePage);

indexRouter.get('/new', userController.loadMessageForm);

indexRouter.get('/message/:id', userController.showMessage);

indexRouter.post('/new', userController.postMessage);

indexRouter.post('/delete/:id', userController.deleteUserMessagePost);

module.exports = indexRouter;