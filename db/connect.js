const mongoose = require('mongoose');
const userModels = require('./models/user-models');

function connectDB() {
    mongoose.connect('mongodb://localhost/botDB', {useNewUrlParser: true, useUnifiedTopology: true});
    const db = mongoose.connection;
    let error = false;

    db.on('error', function() {
        console.error.bind(console, 'connection error:');
        error = true;
    });

    db.once('open', function() {
        console.log('connected...');
        error = false;
    });

    return error;
}

async function createUser(user) {
    const connectionError = connectDB();
    const db = mongoose.connection;

    if (connectionError) {
        return;
    }

    const creationSuccess = await userModels.discordUsersModel.create({
        id: user.id,
        name: user.name,
        tag: user.tag
    }, (err, instanceStatus) => {
        if (err) {
            console.log('Error happened:' + err);
            return false;
        } else {
            console.log('saved');
            mongoose.disconnect();
            db.close();
            return true;
        }
    });

    return creationSuccess;
}

module.exports = {
    createUser: createUser
}