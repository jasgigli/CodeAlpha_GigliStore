import express from "express";
import { body } from "express-validator";
import ProductsController from "../controller/products.controller.js";
import auth from "../middleware/auth.js";
import validate from "../middleware/validate.js";

const router = express.Router();

function admin(req, res, next) {
  if (!req.user?.isAdmin)
    return res.status(403).json({ message: "Admin access required" });
  next();
}

const productValidation = [
  body("name").notEmpty().withMessage("Name is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("price").isFloat({ gt: 0 }).withMessage("Price must be greater than 0"),
  body("category").notEmpty().withMessage("Category is required"),
  body("countInStock")
    .isInt({ min: 0 })
    .withMessage("Count in stock must be 0 or more"),
  validate,
];

router.get("/", ProductsController.getAll);
router.get("/:id", ProductsController.getById);
router.post("/", auth, admin, productValidation, ProductsController.create);
router.put("/:id", auth, admin, productValidation, ProductsController.update);
router.delete("/:id", auth, admin, ProductsController.remove);

export default router;
