import express from "express"
import { createUniqueLink } from "../utils.js";
import { verifyURL } from "../utils.js";
import { db, getURL, insertLink} from "../databases/link.js";
const router = express.Router();

router.post('/link', async (req, res) => {
  if(!req.body) {
    res.send("Missing link");
    return;
  }
  if(!verifyURL(req.body.url)) {
    res.send("Invalid link.");
    return;
  }

  let code = createUniqueLink(5, 10);
  await insertLink({ $url: req.body.url, $code: code})
  res.status(200).json({ code, url: `localhost:3000/${code}`});
  return;
});

router.get('/:code', async (req, res) => {
  if(!req.params) {
    res.send("Missing URL code.");
    return;
  }
  console.log(req)
  let url = await getURL(req.params.code);
  if(!url) {
    return res.status(404).json({ "Error": "Code not valid."})
  }
  res.status(200).redirect(url);
  return;
})
export default router;