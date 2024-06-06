// This is a simple example of how to use the Highrise SDK to create a bot.
const { Highrise, Events } = require("highrise.sdk");

// Create a new instance of the Highrise class.
const bot = new Highrise({
  Events: [
    Events.Messages,
    Events.Joins,
    Events.Leaves,
    Events.DirectMessages
  ],
  AutoFetchMessages: true, // Fetches messages on direct message events.
  Cache: true // Caches players in the room.
});

// Listen for the ready event.
bot.on('ready', (session) => {
  console.log(`Bot is now online in ${session.room_info.room_name}.`.cyan);
});

// Listen for chatCreate events.
bot.on("chatCreate", (user, message) => {
  console.log(`[CHAT]: ${user.username}:${user.id} - ${message}`);
});

// Listen for directMessage events.
bot.on("messageCreate", (user_id, data, message) => {
  console.log(`[DIRECT MESSAGE]: ${user_id}:${data.id} - ${message}`);
});

// Listen for playerJoin events.
bot.on('playerJoin', (user) => {
  console.log(`[PLAYER JOINED]: ${user.username}:${user.id}`);
});

// Listen for playerLeave events.
bot.on('playerLeave', (user) => {
  console.log(`[PLAYER LEFT]: ${user.username}:${user.id}`);
});

// Listen for unhandledRejection events.
// This is useful for catching errors that are not handled.
process.on('unhandledRejection', async (err, promise) => {
  console.error(`[ANTI-CRASH] Unhandled Rejection: ${err}`.red);
  console.error(promise);
});

// Login to the room.
bot.login(process.env.token, process.env.room);
