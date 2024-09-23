const { DataTypes } = require('sequelize');
const sequelize = require('../database/db'); // Connection to the database

// Define the User model
const User = sequelize.define('user', {
    // Email column as primary key
    email: {
        type: DataTypes.STRING,   // Email is stored as a string
        primaryKey: true,         // Primary key (must be unique for each user)
        allowNull: false          // Email cannot be null
    },
    // Password column
    password: {
        type: DataTypes.STRING,   // Password is stored as a string (hashed)
        allowNull: false          // Password cannot be null
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'user', // Default role is 'user'
        allowNull: false,
    }
}, {
    // Model options
    timestamps: false,           // Disable automatic creation of createdAt and updatedAt
    tableName: 'users'           // Specify the table name explicitly
});

// Export the model
module.exports = User;
