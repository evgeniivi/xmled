const path = require('path');

module.exports = {
	mode: 'development',
	entry: './client-src/index.js',
	output: {
	    path: path.resolve(__dirname, './static/js'),
	    filename: 'all.js'
	}
};
