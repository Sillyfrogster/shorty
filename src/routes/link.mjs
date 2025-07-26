import express from "express"

const router = express.Router();

router.get("/:link", (req, res) => {
  console.log(req.params)
  res.send("Wiki home page");
});

export default router;