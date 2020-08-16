const axios = require("axios");

const endpoint = "https://www.etherchain.org/api/gasPriceOracle";

async function gas() {
  try {
    const response = await axios.get(endpoint);
    const { safeLow, standard, fast } = await response.data;

    return { safeLow, standard, fast };
  } catch (error) {
    console.log("Error occured", error.message);
  }
}

exports.gas = gas;
