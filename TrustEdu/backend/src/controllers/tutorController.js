const axios = require("axios");
const { GoogleGenerativeAI } = require("@google/generative-ai");

// In-memory chat storage
const chatHistory = [];

// Educational topic keywords for filtering
const EDUCATIONAL_TOPICS = [
  'math', 'science', 'physics', 'chemistry', 'biology', 'history',
  'geography', 'english', 'literature', 'programming', 'coding',
  'computer', 'engineering', 'calculus', 'algebra', 'geometry',
  'python', 'java', 'javascript', 'ai', 'machine learning', 'ml',
  'blockchain', 'study', 'learn', 'education', 'school', 'college',
  'exam', 'test', 'homework', 'assignment', 'grade', 'marks',
  'attendance', 'formula', 'equation', 'theory', 'concept'
];

const NON_EDUCATIONAL_TOPICS = [
  'joke', 'movie', 'film', 'song', 'music', 'sports', 'game',
  'weather', 'politics', 'news', 'celebrity', 'entertainment',
  'restaurant', 'food', 'recipe', 'travel', 'vacation'
];

function isEducationalQuestion(question) {
  const q = question.toLowerCase();

  // Check for non-educational topics
  for (let bad of NON_EDUCATIONAL_TOPICS) {
    if (q.includes(bad)) {
      return false;
    }
  }

  // Check for educational topics
  for (let topic of EDUCATIONAL_TOPICS) {
    if (q.includes(topic)) {
      return true;
    }
  }

  // Default: Allow questions that look academic (contain question words)
  const questionWords = ['what', 'how', 'why', 'when', 'where', 'explain', 'define', 'calculate'];
  for (let word of questionWords) {
    if (q.startsWith(word) || q.includes(' ' + word + ' ')) {
      return true; // Benefit of doubt for question-like queries
    }
  }

  return true; // Default to allowing (educational bias)
}

exports.chatWithTutor = async (req, res) => {
  try {
    const { studentId, question } = req.body;

    if (!studentId || !question) {
      return res.status(400).json({ error: "Missing studentId or question" });
    }

    console.log("💬 Tutor chat for student:", studentId, "| Question:", question);

    // STEP 1: Check if educational
    if (!isEducationalQuestion(question)) {
      console.log("❌ Non-educational question blocked:", question);
      return res.json({
        question,
        answer: "I am an Educational AI Tutor. I can only help with academic topics like Science, Math, History, Programming, and Study Skills. Please ask an educational question.",
        type: "NON_EDUCATIONAL",
        blockchain: createBlockchainRecord(studentId)
      });
    }

    let answer = "";

    // STEP 2: Try Gemini API
    try {
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

      // Try the model (will throw 404 if not available)
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const systemPrompt = `You are a strict Educational AI Tutor for TrustEdu.

RULES:
1. ONLY answer questions related to education, academics, science, math, programming, history, or study skills.
2. If the question is not educational, politely decline.
3. Keep answers concise (2-3 sentences max).
4. Provide factual, accurate information. Do not make up facts.

Student's Question: "${question}"

Your Educational Answer:`;

      const result = await model.generateContent(systemPrompt);
      const response = await result.response;
      answer = response.text();

      console.log("✅ Gemini API success!");

    } catch (apiError) {
      console.error("⚠️ Gemini API Error:", apiError.message);

      // API failed - Provide helpful fallback
      answer = `This question requires access to our AI service. Please try:
      
1. What is [topic]? (e.g., "What is photosynthesis?")
2. How do I [task]? (e.g., "How do I solve quadratic equations?")
3. Study tips and academic advice

Note: Our AI service is temporarily unavailable. Please contact support with error: ${apiError.message.substring(0, 50)}`;
    }

    // STEP 3: Store and return
    const blockchain = createBlockchainRecord(studentId);

    chatHistory.push({
      studentId,
      question,
      answer,
      timestamp: new Date(),
      txHash: blockchain.txHash
    });

    res.json({
      question,
      answer,
      type: "ACADEMIC",
      blockchain
    });

  } catch (err) {
    console.error("❌ Fatal tutor error:", err.message);
    res.status(500).json({ error: "Tutor service error: " + err.message });
  }
};

function createBlockchainRecord(studentId) {
  return {
    recordId: `${studentId}_CHAT_${Date.now()}`,
    txHash: `0x${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
    blockNumber: Math.floor(Math.random() * 1000000),
    timestamp: new Date()
  };
}
