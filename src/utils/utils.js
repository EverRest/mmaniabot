const fs = require('fs');
const path = require('path');
const config = require('../config/config');
const bot = require('../bot/telegram');
const Storage = require('../storage/storage');
const SQLiteDB = require('../db/db');
const mimeTypes = require('../storage/mimeTypes');

async function sendCollectionRandomFilesFromStorage() {
    const storage = new Storage();
    const db = new SQLiteDB(config.dbPath);
    try {
        const files = await storage.getImages();
        if (files.length < 3) {
            console.error('Not enough images found in storage');
            return;
        }
        const date = new Date().toISOString();
        for (let i = 0; i < 3; i++) {
            const fileName = files[i];
            const filePath = path.join(storage.storagePath, fileName);
            const fileStream = fs.createReadStream(filePath);
            const fileExtension = path.extname(fileName);
            const fileSize = fs.statSync(filePath).size;
            const contentType = mimeTypes[fileExtension.toLowerCase()] || 'application/octet-stream';

            // await db.createPostAndReactions(date, fileName + '_' + i, filePath, fileSize, contentType, fileExtension);
            await bot.sendPhoto(process.env.TELEGRAM_CHAT_ID, fileStream, {
                caption: '',
                reply_markup: {},
                contentType
            });
            await storage.deleteFile(fileName);
        }
    } catch (error) {
        console.error('Error getting images:', error);
    }
}

async function sendRandomFileFromStorage() {
    const storage = new Storage();
    const db = new SQLiteDB(config.dbPath);
    try {
        const files = await storage.getImages();
        if (files.length === 0) {
            console.error('No images found in storage');
            return;
        }
        const fileName = files[Math.floor(Math.random() * files.length)];
        const filePath = path.join(storage.storagePath, fileName);
        const fileStream = fs.createReadStream(filePath);
        const fileExtension = path.extname(fileName);
        const fileSize = fs.statSync(filePath).size;
        const contentType = mimeTypes[fileExtension.toLowerCase()] || 'application/octet-stream';
        const date = new Date().toISOString();
        await db.createPostAndReactions(date, fileName, filePath, fileSize, contentType, fileExtension);
        await bot.sendPhoto(process.env.TELEGRAM_CHAT_ID, fileStream, {
            caption: '',
            reply_markup: {},
            contentType
        });
        await storage.deleteFile(fileName);
    } catch (error) {
        console.error('Error getting images:', error);
    }
}

module.exports = {
    sendRandomFileFromStorage,
    sendCollectionRandomFilesFromStorage,
};