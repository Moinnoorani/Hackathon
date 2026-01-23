const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

async function testGemini() {
    try {
        console.log("Testing Gemini API with key:", process.env.GEMINI_API_KEY.substring(0, 10) + "...");
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

        // 1. Try to generate content directly with gemini-1.5-flash
        console.log("\nAttempting generation with gemini-1.5-flash...");
        try {
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const result = await model.generateContent("Hello!");
            const response = await result.response;
            console.log("✅ SUCCESS with gemini-1.5-flash!");
            console.log("Response:", response.text());
            return;
        } catch (e) {
            console.log("❌ Failed with gemini-1.5-flash:", e.message);
        }

        // 2. Try gemini-pro
        console.log("\nAttempting generation with gemini-pro...");
        try {
            const model = genAI.getGenerativeModel({ model: "gemini-pro" });
            const result = await model.generateContent("Hello!");
            const response = await result.response;
            console.log("✅ SUCCESS with gemini-pro!");
            console.log("Response:", response.text());
            return;
        } catch (e) {
            console.log("❌ Failed with gemini-pro:", e.message);
        }

    } catch (err) {
        console.error("Global Error:", err);
    }
}

testGemini();
