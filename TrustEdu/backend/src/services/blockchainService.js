const crypto = require("crypto");
const { contract, provider } = require("../config/blockchain");
const AuditLog = require("../models/AuditLog");

function hashData(data) {
  return crypto
    .createHash("sha256")
    .update(JSON.stringify(data))
    .digest("hex");
}

async function storeHashOnBlockchain(recordId, studentId, data) {
  const dataHash = hashData(data);

  const tx = await contract.storeRecord(recordId, dataHash);
  const receipt = await tx.wait();

  const block = await provider.getBlock(receipt.blockNumber);
  const timestamp = new Date(block.timestamp * 1000);

  const log = await AuditLog.create({
    recordId,
    studentId,
    dataHash,
    txHash: receipt.hash,
    blockNumber: receipt.blockNumber,
    createdAt: timestamp
  });

  return log;
}

async function verifyRecord(recordId, data) {
  const dbHash = hashData(data);

  const [blockchainHash] = await contract.getRecord(recordId);

  return {
    valid: dbHash === blockchainHash,
    dbHash,
    blockchainHash
  };
}

module.exports = {
  storeHashOnBlockchain,
  verifyRecord
};
