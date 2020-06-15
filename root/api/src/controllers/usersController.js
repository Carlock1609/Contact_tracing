const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const User = require('../models/User');


// Register User - POST
exports.register = async (req, res) => {
    const errors = validationResult(req);
    console.log(req.body)
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if(user) {
            return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
        }

        user = new User({
            name,
            email,
            password
        });
        // 10 is the 'rounds'
        const salt = await bcrypt.genSalt(10);
        
        // Encrypt password - bcrypt
        // This takes in a plain text password
        user.password = await bcrypt.hash(password, salt);

        await user.save()

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload,
            config.get('jwtToken'),
            { expiresIn: 3600 },
            (err, token) => {
                if(err) throw err;
                res.json({ token })
            }
        );
    } catch(err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
};

// Login and authenticate user - GET
exports.login = async (req, res) => {
    
    // fill this out soon. right now middleware is being used.
    res.send({currentUser:req.user});
};

// Logout user - POST
exports.logout = async (req, res) => {
    req.logout();
    // req.flash('success', 'Logged out!');
    // res.redirect('https://127.0.0.1:8001/');
};


    
