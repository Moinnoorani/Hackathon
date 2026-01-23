require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function testModel(modelName) {
    console.log(`Testing model: ${modelName}...`);
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent("Hello, are you working?");
        const response = await result.response;
        console.log(`✅ ${modelName} Success:`, response.text());
        return true;
    } catch (error) {
        console.error(`❌ ${modelName} Failed:`, error.message);
        return false;
    }
}

async function run() {
    await testModel("gemini-pro");
    await testModel("gemini-1.5-flash");
}

run();
