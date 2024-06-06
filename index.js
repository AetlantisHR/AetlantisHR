const { Highrise, Events, Emotes } = require("highrise.sdk.dev");
const port = process.env.PORT || 1000;
const bot = new Highrise({
  Events: [
    Events.Messages,
    Events.Emotes
  ]
});

const emoteMappings = {
  "Tiktok10": Emotes.dance_singleladies.id,
  "Dance": Emotes.hot.id
};

bot.on("ready", (session) => {
  console.log("The bot is online!");
});

bot.on("chatCreate", (user, message) => {
  if (bot.info.user.id === user.id) return;
  console.log(`${user.username} said: ${message}`);
  
  const emoteKey = message.toLowerCase();
  const emoteId = emoteMappings[emoteKey];

  if (emoteId) {
    return bot.player.emote(user.id, emoteId);
  } else if (message === "hi") {
    return bot.message.send("hi");
  } else if (message === "hello") {
    return bot.whisper.send(user.id, "Hello, this is a whisper.");
  }
});

bot.on("playerEmote", (sender, receiver, emote) => {
  console.log(`${sender.username} performed an emote on ${receiver.username} "${emote}"`);
});

bot.on("emote", (event) => {
  const userId = event.user.id;
  const emoteName = event.emote;
  
  console.log(`El usuario con ID ${userId} está usando el emote: ${emoteName}`);
});

bot.on("error", (message) => {
  console.log(message);
});

bot.login(process.env.token, process.env.room);