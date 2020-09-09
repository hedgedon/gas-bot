require("dotenv").config();

// Discord.js Config
const Discord = require("discord.js");
const client = new Discord.Client();
const token = process.env.TEST_DISCORD_BOT_TOKEN;
const serverId = process.env.TEST_DEV_SERVER_ID;
client.login(token);

// INVOKE DISCORD BOT
client.on("ready", () => {
  console.log("eth gas bot online!");
  setBot();
});
client.on("rateLimit", (info) => {
  console.log(
    `Rate limit hit ${
      info.timeDifference
        ? info.timeDifference
        : info.timeout
        ? info.timeout
        : "Unknown timeout"
    }`
  );
});

const setBot = async (lowGwei, standardGwei, fastGwei) => {
  try {
    const guild = client.guilds.cache.get(`${serverId}`);

    console.log(`logging from discord bot!`);

    // SET BOT NAME
    await guild.me.setNickname(`${standardGwei} gwei (standard)`);

    // SET ACTIVITY
    await client.user.setActivity(`${lowGwei} (low) | ${fastGwei} (fast)`, {
      type: "PLAYING",
    });
  } catch (error) {
    console.log("Your Error: ", error);
  }
};
exports.setBot = setBot;
