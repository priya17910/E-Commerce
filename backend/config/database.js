const mongoose = require ('mongoose');

const connectDatabase = () => {
    mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        family: 4,
    }).then ((data) => {
        console.log (`Mongo DB connected with server: ${data.connection.host}`);
    })
}

module.exports = connectDatabase