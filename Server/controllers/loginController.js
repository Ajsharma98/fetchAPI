const User = require('../Model/user'); // Importing the User model
const bcrypt = require('bcryptjs'); // Importing bcrypt for password hashing
const jwt = require('jsonwebtoken'); // Import the jwt package

// Function to validate password strength
const validatePassword = (password) => {
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;"'<>,.?/~`]/.test(password);

    if (password.length < minLength) {
        return 'Password must be at least 8 characters long';
    }
    if (!hasUppercase) {
        return 'Password must contain at least one uppercase letter';
    }
    if (!hasLowercase) {
        return 'Password must contain at least one lowercase letter';
    }
    if (!hasDigit) {
        return 'Password must contain at least one digit';
    }
    if (!hasSpecialChar) {
        return 'Password must contain at least one special character';
    }
    return null;
};

// Signup function
// const bcrypt = require('bcrypt');
// const User = require('../models/User'); // Adjust the path based on your project structure
// const { validatePassword } = require('../utils/passwordValidator'); // Assuming you have a password validation function

exports.signupUsers = async (req, res) => {
    try {
        const { email, password, confirmPassword, role } = req.body;
        console.log(req.body);

        // Validate input fields
        if (!email || !password || !confirmPassword) {
            return res.status(400).json({ message: 'Email, password, and confirm password are required' });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        // Validate password strength
        const passwordError = validatePassword(password);
        if (passwordError) {
            return res.status(400).json({ message: passwordError });
        }

        // Check if password and confirmPassword match
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Assign role, default to 'user' if not provided or invalid role
        const userRole = role && ['admin', 'user'].includes(role) ? role : 'user';

        // Hash the password and create a new user
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ email, password: hashedPassword, role: userRole });

        return res.status(201).json({ message: 'SignUp successful', role: userRole });
    } catch (error) {
        console.error('Error during signup:', error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.loginUsers = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role }, // Payload (user data)
            process.env.JWT_SECRET, // Secret key (should be stored in environment variables)
            { expiresIn: '1h' } // Token expiration time
        );

        // Send token to the client
        return res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error during login:', error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Logout function
exports.logoutUsers = (req, res) => {
    // No session management needed with JWT
    // Client should handle token deletion (e.g., from localStorage)
    return res.status(200).json({ message: 'Logout successful' });
};

// Optionally, you can remove this sessionChecker function if you're moving away from sessions entirely
// const sessionChecker = (req, res, next) => {
//     if (req.session && req.session.user) {
//         next();
//     } else {
//         return res.status(401).json({ message: 'Unauthorized: Please log in to continue' });
//     }
// };
// Anuj1234@4321
// ajsharma@gmail.com
// admin