const TelegramBot = require('node-telegram-bot-api');
const config = require('../config/config');
const path = require('path');
const token = config.telegramToken;
const bot = new TelegramBot(token, {polling: true});

bot.on('channel_post',
    (msg) => {
        const chatId = msg.chat.id;
        //console.log(chatId);
    });

module.exports = bot;