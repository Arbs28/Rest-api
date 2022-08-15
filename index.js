const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const serverless = require('serverless-http');
app.use(express.json())
app.use(cors())
const produktRoute = require('./routes/routes')
app.use("/",produktRoute)
const categoryRoutes = require('./categoryRoutes/categoryRoutes')
app.use("/",categoryRoutes)
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

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get('/api/info', (req, res) => {
  res.send({ application: 'app-test-arb', version: '1' });
});
app.post('/api/v1/getback', (req, res) => {
  res.send({ ...req.body });
});

module.exports.handler = serverless(app);
