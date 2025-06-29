const fs = require('fs');

const logRequest = (req, _, next) => {
    const data = 'Request Received: At ' + Date.now() + ' : ' + req.method + ' On ' + req.url;
    console.log(data);

    fs.appendFileSync('log.txt', `${data}\n`);
    next();
};

module.exports = logRequest;
