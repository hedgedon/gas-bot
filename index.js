axios = require("axios");

const endpoint = "https://www.etherchain.org/api/gasPriceOracle"

const bot = require("./discordBot");

async function asyncCall() {
  const response = await axios.get(endpoint);
  const data = await response.data;
  const { safeLow, standard, fast } = data

  // pass in data here
  bot.getData(safeLow, standard, fast);
}

asyncCall();


