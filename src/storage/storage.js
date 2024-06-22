const fs = require('fs');
const path = require('path');

class Storage {
    constructor() {
        this.storagePath = path.resolve(__dirname, '../../', 'storage');
    }

    renameFile(oldName, newName) {
        return new Promise((resolve, reject) => {
            const oldPath = path.join(this.storagePath, oldName);
            const newPath = path.join(this.storagePath, newName);
            fs.rename(oldPath, newPath, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(newName);
                }
            });
        });
    }

    deleteFile(fileName) {
        return new Promise((resolve, reject) => {
            const filePath = path.join(this.storagePath, fileName);
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error(`Error deleting file ${fileName}:`, err);
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    getImages() {
        return new Promise((resolve, reject) => {
            fs.readdir(this.storagePath, (err, files) => {
                if (err) {
                    reject(err);
                } else {
                    const images = files.filter(file => ['.jpg', '.jpeg', '.png', '.gif'].includes(path.extname(file).toLowerCase()));
                    resolve(images);
                }
            });
        });
    }
}

module.exports = Storage;