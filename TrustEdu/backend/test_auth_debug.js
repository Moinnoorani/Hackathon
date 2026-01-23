const axios = require('axios');

async function testRegister() {
    try {
        const response = await axios.post('http://localhost:5000/api/auth/register', {
            name: 'Test User',
            username: 'testuser_' + Date.now(),
            password: 'password123'
        });
        console.log('✅ Registration Success:', response.data);
    } catch (error) {
        console.error('❌ Registration Failed:', error.response ? error.response.data : error.message);
    }
}

testRegister();
