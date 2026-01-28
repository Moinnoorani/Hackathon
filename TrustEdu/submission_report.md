# TrustEdu: Blockchain-Verified AI Academic Performance System
**Hackathon 2026 Submission Report**

---

## 1. Project Overview

**Tagline**: *Bridging the gap between AI predictive power and institutional trust through immutable blockchain verification.*

**TrustEdu** is a next-generation EdTech platform that addresses the critical issues of **AI Hallucinations**, **Black Box Bias**, and **Data Integrity** in academic analytics. By combining transparent Machine Learning with an immutable Ethereum Sepolia ledger, we provide a "Trustless" environment where students, parents, and teachers can verify every academic prediction.

---

## 2. The Problem Statement

As AI becomes integral to education, two major risks have emerged:
1.  **AI Bias & Lack of Accountability**: Traditional AI models are "black boxes." If an AI predicts a student will fail, there is often no audit trail explaining *why* or proving the input data wasn't manipulated.
2.  **Data Tampering**: Centralized databases are vulnerable. Unethical administrators or hackers could alter historical performance records to change AI outcomes retroactively.
3.  **Unregulated AI Tutors**: Generic AI chatbots can distract students with non-educational content or provide hallucinated answers without oversight.

---

## 3. The Solution

TrustEdu implements a **"Verify, Then Trust"** architecture:

*   **Immutable Audit Trail**: Every AI prediction is hashed (SHA-256) and anchored to the **Sepolia Blockchain** via a smart contract. This creates a permanent, tamper-proof timestamp of the exact data used for the prediction.
*   **Guardrailed AI Tutor**: A dual-layer protection system (Keyword Filtering + System Prompt Engineering) ensures the AI tutor remains strictly academic, refusing non-educational queries (e.g., "Write a movie script").
*   **Transparent Analytics**: Students receive actionable insights (Risk Levels: Safe/Moderate/High) backed by cryptographic proof, viewable on public block explorers like Etherscan.

---

## 4. Technical Architecture

### **Frontend (The User Experience)**
*   **Framework**: React 19 (Modern Hooks based architecture)
*   **Design System**: "Bitcoin DeFi" Aesthetic (Glassmorphism, Dark UI, interactive data visualization).
*   **Web3 Integration**: `ethers.js` for Wallet connection (MetaMask) and Smart Contract interaction.
*   **Interactive UI**: Recharts for performance graphing and Framer Motion for animations.

### **Backend (The Logic Layer)**
*   **Runtime**: Node.js & Express.js.
*   **Database**: MongoDB (Stores User Profiles, Encrypted Academic Data, and Audit Logs).
*   **Blockchain Service**: Custom service that manages a **Gas Relayer Wallet** to pay transaction fees on behalf of students, ensuring a seamless "Gasless" UX.
*   **AI Controller**: Manages the Chat Interface and enforces Guardrails before calls reach the LLM.

### **ML Service (The Intelligence)**
*   **Framework**: Python (Django) Microservice.
*   **Model**: Random Forest Classifier (Scikit-Learn).
*   **Training**: Trained on a synthetic dataset of 1,000 realistic student records, achieving **98% Accuracy** in risk classification.
*   **Output**: Returns Prediction + Confidence Score + Key Risk Factors.

### **Blockchain (The Trust Layer)**
*   **Network**: Ethereum Sepolia Testnet.
*   **Smart Contract**: Solidity (`AuditLog.sol`) - Minimal verified storage contract to optimize gas usage.
*   **Verification**: Publicly verifiable transaction hashes linked directly from the UI.

---

## 5. Innovation & USP (Unique Selling Points)

1.  **Dual-Verification System**: We don't just show the AI result; we show the *receipt*. The "Trust Stamp" on every prediction links to a real blockchain transaction.
2.  **Privacy-First Architecture**: We store **Hashes**, not PII (Personally Identifiable Information), on the blockchain. This ensures GDPR compliance while maintaining integrity.
3.  **Educational Guardrails**: Unlike standard ChatGPT wrappers, our AI Tutor is engineered specifically for education, actively blocking distractions.

---

## 6. Future Roadmap (Post-Hackathon)

*   **Zero-Knowledge Proofs (ZKPs)**: Implementing zk-SNARKs to allow students to prove their academic standing to employers without revealing their actual grades.
*   **Explanation-AI (XAI)**: Integrating SHAP (SHapley Additive exPlanations) values to tell students *exactly* which factor (e.g., "Low Attendance") caused a "High Risk" flag.
*   **LMS Integration**: Plugins for Canvas/Blackboard to pull data automatically, removing manual entry.
*   **Decentralized Credentials**: Issue diplomas as **Verifiable Credentials (VCs)** or Soulbound Tokens (SBTs) on the mainnet.

---

## 7. Installation & Setup

**Prerequisites**: Node.js v16+, Python 3.8+, MetaMask Wallet.

1.  **Clone & Install**:
    ```bash
    git clone https://github.com/your-repo/trustedu.git
    cd TrustEdu
    npm run setup  # Custom script to install all dependencies
    ```

2.  **Environment Variables**:
    *   Configure `.env` with `OPENAI_API_KEY` and `PRIVATE_KEY` (Sepolia).

3.  **Launch**:
    ```bash
    # Terminal 1: Frontend
    cd frontend && npm start
    
    # Terminal 2: Backend
    cd backend && npm start
    
    # Terminal 3: ML Service
    cd ml-service && python manage.py runserver
    ```

---

## 8. Team

*   **Moin Noorani** - Full Stack Developer & Blockchain Lead
*   *(Add other team members here)*

---

*Submitted for Hackathon 2026*
