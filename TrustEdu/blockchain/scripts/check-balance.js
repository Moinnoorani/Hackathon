const { ethers } = require("ethers");
require("dotenv").config({ path: "../backend/.env" });

async function main() {
    const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL || "https://ethereum-sepolia.publicnode.com");
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

    console.log("----------------------------------------------------");
    console.log("Checking Balance for:");
    console.log(wallet.address);

    const balance = await provider.getBalance(wallet.address);
    const balanceEth = ethers.formatEther(balance);

    console.log("----------------------------------------------------");
    console.log(`💰 Balance: ${balanceEth} SepETH`);
    console.log("----------------------------------------------------");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
