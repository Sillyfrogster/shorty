import express from "express"
import { createUniqueLink } from "../utils.js";
import { verifyURL } from "../utils.js";
import { db, getURL, insertLink} from "../databases/link.js";
const router = express.Router();

router.get(/^\/link\/(.+)$/, (req, res) => {
  if(!req.params) {
    res.send("Missing link");
    return;
  }
  if(!verifyURL(req.params[0])) {
    res.send("Invalid link.");
    return;
  }

  let code = createUniqueLink(5, 10);
  insertLink({ url: req.params[0], code})
  res.status(200).json({ code, url: `localhost:3000/${code}`});
  return;
});

router.get('/:code', async (req, res) => {
  if(!req.params) {
    res.send("Missing URL code.");
    return;
  }
  let url = await getURL(req.params.code);
  if(!url) {
    return res.status(404).json({ "Error": "Code not valid."})
  }
  res.status(200).redirect(url);
  return;
})
export default router;