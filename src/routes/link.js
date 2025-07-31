import express from "express"
import { createUniqueLink } from "../utils.js";
import { verifyURL } from "../utils.js";
import { getURL, insertLink} from "../databases/link.js";
const router = express.Router();

router.post('/link', async (req, res) => {
  if(!req.body) {
    res.status(400).json({ "Error": "Missing link." });
    return;
  }

  if(!verifyURL(req.body.url)) {
    res.status(422).json({ "Error": "Invalid Link" });
    return;
  }

  let code = await createUniqueLink(5, 10);
  await insertLink({ $url: req.body.url, $code: code, $created: Date.now()})
  res.status(200).json({ code, url: `localhost:3000/${code}`});
  return;
});

router.get('/:code', async (req, res) => {
  if(!req.params) {
    res.send("Missing URL code.");
    return;
  }

  let url = await getURL(req.params.code).catch((err) => console.log(err));
  
  if(!url) {
    return res.status(404).json({ "Error": "Code not valid."})
  }
  res.status(200).redirect(url);
  return;
})
export default router;