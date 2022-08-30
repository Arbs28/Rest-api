const mongoose = require('mongoose');
require('dotenv').config();
mongoose.Promise = global.Promise;

module.exports = connectToDatabase = async () => {
        try{
            const URL = "mongodb+srv://asd:asd@cluster0.7cbmq.mongodb.net/?retryWrites=true&w=majority"
            const databaseConnection = await mongoose.connect(URL , {useNewUrlParser:true})
            console.log("connected")
            }
            catch (err) {
                console.log(err)
            }
}