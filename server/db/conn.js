const mongoose = require('mongoose');

// connecting with cloud database "nemesis"       // ***** if password contains "#" replace it with "%23" ***** //

const DB = process.env.DATABASE;

mongoose.connect(DB, {
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:false,
}).then(() =>{
    console.log('connection successful..')
}).catch((e) => {
    console.log(e);
});


