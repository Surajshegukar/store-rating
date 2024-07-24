const mongoose = require('mongoose')
const MONGODB_URL = "mongodb://127.0.0.1:27017/store?directConnection=true&readPreference=primary"


const connectDB = async()=>{
    try {
        const connectionInstance = await mongoose.connect(MONGODB_URL);
        console.log("MongoDB Connected");
        
    } catch (error) {
        console.log("MongoDB Connection Error : ",error);
        process.exit(1);
        
    }
}

module.exports= connectDB;