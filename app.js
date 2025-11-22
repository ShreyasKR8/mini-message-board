const path = require("node:path");
const express = require('express');
const indexRouter = require("./routes/indexRouter");

const app = express();
const port = 3000;

//set up ejs view engine and path
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//set up routes
app.use('/', indexRouter);

//set up server
app.listen(port, () => {
    console.log(`Server listening at ${port}`);
});
