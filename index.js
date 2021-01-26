const Discord = require('discord.js');
const Canvas = require('canvas');
const client = new Discord.Client();
const User = require('./models/User');
const userUtils = require('./utils/userUtils');
let registeredUsers = [];

function init() {
	client.on('ready', async () => {
	  console.log(`Logged in as ${client.user.tag}!`);
	  registeredUsers = await userUtils.getRegisteredUsers();
	});

	client.on('guildMemberAdd', (member) => {
		console.log('New member has joined');
		const guild = member.guild;
		const cachedChannels = guild.channels.cache;
		const cachedRoles = guild.roles.cache;
		const welcomeRole = cachedRoles.find(role => role.name === 'Scrub');
		const welcomeChannel = cachedChannels.find(channel => channel.name === 'welcome');

		if (welcomeChannel && welcomeChannel.type === 'text') {
			welcomeChannel.send(`Yoooo <@${member.id}>! Welcome and have fun in our friendly and mostly annoying discord server.`);
		}

		if (welcomeRole) {
			member.roles.add(welcomeRole);
		}
	});

	client.on('message', async msg => {
		if (msg.content === 'ping') {
			msg.reply('Pong!');
			msg.reply('My author is: ' + msg.author.tag);
		}

		if (msg.content === '/registerme') {
			const userRegistered = userUtils.isUserRegistered(msg.author.id, registeredUsers);

			console.log('is registered: ' + userRegistered);

			if (!userRegistered) {
				const discordUser = new User(msg.author);
				const registerStatus = userUtils.createUser(discordUser);

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
		if (msg.content === '/myjourney') {
			const canvas = Canvas.createCanvas(700, 250);
			const ctx = canvas.getContext('2d');
			const background = await Canvas.loadImage('./img/background.png');

			ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
			ctx.strokeRect(0, 0, canvas.width, canvas.height);
			const avatar = await Canvas.loadImage(msg.author.displayAvatarURL({ format: 'jpg' }));
			ctx.drawImage(avatar, 25, 0, 200, canvas.height);
			const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'progress.png');

			msg.reply('Test image: ', attachment);
		}

		if (msg.content === '/repo') {
			msg.author.send('You can find my repository at: https://github.com/kalinsky/heimdallr');
		}
	});
}

init();


client.login(process.env.BOT_TOKEN);