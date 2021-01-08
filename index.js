const dbConnection = require('./db/connect');
const Discord = require('discord.js');
const client = new Discord.Client();
const User = require('./models/User');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
	msg.reply('Pong!');
	msg.reply('My author is: ' + msg.author.tag);
  }

  if (msg.content === '/registerme') {
	const discordUser = new User(msg.author);
	const registerStatus = dbConnection.createUser(discordUser);

	if (registerStatus) {
		console.log('register success');
		msg.reply('Thank you for registering! Your registration to our DB is successful');
	} else {
		console.log('register fail');
		msg.reply('An error ocurred! Please try again :tired_face:');
	}
  }

  // Search for the user and return his info
  if (msg.content === '/me') {

  }
});

client.login('bot token goes here');