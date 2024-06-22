const utils = require('./src/utils/utils');
const config = require('./src/config/config');

async function initializeDb() {
    const mongo = await utils.getDbClient();
    const db = mongo.db(config.mongoDbName);
    // await db.collection('files').insertOne();
}

initializeDb().catch(console.error);