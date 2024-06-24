const TelegramBot = require('node-telegram-bot-api');
const config = require('../config/config');
const path = require('path');
const token = config.telegramToken;
const bot = new TelegramBot(token, {polling: true});

// Import the SQLiteDB class
const SQLiteDB = require('../db/db');

// Create an instance of SQLiteDB
const db = new SQLiteDB(config.dbPath);

bot.on('channel_post',
    (msg) => {
        const chatId = msg.chat.id;
        console.log(chatId);
    });

bot.on('callback_query', async (callbackQuery) => {
    // const callbackData = callbackQuery.data.split('_');
    // const reactionType = callbackData[1];
    // const postId = callbackData[2];
    //
    // try {
    //     await db.updateReactionCount(postId, reactionType);
    //     bot.answerCallbackQuery(callbackQuery.id);
    // } catch (error) {
    //     console.error('Error updating reaction count:', error);
    // }
});

module.exports = bot;