axios = require("axios");

const endpoint = "https://www.etherchain.org/api/gasPriceOracle"

const bot = require("./discordBot");


// function resolveAfter2Seconds() {
//   return new Promise(resolve => { 
//     setTimeout(() => {
//       resolve('resolved');
//     }, 2000);
//   });
// }

async function asyncCall() {
  // console.log('calling');
  // const result = await resolveAfter2Seconds();
  const response = await axios.get(endpoint);
  const data = await response.data;
  const { safeLow, standard, fast } = data

  // pass in data here
  bot.getData(safeLow, standard, fast);

  // expected output: "resolved"
}

asyncCall();


