const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(express.json())
app.use(cors())
const produktRoute = require('./routes/routes')
app.use("/api",produktRoute)
const categoryRoutes = require('./categoryRoutes/categoryRoutes')
app.use("/api",categoryRoutes)
const DBcon = async () => {
    try{
    await mongoose.connect('mongodb+srv://asd:asd@cluster0.7cbmq.mongodb.net/?retryWrites=true&w=majority')
    console.log('connected')
    }
    catch (err) {
        console.log(err)
    }
}
DBcon();
app.listen(5000,
  ()  => {
      console.log("test")
  }
)

