import { Database } from "sqlite3";

var linkSchema = `CREATE TABLE IF NOT EXISTS links(
id INTEGER PRIMARY KEY AUTOINCREMENT,
url TEXT,
code TEXt,
clicks INTEGER,
createdAt INTEGER,
lastClicked INTEGER
)`

export var db = new Database("links.sql");

export async function insertLink(data, options = null) {
    return new Promise((resolve, reject) => {
        db.run("INSERT INTO links (url, code) VALUES($url, $code)", data, (err) => {
            if(err) reject(`${err}`);
            resolve();
        })
    })
}

export async function getURL(data) {
    return new Promise((resolve, reject) => {
        db.get('SELECT url FROM links WHERE code = ?', data, (err, row) => {
            if(err) reject(err);
            if(!row) reject("Couldn't find code.");
            resolve(row.url)
        });
    })
}
db.run(linkSchema);