import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const variantSchema = new mongoose.Schema({
  size: { type: String },
  color: { type: String },
  price: { type: Number },
  stock: { type: Number, default: 0 },
  sku: { type: String, unique: true },
});

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    shortDescription: { type: String, maxlength: 200 },
    price: { type: Number, required: true, min: 0 },
    comparePrice: { type: Number, min: 0 },
    images: [{ type: String }],
    category: { type: String, required: true, index: true },
    subcategory: { type: String },
    brand: { type: String, index: true },
    tags: [{ type: String }],
    countInStock: { type: Number, required: true, default: 0, min: 0 },
    variants: [variantSchema],
    reviews: [reviewSchema],
    rating: { type: Number, default: 0, min: 0, max: 5 },
    numReviews: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
    onSale: { type: Boolean, default: false },
    salePrice: { type: Number, min: 0 },
    weight: { type: Number },
    dimensions: {
      length: Number,
      width: Number,
      height: Number,
    },
    shippingClass: { type: String, default: "standard" },
    seo: {
      metaTitle: String,
      metaDescription: String,
      slug: { type: String, unique: true },
    },
    status: {
      type: String,
      enum: ["active", "inactive", "draft"],
      default: "active",
    },
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for discount percentage
productSchema.virtual("discountPercentage").get(function () {
  if (this.comparePrice && this.comparePrice > this.price) {
    return Math.round(
      ((this.comparePrice - this.price) / this.comparePrice) * 100
    );
  }
  return 0;
});

// Index for search
productSchema.index({ name: "text", description: "text", tags: "text" });
productSchema.index({ category: 1, price: 1 });
productSchema.index({ featured: 1, createdAt: -1 });

const Product = mongoose.model("Product", productSchema);
export default Product;
