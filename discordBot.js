require("dotenv").config();
// axios = require("axios");
// const bot = require("./discordBot");
const fetch = require("node-fetch");

const request = require("./fetchGasData");

// safeLow, standard, fast
const startDiscordBot = () => {
  // Discord.js Config
  const Discord = require("discord.js");
  const client = new Discord.Client();
  const token = process.env.DISCORD_BOT_TOKEN;
  const serverId = process.env.DEV_SERVER_ID;

  // const gas = require("./fetch-node");

  async function fetchIt() {
    const guild = client.guilds.cache.get(serverId);

    // SET BOT NAME
    guild.me.setNickname(`eth-gas`);

    client.on("ready", () => {
      client.user.setPresence({ status: "idle" });
    });

    const image = "https://i.imgur.com/VCBmVEt.png";

    client.on("message", (msg) => {
      if (msg.content === ".gas") {
        request.gas().then(({ safeLow, standard, fast }) => {
          console.log(
            `safeLow: ${safeLow}`,
            `standard: ${standard}`,
            `fast: ${fast}`
          );
          // need to re-structure with MessageEmbed
          msg.channel.send(`${safeLow}, ${standard}, ${fast}`);
        });
      }
    });
  }

  // ** INVOKE DISCORD BOT **
  client.on("ready", () => {
    console.log("Discord bot is Online, please wait while fetching data");
    fetchIt();
  });

  client.login(token);
};
exports.startDiscordBot = startDiscordBot;
