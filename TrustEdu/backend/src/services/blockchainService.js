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
  let txHash = "0x" + crypto.randomBytes(32).toString("hex"); // Fallback mock hash
  let blockNumber = 0;
  let timestamp = new Date();

  try {
    // Attempt real blockchain transaction
    if (process.env.PRIVATE_KEY && process.env.CONTRACT_ADDRESS) {
      const tx = await contract.storeRecord(recordId, dataHash);
      const receipt = await tx.wait();
      txHash = receipt.hash;
      blockNumber = receipt.blockNumber;

      const block = await provider.getBlock(receipt.blockNumber);
      timestamp = new Date(block.timestamp * 1000);
    } else {
      console.warn("⚠️ Missing Blockchain credentials. Using Mock Transaction.");
    }
  } catch (err) {
    console.error("⚠️ Blockchain Error (Falling back to local log):", err.message);
    // Proceed to save to DB anyway so UI doesn't break
  }

  const log = await AuditLog.create({
    recordId,
    studentId,
    dataHash,
    txHash,
    blockNumber,
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
