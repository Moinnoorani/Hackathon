const { ethers } = require("ethers");
const fs = require("fs");
const path = require("path");

async function main() {
    const envPath = path.join(__dirname, "../../backend/.env");
    console.log("Reading .env from:", envPath);

    if (!fs.existsSync(envPath)) {
        console.error("Error: .env file not found!");
        process.exit(1);
    }

    const envContent = fs.readFileSync(envPath, "utf8");
    const match = envContent.match(/PRIVATE_KEY=(.+)/);

    if (!match) {
        console.error("Error: PRIVATE_KEY not found in .env");
        process.exit(1);
    }

    let privateKey = match[1].trim();
    if (!privateKey.startsWith("0x")) {
        privateKey = "0x" + privateKey;
    }

    const wallet = new ethers.Wallet(privateKey);
    console.log("Wallet Address:", wallet.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
