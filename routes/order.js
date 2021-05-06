const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/check_auth");

const OrderControllers = require("../controllers/orders");

router.get("/", checkAuth, OrderControllers.getAllOrders);

router.post("/", checkAuth, OrderControllers.postOrder);
router.get("/:orderId", checkAuth, OrderControllers.getSingleOrder);

router.patch("/:orderId", checkAuth, OrderControllers.updateOrder);

router.delete("/:orderId", checkAuth, OrderControllers.deleteOrder);

module.exports = router;
