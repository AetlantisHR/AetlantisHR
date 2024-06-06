const { Highrise, Events, Emotes } = require("highrise.sdk.dev");
const fs = require("fs);

const emotes = JSON.parse(fs.readFileSync('config/emotes.json'));

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

  if (message === "hi") {
    return bot.message.send("hi");
  } else if (message === "hello") {
    return bot.whisper.send(user.id, "Hello, this is a whisper.");
  } else if (message === "emote") {
    return bot.player.emote(user.id, Emotes.Weird_Dance.id);
  }
});

bot.on("playerEmote", (sender, receiver, emote) => {
  console.log(`${sender.username} performed an emote on ${receiver.username} "${emote}"`);
});

bot.on("error", (message) => {
console.log(message);
});

bot.login(process.env.token, process.env.room);
