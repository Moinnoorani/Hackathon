# TrustEdu - Blockchain-Verified AI Academic Performance System

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-16+-339933?logo=node.js)
![Python](https://img.shields.io/badge/Python-3.8+-3776AB?logo=python)

> **Hackathon 2026** - Transparent, bias-free academic analytics with accountable AI tutoring powered by blockchain technology.

## 🎯 Problem Statement

AI models used for predicting student performance can be biased if input data is manipulated. As AI tutors become common, there's risk of providing incorrect or harmful advice without oversight.

## 💡 Our Solution

TrustEdu combines **explainable AI** and **blockchain** to deliver:
- ✅ Bias-free academic predictions with transparency
- ✅ Accountable AI tutoring with permanent audit trails
- ✅ Immutable blockchain verification for every prediction
- ✅ Full data integrity and trust

---

## 🌟 Key Features

### 📊 AI-Powered Predictions
- Machine Learning model analyzes student performance
- Predicts grades with confidence scoring
- Performance breakdown by category (marks, attendance, quizzes, assignments)
- Risk level assessment (Low/Medium/High)

### 🔗 Blockchain Verification
- Every prediction stored on-chain
- Immutable audit trail
- Transaction hash & block number for verification
- Tamper-proof guarantee

### 🤖 Accountable AI Tutor
- GPT-4 powered conversational assistant
- Every chat logged on blockchain
- Academic and general question support
- Fallback tutor for offline mode

### 🎨 Premium UI/UX
- Bitcoin DeFi aesthetic design
- Glassmorphism effects
- Animated 3D elements
- Fully responsive (mobile, tablet, desktop)

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19, Lucide Icons |
| **Backend** | Node.js, Express.js, MongoDB |
| **ML Service** | Django, scikit-learn |
| **Blockchain** | Hardhat, Solidity, Ethers.js |
| **AI** | OpenAI GPT-4 (with fallback) |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- Python 3.8+
- npm or yarn

### Installation

#### 1. Clone the repository
```bash
git clone https://github.com/yourusername/TrustEdu.git
cd TrustEdu
```

#### 2. Start Frontend
```bash
cd frontend
npm install
npm start
```
Opens at http://localhost:3000

#### 3. Start Backend (New Terminal)
```bash
cd backend
npm install
npm start
```
Runs on http://localhost:5000

#### 4. Start ML Service (New Terminal)
```bash
cd ml-service
pip install -r requirements.txt
python train_model.py
python manage.py runserver 8000
```
Runs on http://127.0.0.1:8000

---

## 📂 Project Structure

```
TrustEdu/
├── frontend/          # React application
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Landing, Dashboard, TutorChat
│   │   └── styles/       # Bitcoin DeFi design system
│   └── package.json
├── backend/           # Express API server
│   ├── src/
│   │   ├── controllers/  # API request handlers
│   │   ├── models/       # MongoDB schemas
│   │   └── services/     # Blockchain integration
│   └── package.json
├── ml-service/        # Django ML predictions
│   ├── predictor/        # ML model & views
│   ├── train_model.py    # Model training script
│   └── requirements.txt
└── blockchain/        # Hardhat smart contracts
    ├── contracts/        # Solidity contracts
    └── scripts/          # Deployment scripts
```

---

## 🎮 Usage

### 1. Landing Page
Visit http://localhost:3000 to see:
- Animated 3D orb hero section
- Problem statement
- How it works timeline
- Feature showcase

### 2. Student Dashboard
Navigate to `/dashboard`:
1. Enter student academic data
2. Click "Get AI Prediction"
3. View predicted grade with confidence
4. See blockchain verification proof

### 3. AI Tutor
Navigate to `/tutor`:
1. Enter your Student ID
2. Ask academic or general questions
3. Receive AI-powered answers
4. Every chat is blockchain-verified

---

## 🔧 Configuration

### Backend (.env)
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/trustedu
OPENAI_API_KEY=your_openai_key_here
```

### Blockchain (.env)
```env
PRIVATE_KEY=your_wallet_private_key
RPC_URL=http://127.0.0.1:8545
```

---

## 🎨 Design System

### Bitcoin DeFi Aesthetic
- **Primary Color**: Bitcoin Orange (#F7931A)
- **Accent**: Digital Gold (#FFD600)
- **Background**: True Void (#030304)
- **Typography**: Space Grotesk, Inter, JetBrains Mono

### Key Design Elements
- Glassmorphism with backdrop blur
- Orange gradient glow shadows
- Animated 3D orb
- Pulse indicators for live data
- Corner accent animations

---

## 📊 API Endpoints

### Predictions
- `POST /api/predict` - Create new prediction
- `GET /api/verify/:recordId` - Verify blockchain record

### AI Tutor
- `POST /api/tutor/chat` - Chat with AI tutor

---

## 🏆 Hackathon Highlights

### What Makes TrustEdu Stand Out

1. **Visual Excellence**: Premium Bitcoin DeFi design, not generic dark mode
2. **Complete Integration**: Blockchain verification visible and functional
3. **Explainable AI**: Clear performance breakdowns and recommendations
4. **Production-Ready**: Proper error handling, loading states, responsive design
5. **Innovative UX**: Animated orb, glassmorphism, smooth transitions

---

## 🔐 Security & Privacy

- All predictions hashed before blockchain storage
- Transaction verification via public explorers
- No personal data exposed on-chain
- Encrypted API communications

---

## 📝 Future Enhancements

- [ ] SHAP-based explainable AI integration
- [ ] Real-time bias detection dashboard
- [ ] Admin analytics panel
- [ ] PDF report generation
- [ ] Multi-language support
- [ ] Mobile app (React Native)

---

## 👥 Team

Built with ❤️ for Hackathon 2026

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file

---

## 🙏 Acknowledgments

- OpenAI for GPT-4 API
- Ethereum/Polygon for blockchain infrastructure
- React community for amazing tools

---

**⭐ Star this repo if you found it helpful!**

For questions or issues, please open a GitHub issue.
