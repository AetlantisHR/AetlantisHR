const { Highrise, Events } = require("highrise.sdk.dev");
const port = process.env.PORT || 8080;

const bot = new Highrise({
  events: [
    Events.Messages,
    Events.ChatCreate,
    Events.PlayerEmote,
    Events.Emote,
    Events.Error,
    Events.Ready
  ]
});

bot.on(Events.Ready, () => {
  console.log("The bot is online!");
});

bot.on(Events.ChatCreate, (user, message) => {
  if (user.id === bot.info.user.id) return;

  console.log(`${user.username} said: ${message}`);

  if (message === "hi") {
    bot.message.send("hi");
  } else if (message === "hello") {
    bot.whisper.send(user.id, "Hello, this is a whisper.");
  } else if (message === "emote") {
    bot.player.emote(user.id, "dance-singleladies");
  }
});

bot.on(Events.PlayerEmote, (sender, receiver, emote) => {
  console.log(`${sender.username} performed an emote on ${receiver.username} "${emote}"`);
});

bot.on(Events.Emote, (event) => {
  const { user: { id: userId }, emote: emoteName } = event;
  console.log(`User with ID ${userId} is using the emote: ${emoteName}`);
});

bot.on(Events.Error, (error) => {
  console.error(error);
});

bot.login(process.env.token, process.env.room);