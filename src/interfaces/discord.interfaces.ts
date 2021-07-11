export interface DiscordRole {
	cache: Array<string>,
	add(role: any): void
}

export interface DiscordChannel {
	name: string,
	type: string,
	cache: Array<any>
}

export interface DiscordGuild {
	channels: DiscordChannel,
	roles: DiscordRole
}

export interface DiscordMember {
	id: string,
	guild: DiscordGuild,
	name: string,
	roles: DiscordRole
}

export interface DiscordUser {
	tag: string,
	id: string,
	displayAvatarURL(params: object): void,
	send(content: string, options?: object): void
}

export interface DiscordMessage {
	content: string,
	author: DiscordUser,
	reply(msg: string, options?: object): void
}