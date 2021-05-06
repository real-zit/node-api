const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/check_auth");
const multer = require("multer");

const ProductController = require("../controllers/products");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

router.get("/", ProductController.getAllProducts);

router.post(
  "/",
  checkAuth,
  upload.single("productImage"),
  ProductController.postProducts
);

router.get("/:productId", checkAuth, ProductController.getSingleProduct);

router.patch("/:productId", checkAuth, ProductController.updateProduct);

router.delete("/:productId", checkAuth, ProductController.deleteProduct);

module.exports = router;
