require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function listModels() {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        // Not all keys support listModels, but let's try
        // There isn't a direct listModels method on the client instance in some versions, 
        // but usually it's internal. 
        // Actually, checking the docs, we just try to get a model.
        // Let's try to just output the error details more clearly.
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        await model.generateContent("test");
    } catch (error) {
        console.log("Error details:", error);
    }
}
listModels();
