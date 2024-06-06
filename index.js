const { Highrise, Events } = require("highrise.sdk.dev");
const port = process.env.PORT || 8080;

const bot = new Highrise({
  events: [
    "Messages",
    "ChatCreate",
    "PlayerEmote",
    "Emote",
    "Error"
  ]
});

bot.on("ready", (session) => {
  console.log("The bot is online!");
});

const emotes = {
  "kiss": "Kiss",
  "jaja": "Laughing",
  "sit": "Sitting",
  "lust": "Lust",
  "cursing": "Cursing",
  "greedy": "Greedy",
  "flex": "Flexing",
  "mute": "Gagging",
  "happy": "Celebrating",
  "macarena": "Macarena_Dance",
  "tiktok8": "TikTok_Dance_8",
  "blackpink": "Blackpink_Dance",
  "modeling": "Modeling",
  "tiktok2": "TikTok_Dance_2",
  "pennywise": "Pennywise_Dance",
  "bow": "Bow",
  "russian": "Russian_Dance",
  "curt": "Curtsy",
  "snowfight": "Snowball_Fight",
  "hot": "Feeling_Hot",
  "snowangel": "Making_A_Snow_Angel",
  "charging": "Charging",
  "shopcart": "Shopping_Cart_Dance",
  "confused": "Confused",
  "entusiastic": "Enthusiastic",
  "telekinesis": "Telekinesis",
  "float": "Floating",
  "teleport": "Teleporting",
  "fight": "Swordfight",
  "maniac": "Maniac",
  "energyball": "Energy_Ball",
  "snake": "Snake",
  "sing": "Singing",
  "frog": "Frog",
  "super": "Superpose",
  "cute": "Cute",
  "tiktok9": "TikTok_Dance_9",
  "weird": "Weird_Dance",
  "tiktok10": "TikTok_Dance_10",
  "pose7": "Pose_7",
  "pose8": "Pose_8",
  "casual": "Casual_Dance",
  "pose1": "Pose_1",
  "pose3": "Pose_3",
  "pose5": "Pose_5",
  "cutey": "Cutey",
  "guitar": "Punk_Guitar",
  "zrun": "Zombie_Run",
  "fashion": "Fashionista",
  "gravity": "Gravity",
  "icecream": "Ice_Cream_Dance",
  "wrong": "Wrong_Dance",
  "uwu": "UwU",
  "tiktok4": "TikTok_Dance_4",
  "shy": "Advanced_Shy",
  "anime": "Anime_Dance"
};

const MESSAGE_HI = "hi";
const MESSAGE_HELLO = "hello";

let lastCommandTime = {};
const COMMAND_COOLDOWN = 1000; // Tiempo de espera en milisegundos entre comandos del mismo usuario

function handleMessage(message, user) {
  const now = Date.now();
  
  // Evitar comandos repetidos por el mismo usuario en un corto período de tiempo
  if (lastCommandTime[user.id] && now - lastCommandTime[user.id] < COMMAND_COOLDOWN) {
    return;
  }
  
  lastCommandTime[user.id] = now;

  const messageLower = message.toLowerCase();

  if (emotes.hasOwnProperty(messageLower)) {
    const emote = emotes[messageLower];
    bot.player.emote(user.id, emote);
  }
}

bot.on("ChatCreate", (user, message) => {
  if (bot.info.user.id === user.id) return;
  console.log(`${user.username} said: ${message}`);

  switch (message) {
    case MESSAGE_HI:
      bot.message.send(MESSAGE_HI);
      break;
    case MESSAGE_HELLO:
      bot.whisper.send(user.id, "Hello, this is a whisper.");
      break;
    default:
      handleMessage(message, user);
  }
});

bot.on("PlayerEmote", (sender, receiver, emote) => {
  console.log(`${sender.username} performed an emote on ${receiver.username} "${emote}"`);
});

bot.on("Emote", (event) => {
  const { user: { id: userId }, emote: emoteName } = event;
  console.log(`El usuario con ID ${userId} está usando el emote: ${emoteName}`);
});

bot.on("Error", (message) => {
  console.log(message);
});

bot.login(process.env.token, process.env.room);