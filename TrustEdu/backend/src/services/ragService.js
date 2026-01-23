const fs = require('fs');
const path = require('path');

// Load Knowledge Base
const kbPath = path.join(__dirname, '../data/education_kb.json');
let knowledgeBase = [];

try {
    if (fs.existsSync(kbPath)) {
        const data = fs.readFileSync(kbPath, 'utf8');
        knowledgeBase = JSON.parse(data);
        console.log(`📚 RAG Knowledge Base loaded: ${knowledgeBase.length} topics`);
    } else {
        console.warn("⚠️ Knowledge Base file not found");
    }
} catch (err) {
    console.error("❌ Error loading Knowledge Base:", err);
}

exports.retrieveContext = (question) => {
    const q = question.toLowerCase();

    // Simple retrieval: Find topic with matching keywords
    // (In a real production system, this would be Vector Similarity Search)

    const matches = knowledgeBase.filter(item => {
        return item.keywords.some(keyword => q.includes(keyword));
    });

    if (matches.length > 0) {
        // Return the most relevant content
        return matches[0].content;
    }

    return null;
};

exports.isEducational = (question) => {
    // Basic guardrails
    const forbidden = ["joke", "movie", "song", "weather", "politics", "sport", "celebrity"];
    const q = question.toLowerCase();

    for (let bad of forbidden) {
        if (q.includes(bad)) return false;
    }

    return true;
};
