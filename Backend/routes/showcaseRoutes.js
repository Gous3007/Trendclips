const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const controller = require("../controllers/showcaseController");

router.post(
    "/add",
    upload.single("image"),
    controller.addShowcase
);

router.get("/", controller.getShowcase);

router.delete("/:id", controller.deleteShowcase);

router.get("/homepage", controller.getHomeProducts);

module.exports = router;
