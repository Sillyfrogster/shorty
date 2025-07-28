import express from "express"
import { linkSchema } from "../schemas/link.js";
import { Database } from "sqlite3";
import { createUniqueLink } from "../utils.js";
const router = express.Router();

let db = new Database("links.sql", (err) => {
  console.log(err)
});
db.run(linkSchema);

let urlRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/

router.get(/^\/(.+)$/, (req, res) => {
  if(!req.params || req.params > 1) {
    res.send("Missing link or multiple links.");
    return;
  }
  let url = req.params[0].match(urlRegex)
  if(!url) {
    res.send("Invalid link.");
    return;
  }

  let code = createUniqueLink(5, 10);
  db.run(`INSERT INTO links (url, code) VALUES(?, ?)`, [req.params[0], code], (err) => {
    console.log(err)
  });
  res.send("This is where the short link will be. (TBD....skibidi.)");
  return;
});

export default router;