const mongoose = require('mongoose');
const { DB_NAME } = require('../constant');

const connectDb = async () => {
    try {
        const url = `${process.env.MONGODB_URL}/${DB_NAME}`;        
        
        const connectionInstance = await mongoose.connect(url);        
        
        console.log(
            `MonogoDb Connected With ${connectionInstance.connection.host} DB: ${connectionInstance.connection.db.DB_NAME}`
        );
        return connectionInstance;
    } catch (error) {
        console.log(`MonogoDb Faild to Connect: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDb;