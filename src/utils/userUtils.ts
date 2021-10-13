const fetch = require('node-fetch');
import User from '../models/User';

function isUserRegistered(userID: string, registeredUsers: Array<string>) {
    return registeredUsers.includes(userID);
}

async function getRegisteredUsers() {
    try {
        const response = await fetch('http://localhost:3000/getUsers', {
            headers: {
                'shh-a-secret': 'CIr73CDhtMHRIgds6mRHCDAlFvGS6bhf'
            }
        });
        const responseJSON = await response.json();

        return responseJSON;
    } catch (error) {
        console.log('There were problems fetching the users');

        return '';
    }
}

async function createUser(user: User) {
    console.log('should make a request');
    const response = await fetch('http://localhost:3000/createUser', {
        method: 'post',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json',
            'shh-a-secret': 'CIr73CDhtMHRIgds6mRHCDAlFvGS6bhf'
         }
    });
    const responseJSON = await response.json();

    console.log('response in bot'+ responseJSON.error);
}

async function getUser(userID: string) {
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