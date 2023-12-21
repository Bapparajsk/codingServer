const mongoose = require('mongoose');

mongoose.connect(process.env.YOUR_MONGODB_URI_USER).then(() => {
    console.log('dataBase connect successful...');
}).catch((e) => {
    console.log('dataBase not connect..!');
});