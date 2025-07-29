import { Database } from "sqlite3";

var linkSchema = `CREATE TABLE IF NOT EXISTS links(
id INTEGER PRIMARY KEY AUTOINCREMENT,
url TEXT,
code TEXt,
clicks NUMBER
)`

export var db = new Database("links.sql", (err) => {
  console.log(err)
});

export function insertLink(data, options = null) {
    try {
        db.run("INSERT INTO links (url, code) VALUES($url, $code)", data);
        return;
    } catch (error) {
        console.log(error);
    }
}

export async function getURL(data) {
    return new Promise((resolve, reject) => {
        db.get('SELECT url FROM links WHERE code = ?', data, (err, row) => {
            if(err) reject(err);
            resolve(row.url)
        });
    })
}
db.run(linkSchema);