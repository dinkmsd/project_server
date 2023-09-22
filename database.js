const mongoose = require('mongoose');
const uri_compass = "mongodb://127.0.0.1/list_lamp"
async function connect() {
    try {
        await mongoose.set('strictQuery', true);
        await mongoose.connect(uri_compass, {
            useNewUrlParser: true
        })
        console.log('Connect db success')
    } catch (error) {
        console.log(error)
    }
};
module.exports = { connect };