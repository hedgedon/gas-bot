axios = require("axios");
const bot = require("./discordBot");

const getData = () => {
  const endpoint = "https://www.etherchain.org/api/gasPriceOracle"
  
  async function asyncCall() {
    const response = await axios.get(endpoint);
    const data = await response.data;
    const { safeLow, standard, fast } = data
    // pass in data here
    bot.getData(safeLow, standard, fast);
  }

  asyncCall();
}

exports.getData = getData;