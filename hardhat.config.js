/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("@nomiclabs/hardhat-waffle");
const ALCHEMY_API_KFY="OYKckKSizkaJ7ttmgRM5rmp7ZLJPNRKq";  //Alchemy api key
const SEPOLIA_PRIVATE_KEY="1848a170a698d7aa1026e1d7ce73f5a008eb35d0a773e6e82b48e5448630778e";//sepolia privet key
module.exports = {
  solidity: "0.8.9",

  networks:{
    sepolia :{
       url:`https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KFY}`,
       accounts:[`${SEPOLIA_PRIVATE_KEY}`],
    }
    
  }
};
