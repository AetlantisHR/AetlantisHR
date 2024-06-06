const { Highrise, Events, Emotes } = require("highrise.sdk.dev");
const port = process.env.PORT || 4000;

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
    return bot.player.emote(user.id, Emotes.dance_singleladies);
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
