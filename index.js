const { Highrise, Events, Emotes } = require("highrise.sdk.dev");

const emoteKeywords = {
    "Weird": "WeirdDance",
    "Kiss": "Kiss"
};

const bot = new Highrise({
    Events: [
        Events.Messages,
        Events.Emotes
    ]
});

bot.on("ready", (session) => {
    console.log("The bot is online!");
});

bot.on("chatCreate", (user, message) => {
    if (bot.info.user.id === user.id) return;
    console.log(`${user.username} said: ${message}`);
    for (const keyword in emoteKeywords) {
        if (message.toLowerCase() === keyword.toLowerCase()) {
            const emoteId = Emotes[emoteKeywords[keyword]].id;
            bot.player.emote(user.id, emoteId);
            break;
        }
    }
});

bot.on("playerEmote", (sender, receiver, emote) => {
    console.log(`${sender.username} performed an emote on ${receiver.username} "${emote}"`);
});

bot.on("error", (message) => {
    console.log(message);
});

bot.login(process.env.token, process.env.room);