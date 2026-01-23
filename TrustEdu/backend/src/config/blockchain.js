require("dotenv").config();
const { ethers } = require("ethers");

// Sepolia provider
const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);

// Wallet signer
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// Contract ABI (minimal)
const contractABI = [
  "function storeRecord(string _recordId, string _dataHash) public",
  "function getRecord(string _recordId) public view returns (string dataHash, uint256 timestamp)"
];

// Replace with YOUR deployed contract address
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const contract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contractABI,
  wallet
);

module.exports = { contract, provider };
