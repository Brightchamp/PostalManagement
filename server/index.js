const express = require('express');
const cors = require('cors');
require('dotenv').config();

const mongoose = require('mongoose');

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { dbName:'PostalManagement', useNewUrlParser: true });

const connection = mongoose.connection;
connection.once('open',()=>{
    console.log('MongoDB connection established successfully!')
})

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
})