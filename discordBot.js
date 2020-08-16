require("dotenv").config();
const request = require("./fetchGasData");

const startDiscordBot = () => {
  // Discord.js Config
  const Discord = require("discord.js");
  const client = new Discord.Client();
  const token = process.env.DISCORD_BOT_TOKEN;
  const serverId = process.env.DEV_SERVER_ID;

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
          const exampleEmbed = new Discord.MessageEmbed()
            .setColor("#0099ff")
            .addFields(
              // pass in gas data here
              { name: "safe low", value: `${safeLow}`, inline: true },
              { name: "standard", value: `${standard}`, inline: true },
              { name: "fast", value: `${fast}`, inline: true }
            )
            .setTimestamp()
            .setFooter("gas snapshot", image);

          msg.channel.send(exampleEmbed);
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
