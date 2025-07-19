import express from "express";
import { body } from "express-validator";
import OrdersController from "../controller/orders.controller.js";
import auth from "../middleware/auth.js";
import validate from "../middleware/validate.js";

const router = express.Router();

function admin(req, res, next) {
  if (!req.user?.isAdmin)
    return res.status(403).json({ message: "Admin access required" });
  next();
}

const orderValidation = [
  body("orderItems")
    .isArray({ min: 1 })
    .withMessage("Order items are required"),
  body("shippingAddress.address")
    .notEmpty()
    .withMessage("Shipping address is required"),
  body("shippingAddress.city").notEmpty().withMessage("City is required"),
  body("shippingAddress.postalCode")
    .notEmpty()
    .withMessage("Postal code is required"),
  body("shippingAddress.country").notEmpty().withMessage("Country is required"),
  body("paymentMethod").notEmpty().withMessage("Payment method is required"),
  body("totalPrice")
    .isFloat({ gt: 0 })
    .withMessage("Total price must be greater than 0"),
  validate,
];

router.post("/", auth, orderValidation, OrdersController.placeOrder);
router.get("/myorders", auth, OrdersController.getUserOrders);
router.get("/", auth, admin, OrdersController.getAllOrders);

export default router;
