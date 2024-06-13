const mongoose = require('mongoose')
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(`mongodb+srv://rahulsanswebsolutions:Patidar9%40@cluster0.wg68pwc.mongodb.net/mera_test`)
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(`error  ${error.message}`);
        process.exit(1);
    }
}
module.exports = connectDB;