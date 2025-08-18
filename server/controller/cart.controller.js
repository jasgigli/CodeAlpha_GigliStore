import Cart from "../models/Cart.model.js";
import Product from "../models/Product.model.js
lass CartController {
  static async getCart(req, res) {
    try {
      let cart = await Cart.findOne({ user: req.user._id })
        .populate('items.product', 'name price images countInStock');

      if (!cart) {
        cart = new Cart({ user: req.user._id, items: [] });
        await cart.save();
      }

      res.json({ success: true, data: cart });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  static async addToCart(req, res) {
    try {
      const { productId, quantity = 1, variant } = req.body;

      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ success: false, message: "Product not found" });
      }

      if (product.countInStock < quantity) {
        return res.status(400).json({ success: false, message: "Insufficient stock" });
      }

      let cart = await Cart.findOne({ user: req.user._id });
      if (!cart) {
        cart = new Cart({ user: req.user._id, items: [] });
      }

      // Check if item already exists in cart
      const existingItemIndex = cart.items.findIndex(
        item => item.product.toString() === productId &&
        JSON.stringify(item.variant) === JSON.stringify(variant)
      );

      if (existingItemIndex > -1) {
        cart.items[existingItemIndex].quantity += quantity;
      } else {
        cart.items.push({
          product: productId,
          quantity,
          variant,
          price: product.price
        });
      }

      await cart.save();
      await cart.populate('items.product', 'name price images countInStock');

      res.json({ success: true, data: cart });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  static async updateCartItem(req, res) {
    try {
      const { quantity } = req.body;
      const { itemId } = req.params;

      const cart = await Cart.findOne({ user: req.user._id });
      if (!cart) {
        return res.status(404).json({ success: false, message: "Cart not found" });
      }

      const item = cart.items.id(itemId);
      if (!item) {
        return res.status(404).json({ success: false, message: "Item not found in cart" });
      }

      if (quantity <= 0) {
        cart.items.pull(itemId);
      } else {
        item.quantity = quantity;
      }

      await cart.save();
      await cart.populate('items.product', 'name price images countInStock');

      res.json({ success: true, data: cart });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  static async removeFromCart(req, res) {
    try {
      const { itemId } = req.params;

      const cart = await Cart.findOne({ user: req.user._id });
      if (!cart) {
        return res.status(404).json({ success: false, message: "Cart not found" });
      }

      cart.items.pull(itemId);
      await cart.save();
      await cart.populate('items.product', 'name price images countInStock');

      res.json({ success: true, data: cart });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  static async clearCart(req, res) {
    try {
      const cart = await Cart.findOne({ user: req.user._id });
      if (!cart) {
        return res.status(404).json({ success: false, message: "Cart not found" });
      }

      cart.items = [];
      cart.couponCode = undefined;
      cart.discountAmount = 0;
      await cart.save();

      res.json({ success: true, data: cart });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  static async applyCoupon(req, res) {
    try {
      const { couponCode } = req.body;

      // Import Coupon model here to avoid circular dependency
      const { default: Coupon } = await import("../models/Coupon.model.js");

      const coupon = await Coupon.findOne({
        code: couponCode.toUpperCase(),
        isActive: true,
        validFrom: { $lte: new Date() },
        validUntil: { $gte: new Date() }
      });

      if (!coupon) {
        return res.status(400).json({ success: false, message: "Invalid or expired coupon" });
      }

      const cart = await Cart.findOne({ user: req.user._id });
      if (!cart) {
        return res.status(404).json({ success: false, message: "Cart not found" });
      }

      if (cart.subtotal < coupon.minimumAmount) {
        return res.status(400).json({
          success: false,
          message: `Minimum order amount is $${coupon.minimumAmount}`
        });
      }

      let discountAmount = 0;
      if (coupon.type === 'percentage') {
        discountAmount = (cart.subtotal * coupon.value) / 100;
        if (coupon.maximumDiscount) {
          discountAmount = Math.min(discountAmount, coupon.maximumDiscount);
        }
      } else {
        discountAmount = coupon.value;
      }

      cart.couponCode = couponCode.toUpperCase();
      cart.discountAmount = discountAmount;
      await cart.save();

      res.json({ success: true, data: cart });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }
}

export default CartController;
