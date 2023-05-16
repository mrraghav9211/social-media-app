const mongoose = require('mongoose');

const connectDatabase = async ()=>{
    try {
        await mongoose.set('strictQuery', false)
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log("Error: "+ error.message);
    }
}

module.exports = connectDatabase;