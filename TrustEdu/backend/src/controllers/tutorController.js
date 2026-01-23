const axios = require("axios");
const OpenAI = require("openai");
const fs = require('fs');
const path = require('path');

// Load Knowledge Base
let KNOWLEDGE_BASE = [];
try {
  const kbPath = path.join(__dirname, '../data/education_kb.json');
  if (fs.existsSync(kbPath)) {
    KNOWLEDGE_BASE = JSON.parse(fs.readFileSync(kbPath, 'utf8'));
    console.log(`📚 Loaded ${KNOWLEDGE_BASE.length} articles from Knowledge Base`);
  }
} catch (err) {
  console.warn("⚠️ Failed to load Knowledge Base:", err.message);
}

// In-memory chat storage
const chatHistory = [];

const NON_EDUCATIONAL_TOPICS = [
  'joke', 'movie', 'film', 'song', 'music', 'sports', 'game',
  'weather', 'politics', 'news', 'celebrity', 'entertainment',
  'restaurant', 'food', 'recipe', 'travel', 'vacation', 'cinema',
  'actor', 'actress', 'gossip'
];

/**
 * Retrieve relevant context from local Knowledge Base (RAG)
 */
function findRelevantContext(query) {
  if (!KNOWLEDGE_BASE.length) return null;

  const q = query.toLowerCase();
  let bestMatch = null;
  let maxScore = 0;

  for (const entry of KNOWLEDGE_BASE) {
    let score = 0;

    // Topic exact match
    if (entry.topic.toLowerCase() === q) score += 50;
    // Topic partial match
    if (q.includes(entry.topic.toLowerCase())) score += 20;

    // Keyword match
    for (const keyword of entry.keywords) {
      if (q.includes(keyword.toLowerCase())) score += 5;
    }

    if (score > maxScore) {
      maxScore = score;
      bestMatch = entry;
    }
  }

  return maxScore > 0 ? bestMatch : null;
}

function isDefinitelyNonEducational(question) {
  const q = question.toLowerCase();
  for (let bad of NON_EDUCATIONAL_TOPICS) {
    if (q.includes(bad)) return true;
  }
  return false;
}

exports.chatWithTutor = async (req, res) => {
  const { studentId, question } = req.body;

  if (!studentId || !question) {
    return res.status(400).json({ error: "Missing studentId or question" });
  }

  console.log("💬 Tutor chat for student:", studentId, "| Question:", question);

  // STEP 1: Strict Non-Educational Filter (Local)
  if (isDefinitelyNonEducational(question)) {
    return res.json({
      question,
      answer: "I specialize exclusively in academic subjects. I cannot discuss entertainment or leisure topics. Let's focus on your studies.",
      type: "NON_EDUCATIONAL",
      blockchain: createBlockchainRecord(studentId)
    });
  }

  let answer = "";
  const contextEntry = findRelevantContext(question);

  // STEP 2: Connect to OpenRouter with RAG Context
  try {
    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENAI_API_KEY,
      defaultHeaders: {
        "HTTP-Referer": "http://localhost:3000", // Optional, for OpenRouter rankings
        "X-Title": "TrustEdu Hackathon App",
      }
    });

    const contextText = contextEntry ?
      `CONFIRMED KNOWLEDGE BASE INFO:\nTopic: ${contextEntry.topic}\nData: ${contextEntry.content}\n` :
      "No specific local matches found. Use your general academic knowledge.";

    const systemPrompt = `You are an advanced Educational AI Tutor.
    
YOUR GOAL: Provide a clear, helpful, and accurate academic answer.

STRICT PROTOCOL:
1. **Context First**: \n${contextText}\n
   - If "CONFIRMED KNOWLEDGE BASE INFO" is provided, YOU MUST base your answer on it. It is the source of truth.
   - Expand on it slightly if needed for clarity.

2. **Education Only**: 
   - You must detect if the question is educational. 
   - If the user asks about movies, games, or non-academic gossip, REFUSE politely.
   - If the question is greeting ("hi"), reply welcoming them to learning.

3. **Format**:
   - Keep it concise (under 4 sentences).
   - Use professional tone.
`;

    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.0-flash-001", // Fast, often free on OpenRouter
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: question }
      ],
    });

    answer = completion.choices[0].message.content;
    console.log("✅ OpenRouter AI Responded");

  } catch (apiError) {
    console.error("⚠️ AI Connection Failed:", apiError.message);

    // Fallback if OpenRouter fails
    if (contextEntry) {
      answer = `(Offline Backup) Here is what I know about **${contextEntry.topic}**: ${contextEntry.content}`;
    } else {
      answer = "I am currently unable to reach my knowledge core. Please try again in a moment.";
    }
  }

  // STEP 3: Blockchain Record & Response
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
};

function createBlockchainRecord(studentId) {
  return {
    recordId: `${studentId}_CHAT_${Date.now()}`,
    txHash: `0x${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
    blockNumber: Math.floor(Math.random() * 1000000),
    timestamp: new Date()
  };
}
