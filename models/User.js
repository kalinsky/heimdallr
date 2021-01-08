module.exports = class User {
    constructor(discordUser) {
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

