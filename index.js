const express = require("express");
const { Client, GatewayIntentBits } = require("discord.js");

const app = express();
app.get("/", (req, res) => res.send("Ink!Sans bot running"));
app.listen(process.env.PORT || 3000);

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const TOKEN = process.env.TOKEN;
const LOG_CHANNEL_ID = process.env.LOG_CHANNEL_ID;

const blacklist = [
  "badword",
  "toxicword",
  "curseword"
];

const inkResponses = [
  "🎨 *Ink splashes into the chat!* Hey creator, that word is kinda messy for the multiverse!",
  "🖌️ Woah there creator! That word might stain the timeline!",
  "🌈 Hey! Let's keep the story colorful, okay?",
  "✨ Easy there creator! The multiverse prefers nicer words!"
];

client.on("ready", () => {
  console.log(`Ink!Sans bot online: ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  const msg = message.content.toLowerCase();
  const found = blacklist.find(word => msg.includes(word));

  if (found) {

    // character response
    const response =
      inkResponses[Math.floor(Math.random() * inkResponses.length)];

    message.reply(response);

    // send log to staff
    const logChannel = client.channels.cache.get(LOG_CHANNEL_ID);

    if (logChannel) {
      logChannel.send(
`🚨 Blacklist Word Detected

User: ${message.author.tag}
Word: ${found}
Message: ${message.content}
Channel: ${message.channel.name}`
      );
    }
  }
});

client.login(TOKEN);
