//import mongoose from 'mongoose';
const mongoose = require('mongoose');
const { connect, connection } = require('mongoose');


//mongoose.set('strictQuery', true);
//import dotenv from 'dotenv';
const dotenv = require('dotenv')

// dotenv.config();

try {
  const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialDB';
  
  //const db = mongoose.connect(connectionString);
  connect(connectionString);
  
} catch (error) {
  console.log("Err: ", error);
  
}


/*
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to ' + connectionString);
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});
*/

//export default db;
module.exports = connection;

