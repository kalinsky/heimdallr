export interface DiscordRole {
	cache: Array<string>,
	add(role: any): void
}

export interface DiscordChannel {
	name: string,
	type: string,
	cache: Array<any>,
	send(msg: string): void
}

export interface DiscordGuild {
	channels: DiscordChannel,
	roles: DiscordRole
}

export interface DiscordMember {
	id: string,
	guild: DiscordGuild,
	name: string,
	roles: DiscordRole,
	user: DiscordUser,
	displayAvatarURL(options: object): string
}

export interface DiscordUser {
	tag: string,
	id: string,
	username: string,
	displayAvatarURL(params: object): void,
	send(content: string, options?: object): void
}

export interface DiscordMessage {
	content: string,
	author: DiscordUser,
	reply(msg: string, options?: object): void,
	channel: DiscordChannel,
	member: DiscordMember
}
export interface UserAttributes {
	d_id: string,
	d_avatar: string
}
export interface UserResponse {
	attributes: UserAttributes
}
