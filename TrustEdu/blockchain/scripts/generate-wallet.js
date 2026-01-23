const { ethers } = require("ethers");
const fs = require("fs");
const path = require("path");

async function main() {
    const wallet = ethers.Wallet.createRandom();
    console.log("----------------------------------------------------");
    console.log("🎉 NEW WALLET GENERATED FOR TRUSTEDU");
    console.log("----------------------------------------------------");
    console.log("📍 Address:    ", wallet.address);
    console.log("🔑 Private Key:", wallet.privateKey);
    console.log("----------------------------------------------------");
    console.log("⚠️  SAVE THIS PRIVATE KEY IN YOUR .env FILE IMMEDIATELY!");
    console.log("⚠️  NEVER SHARE THIS PRIVATE KEY OR USE IT FOR REAL FUNDS.");
    console.log("----------------------------------------------------");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
