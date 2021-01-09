const dbConnection = require('./db/connect');
const Discord = require('discord.js');
const client = new Discord.Client();
const User = require('./models/User');
const userUtils = require('./utils/user-utils');
let registeredUsers = [];

function init() {
	client.on('ready', async () => {
	  console.log(`Logged in as ${client.user.tag}!`);
	  registeredUsers = await dbConnection.fetchRegsiteredUsers();
	});

	client.on('message', msg => {
		if (msg.content === 'ping') {
			msg.reply('Pong!');
			msg.reply('My author is: ' + msg.author.tag);
		}

		if (msg.content === '/registerme') {
			const userRegistered = userUtils.isUserRegistered(msg.author.id, registeredUsers);

			console.log('is registered: ' + userRegistered);

			if (!userRegistered) {
				const discordUser = new User(msg.author);
				const registerStatus = dbConnection.createUser(discordUser);

				if (registerStatus) {
					console.log('register success');
					msg.reply('Thank you for registering! Your registration to our DB is successful');

					// prevent overflooding the array
					if (!registeredUsers.includes(msg.author.id)) {
						registeredUsers.push(msg.author.id);
					}
				} else {
					console.log('register fail');
					msg.reply('An error ocurred! Please try again :tired_face:');
				}
			} else {
				msg.reply('Yooooooo, you are already registered! Just type /me to see your profile.');
			}
		}

		// Search for the user and return his info
		if (msg.content === '/me') {

		}

		if (msg.content === '/repo') {
			msg.author.send('You can find my repository at: https://github.com/kalinsky/heimdallr');
		}
	});
}

init();


client.login('bot token goes here');