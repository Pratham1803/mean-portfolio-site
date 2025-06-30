const fs = require('fs');

const logRequest = (req, _, next) => {
    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
    const istDate = new Date(now.getTime() + istOffset);
    const dateStr = istDate.toISOString().replace('T', ' ').replace('Z', ' IST');
    const data = `[${dateStr}] ${req.ip} ${req.method} ${req.originalUrl}`;
    console.log(data);

    fs.appendFileSync('log.txt', `${data}\n`);
    next();
};

module.exports = logRequest;
