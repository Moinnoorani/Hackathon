# TrustEdu Project Handbook

## End-to-End System Flow

This document outlines the complete technical and user flow of the TrustEdu platform, detailing how the Frontend, Backend, AI Service, and Blockchain interact to deliver a trusted academic ecosystem.

### 1. User Authentication & Onboarding

**Goal**: Securely identify users while offering Web3 capabilities.

1.  **Registration**:
    *   User signs up with `Username`, `Email`, and `Password`.
    *   **Backend**: Hashes password using `bcrypt` and stores the user in MongoDB.
2.  **Login Options**:
    *   **Standard Login**: User enters credentials. Backend validates hash, issues a **JWT Token** for session management.
    *   **Wallet Connect (Web3)**:
        *   User clicks "Connect Wallet" (MetaMask).
        *   **Frontend**: Uses `ethers.js` to request account access.
        *   **Backend**: Verifies the wallet address signature.
        *   **Result**: User is authenticated via their Ethereum address.
3.  **Forgot Password**:
    *   User requests a reset via email.
    *   **Backend**: Verifies email, generates a time-limited reset token.
    *   **Simulation**: Since email service is mocked for the hackathon, the reset link is logged to the server console.

### 2. Student Data & AI Prediction Loop

**Goal**: Analyze student performance using Machine Learning without compromising data integrity.

1.  **Data Input**:
    *   Student/Teacher logs into the **Dashboard**.
    *   Inputs academic data: `Study Hours`, `Attendance`, `Previous Grades`, `Participation Score`.
2.  **Prediction Request**:
    *   **Frontend**: Sends JSON payload to `POST /api/predict`.
    *   **Backend (Node.js)**: Validates input and forwards the request to the **ML Service (Python/Django)**.
3.  **AI Analysis (ML Service)**:
    *   **Model**: Random Forest Classifier (trained on 1000+ synthetic records).
    *   **Process**:
        *   Calculates a `Risk Score` (0-100).
        *   Classifies into `Safe`, `Moderate`, or `High Risk`.
        *   Generates a confidence score.
    *   **Response**: Returns the prediction and detailed analysis to the Node.js Backend.

### 3. The Trust Layer: Blockchain Verification

**Goal**: Prove that the AI prediction has not been tampered with or retroactively altered.

1.  **Hashing & Salting**:
    *   **Backend**: Immediately upon receiving the AI result, it creates a **Cryptographic Hash** (SHA-256).
    *   `Data Hash = hash(StudentID + RiskScore + Timestamp + Prediction + SecretSalt)`
    *   This hash represents the "Fingerprint" of the prediction.
2.  **Blockchain Transaction**:
    *   **Backend**: Uses a **Relayer Wallet** (funded server-side wallet) to pay gas fees.
    *   **Smart Contract**: Calls `storeHash(recordId, dataHash)` on the Sepolia Testnet.
    *   **Confirmation**: The transaction is mined, generating a unique `Transaction Hash (txHash)` and `Block Number`.
3.  **Audit Logging**:
    *   **Database**: Stores a complete `AuditLog` entry containing:
        *   `Record ID`
        *   `Original Data` (Encrypted)
        *   `Data Hash`
        *   `Transaction Hash` (The link to Etherscan)
        *   `Block Number`

### 4. Verification & Transparency (User View)

**Goal**: Allow anyone (Parent/Auditor) to verify the data.

1.  **Trust Ledger**:
    *   Dashboard displays a "Recent Activity" feed.
    *   Clicking an entry shows the **Audit Detail Page**.
2.  **Verification Process**:
    *   **Local Verify**: The system takes the stored data and re-hashes it locally. It compares this `New Hash` with the `Stored Hash`. If they match, data is intact.
    *   **Public Verify**: User clicks **"View on Explorer"**.
    *   **Etherscan**: Opens the Sepolia Etherscan page for that transaction. The user can see the input data (the hash) was permanently written to the blockchain at a specific timestamp.
    *   **Proof**: Since the blockchain is immutable, this proves the prediction was generated exactly when claimed and hasn't been changed.

### 5. AI Tutor with Guardrails

**Goal**: Provide academic assistance while preventing misuse (e.g., non-educational queries).

1.  **Student Query**:
    *   Student asks: *"Explain Quantum Physics"* or *"Write a movie script"*.
2.  **Guardrail Layer 1 (Keyword Filter)**:
    *   **Backend**: Checks input against a `NON_EDUCATIONAL_TOPICS` list (e.g., "movies", "games", "lyrics").
    *   **Action**: If triggered, immediately blocks the request with a warning message.
3.  **Guardrail Layer 2 (System Prompt)**:
    *   If allowed, the request goes to the **LLM (GPT-4)**.
    *   **System Instruction**: *"You are an academic tutor. Refuse to answer non-educational questions. Keep answers concise."*
    *   **Refusal**: If the student tries to bypass keyword filters (e.g., "Teach me how to cheat"), the LLM itself refuses based on its persona.
4.  **Response**:
    *   The safe, educational answer is returned to the chat interface.
