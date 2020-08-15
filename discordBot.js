require("dotenv").config();

// PASS IN DATA
// NEED TO DO A COMMAND TO CALL THE FUNCTION


const getData = (safeLow, standard, fast) => {
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
      client.user.setPresence({ status: 'idle' })
    });

    const image = 'https://i.imgur.com/VCBmVEt.png';

    const exampleEmbed = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .addFields(
        { name: 'safe low', value: safeLow, inline: true },
        { name: 'standard', value: standard, inline: true },
        { name: 'fast', value: fast, inline: true }      )
      .setTimestamp()
      .setFooter('timestamp: ', image);

   
    client.on('message', msg => {
      if (msg.content === '.gas') {
        // "Line 1 \n Line 2"
        msg.channel.send(exampleEmbed);
      }
    });
    console.log(safeLow, standard, fast)
  }

  // bot.on('message', msg => {
  //   if (msg.content === 'ping') {
  //     msg.reply('pong');
  //     msg.channel.send('pong');
  //   }
  // });

  // ** INVOKE DISCORD BOT **
  client.on("ready", () => {
    console.log("Discord bot is Online, please wait while fetching data");
    fetchIt();
  });

  client.login(token);
};
exports.getData = getData;