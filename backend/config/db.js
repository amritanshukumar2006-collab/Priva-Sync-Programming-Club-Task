const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000
        });

        console.log("MongoDB connected");

    } catch (error) {
        console.log("DB Error:", error.message);
    }
};

module.exports = connectDB;
