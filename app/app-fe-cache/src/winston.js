const winston = require("winston");
const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: "doc/app.log",
            level: "info",
        }),
    ],
});

module.exports = {
    info: function (msg) {
        logger.info({
            user: "pch1024",
            datetime: new Date(),
            message: msg,
        });
    },
};
