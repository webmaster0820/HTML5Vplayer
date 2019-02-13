const argv = require('./argv');

module.exports = parseInt(argv.port || process.env.port || '3000', 10);
