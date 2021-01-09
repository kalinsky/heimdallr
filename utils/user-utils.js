function isUserRegistered(userID, registeredUsers) {
    // console.log(userID);
    // console.log(registeredUsers);

    return registeredUsers.includes(userID);
}

module.exports = {
    isUserRegistered: isUserRegistered
}