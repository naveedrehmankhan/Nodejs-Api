const express = require('express');
const app = express();
const bodyParser = require('body-parser');


app.use(bodyParser.json());

require('./modules/mongo_db');
//Public Access API
const publicAccess_API = require('./routes/public_access');
app.use('/public', publicAccess_API);

//Private Access API
const privateAccess_API = require('./routes/private_access');
const middlewarePrivate = require('./middleware/token_validator');
app.use('/private',middlewarePrivate, privateAccess_API);

// const AddBookController = require('./routes/bookss/post_add');
// app.use('/book', AddBookController) 


app.listen(5000);