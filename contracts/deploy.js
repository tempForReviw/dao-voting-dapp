const { ethers } = require("hardhat");

async function main() {
    console.log("Deploying DAO Voting contracts...");
    
    // Get the deployer
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with account:", deployer.address);
    
    // Deploy DAOToken
    const DAOToken = await ethers.getContractFactory("DAOToken");
    const daoToken = await DAOToken.deploy(
        "DAO Token",
        "DAO",
        1000000 // 1 million tokens
    );
    await daoToken.waitForDeployment();
    console.log("DAOToken deployed to:", await daoToken.getAddress());
    
    // Deploy DAOVoting
    const DAOVoting = await ethers.getContractFactory("DAOVoting");
    const daoVoting = await DAOVoting.deploy(await daoToken.getAddress());
    await daoVoting.waitForDeployment();
    console.log("DAOVoting deployed to:", await daoVoting.getAddress());
    
    // Mint some tokens to deployer for testing
    await daoToken.mint(deployer.address, ethers.parseEther("10000"));
    console.log("Minted 10,000 tokens to deployer");
    
    console.log("\\n=== Deployment Summary ===");
    console.log("DAOToken Address:", await daoToken.getAddress());
    console.log("DAOVoting Address:", await daoVoting.getAddress());
    console.log("Network:", (await ethers.provider.getNetwork()).name);
    
    // Save deployment info
    const fs = require('fs');
    const deploymentInfo = {
        network: (await ethers.provider.getNetwork()).name,
        daoToken: await daoToken.getAddress(),
        daoVoting: await daoVoting.getAddress(),
        deployer: deployer.address,
        timestamp: new Date().toISOString()
    };
    
    fs.writeFileSync('deployment.json', JSON.stringify(deploymentInfo, null, 2));
    console.log("Deployment info saved to deployment.json");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });