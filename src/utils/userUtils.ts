const fetch = require('node-fetch');
import { DiscordMember, UserResponse } from '../interfaces/discord.interfaces';

async function isUserRegistered(member: DiscordMember): Promise<boolean> {
    const registeredUsers = await getRegisteredUsers();
    const currentMemberID = member.id;
    if (registeredUsers && registeredUsers.data) {
        const registeredUsersResponse = registeredUsers.data;
        return registeredUsersResponse.some((user: UserResponse)=> {
            return user.attributes.d_id  === currentMemberID;
        });
    }
    return false;
}

async function getRegisteredUsers() {
    try {
        const response = await fetch('http://localhost:1337/api/dusers');
        const responseJSON = await response.json();
        return responseJSON;
    } catch (error) {
        console.log('There were problems fetching the users');
        return null;
    }
}

async function createUser(member: DiscordMember) {
    // Check if the user exists already
    let resultSuccess = false;
    try {
        const userMember = member.user;
        const bodyData = {
            data: {
                d_id: userMember.id,
                d_avatar: member.displayAvatarURL({})
            }
        };
        const response = await fetch('http://localhost:1337/api/dusers', {
            method: 'POST',
            body: JSON.stringify(bodyData),
            headers: {
                'Content-Type': 'application/json',
             }
        });
        const responseJSON = await response.json();
        console.log(responseJSON);
        resultSuccess = responseJSON.error ? false : true;
    } catch (error) {
        resultSuccess = false;
    }
    console.log(resultSuccess);
    return resultSuccess;
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

export {
    isUserRegistered,
    getRegisteredUsers,
    createUser
};