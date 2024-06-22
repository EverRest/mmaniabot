require('dotenv').config();

module.exports = {
    telegramToken: process.env.TELEGRAM_TOKEN,
    applicationPort: process.env.APPLICATION_PORT,
    environment: process.env.NODE_ENV,
    dataFolderPath: './data',
    dbPath: process.env.DATABASE_URL,
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    googleRedirectUrl: process.env.GOOGLE_REDIRECT_URL,
};