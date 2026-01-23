const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const { name, username, password } = req.body;

        // 1. Manual Validation
        if (!name || !username || !password) {
            return res.status(400).json({ message: 'All fields are true' });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }

        // 2. Check duplicate username
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ message: 'Username is already taken. Please choose another.' });
        }

        // 3. Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 4. Create user
        user = new User({
            name,
            username,
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

module.exports = {
    register,
    login,
};
