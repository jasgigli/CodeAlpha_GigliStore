import Order from "../models/Order.model.js";

class OrdersController {
  static async placeOrder(req, res) {
    try {
      const order = new Order({ ...req.body, user: req.user.id });
      await order.save();
      res.status(201).json(order);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  static async getUserOrders(req, res) {
    try {
      const orders = await Order.find({ user: req.user.id });
      res.json(orders);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async getAllOrders(req, res) {
    try {
      const orders = await Order.find().populate("user", "name email");
      res.json(orders);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

export default OrdersController;
