const mongoose = require('mongoose');
const dns = require('dns');

const connectDB = async () => {
    try {
        dns.setServers(['8.8.8.8', '8.8.4.4']);
        
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            family: 4
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.error('MongoDB connection failed:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;