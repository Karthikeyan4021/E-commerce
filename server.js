const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;
const USERS_FILE = path.join(__dirname, 'users.txt');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Register user
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    const userData = `${username},${password}\n`;
    
    fs.appendFile(USERS_FILE, userData, (err) => {
        if (err) {
            return res.status(500).send('Error registering user');
        }
        res.send('User registered successfully');
    });
});

// Login user
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    fs.readFile(USERS_FILE, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading users file');
        }
        
        const users = data.split('\n').map(line => line.split(','));
        const user = users.find(u => u[0] === username && u[1] === password);
        
        if (user) {
            res.send('Login successful');
        } else {
            res.status(401).send('Invalid credentials');
        }
    });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
