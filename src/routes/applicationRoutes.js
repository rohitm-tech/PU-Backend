const express = require("express");
const authMiddleware = require("../middleware/auth");
const {
  create,
  getAll,
  update,
  remove,
} = require("../controllers/applicationController");

const router = express.Router();

router.use(authMiddleware);

router.post("/", create);
router.get("/", getAll);
router.patch("/:id", update);
router.delete("/:id", remove);

module.exports = router;
