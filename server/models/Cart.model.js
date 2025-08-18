import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: { type: Number, required: true, min: 1 },
  variant: {
    size: String,
    color: String,
    sku: String,
  },
  price: { type: Number, required: true },
  addedAt: { type: Date, default: Date.now },
});

const cartSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [cartItemSchema],
    couponCode: String,
    discountAmount: { type: Number, default: 0 },
    subtotal: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
    expiresAt: { type: Date, default: Date.now, expires: 2592000 }, // 30 days
  },
  { timestamps: true }
);

// Calculate totals before saving
cartSchema.pre("save", function (next) {
  this.subtotal = this.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  this.total = this.subtotal - this.discountAmount;
  next();
});

// Index for performance
cartSchema.index({ user: 1 });

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
