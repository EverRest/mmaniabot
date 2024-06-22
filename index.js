const dotenv = require('dotenv');
dotenv.config({path: './.env'});
const {applicationPort, environment} = require("./src/config/config");
const config = require('./src/config/config');
const bot = require('./src/bot/telegram');
const cron = require('node-cron');
const winston = require('winston');
const utils = require('./src/utils/utils');
const express = require('express');
const {Readable} = require('stream');
const SQLiteDB = require('./src/db/db');
const db = new SQLiteDB(config.dbPath);

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({filename: 'error.log', level: 'error'}),
        new winston.transports.File({filename: 'combined.log'}),
    ],
});

if (environment !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}

const app = express();
const port = applicationPort || 8080;
db.seedDB();

app.get('/', (req, res) => {
    res.send('Hello my boy!');
});

app.get('/upload', (req, res) => {
    res.send('Upload my boy!');
});

app.listen(port, () => {
    logger.info(`Server is running on port ${port}`);
});

cron.schedule('*/30 * * * *', async () => {
    try {
        await utils.sendRandomFileFromStorage();
    } catch (error) {
        db.close();
        logger.error('Error sending random file from storage', error);
    }
});