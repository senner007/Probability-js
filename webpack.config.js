const NodemonPlugin = require('nodemon-webpack-plugin'); // Ding
const path = require('path');
 
module.exports = {
    output: {
        path: path.resolve('./dist'),
        filename: 'bundled.js',
    },
    plugins: [
        new NodemonPlugin(), // Dong
    ]
};