const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const { name, username, email, password } = req.body;

        // 1. Manual Validation
        if (!name || !username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }

        // 2. Check duplicate username or email
        let user = await User.findOne({ $or: [{ username }, { email }] });
        if (user) {
            return res.status(400).json({ message: 'Username or Email is already taken.' });
        }

        // 3. Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 4. Create user
        user = new User({
            name,
            username,
            email,
            password: hashedPassword,
        });

        await user.save();

        // 5. Create token
        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET || 'secret', // Use env variable in prod
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token, user: { id: user.id, name: user.name, username: user.username } });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if user exists
        let user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        // Match password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        // Create token
        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token, user: { id: user.id, name: user.name, username: user.username } });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const ethers = require('ethers'); // Using ethers for backend signature verification

const walletLogin = async (req, res) => {
    try {
        const { walletAddress } = req.body;

        if (!walletAddress) {
            return res.status(400).json({ message: 'Wallet address is required' });
        }

        // Check if user exists
        let user = await User.findOne({ walletAddress: walletAddress.toLowerCase() });

        if (!user) {
            // If user doesn't exist, create a new one automatically (or ask to register - usually auto-create for wallet login)
            // For TrustEdu, we might want to register them with a placeholder name
            user = new User({
                name: 'Wallet User', // Default name
                username: walletAddress.toLowerCase().substring(0, 10), // Default username
                email: `${walletAddress.toLowerCase()}@wallet.placeholder`, // unique dummy email
                password: await bcrypt.hash(Math.random().toString(36), 10), // Random password
                walletAddress: walletAddress.toLowerCase()
            });
            await user.save();
        }

        // Create token
        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '24h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token, user: { id: user.id, name: user.name, username: user.username, walletAddress: user.walletAddress } });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) {
            // SECURITY: Ideally we shouldn't reveal if email exists, but for this hackathon/MVP UI feedback:
            return res.status(404).json({ message: 'Email address not found in our records.' });
        }

        // Generate Reset Token (valid for 15 mins)
        const resetToken = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '15m' }
        );

        // Simulate Email Sending
        const resetLink = `http://localhost:3000/reset-password/${resetToken}`;
        console.log(`\n📧 [EMAIL SIMULATION] Password Reset Link for ${email}: ${resetLink}\n`);

        res.json({ message: 'Password reset link sent to your email.' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    register,
    login,
    walletLogin,
    forgotPassword
};
