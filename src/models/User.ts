import {
	DiscordUser
} from '../interfaces/discord.interfaces';

export class User {
    id: string;
    tag: string;
    name: string;

    constructor(discordUser: DiscordUser) {
        this.id = discordUser.id;
        this.tag = discordUser.tag;
        this.name = discordUser.username;
    }

    get details() {
        return {
            id: this.id,
            tag: this.tag,
            name: this.name
        }
    }
}

