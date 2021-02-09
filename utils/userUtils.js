const fetch = require('node-fetch');

function isUserRegistered(userID, registeredUsers) {
    // console.log(userID);
    // console.log(registeredUsers);

    return registeredUsers.includes(userID);
}

async function getRegisteredUsers() {
    try {
        const response = await fetch('http://localhost:3000/getUsers');
        const responseJSON = await response.json();

        return responseJSON;
    } catch (error) {
        console.log('There were problems fetching the users');

        return '';
    }
}

async function createUser(user) {
    console.log('should make a request');
    const response = await fetch('http://localhost:3000/createUser', {
        method: 'post',
        body: JSON.stringify(user),
        headers: { 'Content-Type': 'application/json' }
    });
    const responseJSON = await response.json();

    console.log('response in bot'+ responseJSON.error);
}

async function getUser(userID) {
    try {
        const response = await fetch('http://localhost:3000/getUsers');
        const responseJSON = await response.json();

        return responseJSON;
    } catch (error) {
        console.log('There were problems fetching the users');

        return '';
    }
}

module.exports = {
    isUserRegistered: isUserRegistered,
    getRegisteredUsers: getRegisteredUsers,
    createUser: createUser
}