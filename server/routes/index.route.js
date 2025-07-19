import { Router } from "express";
import authRoutes from "./auth.route.js";
import orderRoutes from "./orders.route.js";
import productRoutes from "./products.route.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/products", productRoutes);
router.use("/orders", orderRoutes);

export default router;
