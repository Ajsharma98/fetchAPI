const { DataTypes } = require('sequelize');
const sequelize = require('../database/db'); 

const Book = sequelize.define('book', {
    // Define attributes
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull:false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    subjects:{
        type:DataTypes.STRING,

    },
    bookshelves:{
        type:DataTypes.STRING,
    },
    language:{
        type:DataTypes.STRING,
    }
    
}, {
    // Model options
    timestamps: false,
    tableName: 'books'
});
// console.log(Book === sequelize.models.Book)
module.exports = Book;
