const timestamp = require("time-stamp");
const cron = require("node-cron");
const axios = require("axios");

const discordBot = require("./discordBotv2");

const url = "https://www.etherchain.org/api/gasPriceOracle";

let lowGwei = "";
let standardGwei = "";
let fastGwei = "";

const getData = () => {
  const fetchQuery = async () => {
    try {
      const response = await axios.get(url);
      const { safeLow, standard, fast } = await response.data;

      console.log(safeLow, standard, fast);
      lowGwei = safeLow;
      standardGwei = standard;
      fastGwei = fast;

      return { lowGwei, standardGwei, fastGwei };
    } catch (error) {
      console.log("Error occured", error.message);
    }
  };

  cron.schedule("*/60 * * * * *", () => {
    console.log("-------");
    console.log(
      timestamp.utc("[YYYY/MM/DD:mm:ss]") + "running a task every 60 sec"
    );
    fetchQuery();
    discordBot.setBot(lowGwei, standardGwei, fastGwei);
  });
};

exports.getData = getData;
