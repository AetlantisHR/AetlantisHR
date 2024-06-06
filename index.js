const { Highrise, Events, Emotes } = require("highrise.sdk.dev");
const port = process.env.PORT || 8080;

const bot = new Highrise({
  Events: [
    Events.Messages,
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
    "gracity": "Gravity",
    "icecream": "Ice_Cream_Dance",
    "worng": "Wrong_Dance",
    "uwu": "UwU",
    "tiktok4": "TikTok_Dance_4",
    "shy": "Advanced_Shy",
    "anime": "Anime_Dance"
};

function handleMessage(message, user) {
    // Convertir el mensaje a minúsculas
    const messageLower = message.toLowerCase();
    
    // Verificar si el mensaje coincide con alguna palabra clave en el mapa de emotes
    if (emotes.hasOwnProperty(messageLower)) {
        // Obtener el emote correspondiente
        const emote = emotes[messageLower];
        
        // Activar el emote
        bot.player.emote(user.id, emote);
    }
});

bot.on("chatCreate", (user, message) => {
  if (bot.info.user.id === user.id) return;
  console.log(`${user.username} said: ${message}`);

  if (message === "hi") {
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
