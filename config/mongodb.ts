
import Env from '@ioc:Adonis/Core/Env'
const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/Login');
mongoose.connect(Env.get('DB_MONGODB_CONNECTION', 'mongodb://localhost:27017/Login'), { useNewUrlParser: true, useUnifiedTopology: true })
    .then(_ => console.log("Successfull MongoDB connection"))
    .catch(console.error);
//    
