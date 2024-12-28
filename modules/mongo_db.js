const mongoose = require('mongoose');
require('dotenv').config();

//module.exports = dbConnect();

const db = "mongodb+srv://admin1:admin@cluster0.6micq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

//async function dbConnect() {
    mongoose.connect(db, {  
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
        // userCreateIndex: true,
        // userFindAndModify: false
    }).then(() => {
        console.log('MongoDB connected successfully');
    }).catch(err => {
        console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on("error", error => console.log('Mongoose connection error:', error));
    mongoose.Promise = global.Promise;
//}
