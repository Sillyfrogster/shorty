import { Database } from "sqlite3";

var linkSchema = `CREATE TABLE IF NOT EXISTS links(
id INTEGER PRIMARY KEY AUTOINCREMENT,
url TEXT,
code TEXT UNIQUE,
clicks INTEGER DEFAULT 0,
visits INTEGER DEFAULT 0,
createdAt INTEGER,
lastEngaged INTEGER
)`;

export var db = new Database("links.sql");

export async function insertLink(data, options = null) {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO links (url, code, createdAt) VALUES($url, $code, $created)",
      data,
      (err) => {
        if (err) reject(`${err}`);
        resolve();
      }
    );
  });
}

export async function checkForCode(code) {
  return new Promise((resolve, reject) => {
    db.get("SELECT code FROM links WHERE code = ?", [code], (err, row) =>
      err ? reject(err) : resolve(row)
    );
  });
}

export async function getURL(data) {
  return new Promise((resolve, reject) => {
    db.get("SELECT url FROM links WHERE code = ?", data, (err, row) => {
      if (err) return reject(err);
      if (!row) return reject(null);
      resolve(row.url);
    });
  });
}

export async function updateEngagements(code, ref = null) {
  return new Promise((resolve, reject) => {
    db.run("UPDATE links SET visits = visits + 1, lastEngaged = ? WHERE code = ?", [Date.now(), code], (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
}

db.run(linkSchema);
