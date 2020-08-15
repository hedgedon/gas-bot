require("dotenv").config();
axios = require("axios");
// const bot = require("./discordBot");
const ethGasBot = require('./fetchData');

// safeLow, standard, fast
const getData = () => {
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

    client.on('message', msg => {
      if (msg.content === '.gas') {
        

        // we need to call a function to fetch data ...
        // ethGasBot.getData();
        // console.log(ethGasBot.getData());
        // msg.channel.send(exampleEmbed);

        // 1) FETCH THE DATA

        // 2) DESTRUCTURE OUT THE `safeLow`, `standard`, `fast`

        // 3) pass that data into discord's MessageEmbed

        // 4) the values should be different every time someone calls the .gas cmd
       
          const endpoint = "https://www.etherchain.org/api/gasPriceOracle"
          
          let safeLow = '';

          async function asyncCall(safeLow) {
            const response = await axios.get(endpoint);
            const data = await response.data;
            console.log(data) // #=> Promise { <pending> }
            safeLow = data.safeLow;
            // safeLow.then()
            // console.log(safeLow)
            // return data.safeLow.then(testLow => { return testLow } )
            return safeLow;
            // const { safeLow, standard, fast } = data
            //   testLow = safeLow;
            //   // pass in data here
            //   // bot.getData(safeLow, standard, fast);
            //   console.log(testLow)
            // return { testLow };
          }
      
          asyncCall();
          // console.log(asyncCall());
        
        msg.channel.send(`asfd ${safeLow}`);
      }
    });
    // console.log(safeLow, standard, fast)
  }
  
  // ** INVOKE DISCORD BOT **
  client.on("ready", () => {
    console.log("Discord bot is Online, please wait while fetching data");
    fetchIt();
  });

  client.login(token);
};
exports.getData = getData;