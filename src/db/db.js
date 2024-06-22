const sqlite3 = require('sqlite3').verbose();

class SQLiteDB {
    constructor(dbPath) {
        this.db = new sqlite3.Database(dbPath, (err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Connected to the SQLite database.');
        });
    }

    seedDB() {
        this.db.run(`
        CREATE TABLE IF NOT EXISTS posts(
            id integer PRIMARY KEY,
            msg_id VARCHAR(255) DEFAULT NULL,
            fileName VARCHAR(100) UNIQUE,
            filePath VARCHAR(255),
            fileSize integer,
            mime VARCHAR(50),
            extension VARCHAR(5),
            celebration integer default 0,
            rainbow integer default 0,
            star integer default 0,
            angry integer default 0,
            fire integer default 0,
            rocket integer default 0,
            love integer default 0
        )
    `, (err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Posts table created.');
        });
    }

    updateReaction(post_id, reaction) {
        this.db.run(`UPDATE reactions SET ${reaction} = ${reaction} + 1 WHERE post_id = ?`, post_id, (err) => {
            if (err) {
                console.error(err.message);
            }
        });
    }

    async createPost(msg_id = null, fileName, filePath, fileSize, mime, extension) {
        try {
            let q = await this.db.run(`INSERT INTO posts(msg_id, fileName, filePath, fileSize, mime, extension) VALUES(?, ?, ?, ?, ?, ?)`, [msg_id, fileName, filePath, fileSize, mime, extension]);
        } catch (err) {
            console.error(err.message);
        }
    }

    createReaction(post_id) {
        return new Promise((resolve, reject) => {
            this.db.run(`INSERT INTO reactions(post_id) VALUES(?)`, [post_id], (err) => {
                if (err) {
                    reject(err.message);
                } else {
                    resolve();
                }
            });
        });
    }

    updateReactionCount(fileName, reactionType) {
        return new Promise((resolve, reject) => {
            const sql = `
            UPDATE posts
            SET ${reactionType} = ${reactionType} + 1
            WHERE fileName = ?
        `;
            this.db.run(sql, [fileName], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.changes);
                }
            });
        });
    }

    async createPostAndReactions(date, fileName, filePath, fileSize, mime, extension) {
        try {
            await this.createPost(null, fileName, filePath, fileSize, mime, extension);
        } catch (err) {
            console.error(err.message);
        }
    }

    getReactionCounts(post_id) {
        return new Promise((resolve, reject) => {
            this.db.get(`SELECT * FROM reactions WHERE post_id = ?`, post_id, (err, row) => {
                if (err) {
                    reject(err.message);
                }
                resolve(row);
            });
        });
    }

    close() {
        this.db.close((err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Close the database connection.');
        });
    }
}

module.exports = SQLiteDB;