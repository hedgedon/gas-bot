// fetch GAS API query
// pass the returned data from GAS API to discord bot

// schedule cron job

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

  cron.schedule("*/5 * * * * *", () => {
    console.log("scheduler hereee");
    // call fetchQuery function
    // pass data from fetchQuery to our discordBotv2
    fetchQuery();
    discordBot.setBot(lowGwei, standardGwei, fastGwei);
  });
};

exports.getData = getData;
