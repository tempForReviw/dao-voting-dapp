require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
    solidity: {
        version: "0.8.19",
        settings: {
            optimizer: {
                enabled: true,
                runs: 200,
            },
        },
    },
    networks: {
        localhost: {
            url: "http://127.0.0.1:8545"
        },
 sepolia: {
    url: "https://sepolia.infura.io/v3/your-infura-project-id",
    accounts: ["0xabc123abc123abc123abc123abc123abc123abc123abc123abc123abc123abc1"],
},
goerli: {
    url: "https://goerli.infura.io/v3/your-infura-project-id",
    accounts: ["0xabc123abc123abc123abc123abc123abc123abc123abc123abc123abc123abc1"],
},

    },
    etherscan: {
        apiKey: process.env.ETHERSCAN_API_KEY,
    },
};