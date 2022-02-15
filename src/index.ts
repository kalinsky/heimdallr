import {
	DiscordMember,
	DiscordMessage
} from './interfaces/discord.interfaces';
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_INTEGRATIONS] });
import { isUserRegistered, getRegisteredUsers, createUser } from './utils/userUtils';

function init() {
	client.once('ready', async () => {
	  console.log(`Logged in as ${client.user.tag}!`);
	});

	client.on('guildMemberAdd', (member: DiscordMember) => {
		console.log('New member has joined');
		const guild = member.guild;
		const cachedChannels = guild.channels.cache;
		const cachedRoles = guild.roles.cache;
		const welcomeRole = cachedRoles.find((role: any): boolean => role.name === 'Scrub');
		const welcomeChannel = cachedChannels.find((channel: any): boolean => channel.name === 'welcome');

		if (welcomeChannel && welcomeChannel.type === 'text') {
			welcomeChannel.send(`Yoooo <@${member.id}>! Thanks for joining us :)`);
		}

		if (welcomeRole) {
			member.roles.add(welcomeRole);
		}

		if (!createUser(member)) {
			welcomeChannel.send(`Hey <@${member.id}, please !register yourself.`);
		}
	});

	client.on('messageCreate', async (message: DiscordMessage) => {
		if (message.content === '!ping') {
			message.channel.send('PONG');
		}

		if (message.content === '!registerme') {
			const isExistingUser = await isUserRegistered(message.member);

			if (isExistingUser) {
				message.channel.send('You are already registered bruv. Go on and have fun on this server!');
			} else {
				const creationResult = await createUser(message.member);

				if (!creationResult) {
					console.log('should send msg');
					message.channel.send('Please try again');
				} else {
					message.channel.send(`Thanks for registering <@${message.member.id}>`);
				}
			}
		}
	});
}

init();


client.login(process.env.BOT_TOKEN);