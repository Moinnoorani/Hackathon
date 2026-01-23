require("dotenv").config();
const mongoose = require("mongoose");
const { storeHashOnBlockchain, verifyRecord } = require("./src/services/blockchainService");

async function runTest() {
  await mongoose.connect(process.env.MONGO_URI);

  const recordId = "TEST_STU_001";
  const studentId = "STU001";

  const sampleData = {
    marks: 78,
    attendance: 85,
    quizScore: 72
  };

  console.log("⛓ Storing hash on blockchain...");
  const log = await storeHashOnBlockchain(recordId, studentId, sampleData);
  console.log("Stored:", log);

  console.log("🔍 Verifying record...");
  const result = await verifyRecord(recordId, sampleData);
  console.log("Verification Result:", result);

  await mongoose.disconnect();
}

runTest().catch(console.error);
