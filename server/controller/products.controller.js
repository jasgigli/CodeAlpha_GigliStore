import axios from "axios";
import fs from "fs";
import path from "path";
import Product from "../models/Product.model.js";
import Category from "../models/Category.model.js";

class ProductsController {
  static async getAll(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 12;
      const skip = (page - 1) * limit;

      // Build filter object
      const filter = {};
      if (req.query.category) filter.category = req.query.category;
      if (req.query.brand) filter.brand = req.query.brand;
      if (req.query.featured) filter.featured = req.query.featured === 'true';
      if (req.query.onSale) filter.onSale = req.query.onSale === 'true';
      if (req.query.status) filter.status = req.query.status;

      // Price range filter
      if (req.query.minPrice || req.query.maxPrice) {
        filter.price = {};
        if (req.query.minPrice) filter.price.$gte = parseFloat(req.query.minPrice);
        if (req.query.maxPrice) filter.price.$lte = parseFloat(req.query.maxPrice);
      }

      // Search filter
      if (req.query.search) {
        filter.$text = { $search: req.query.search };
      }

      // Sort options
      let sort = {};
      switch (req.query.sort) {
        case 'price_asc':
          sort = { price: 1 };
          break;
        case 'price_desc':
          sort = { price: -1 };
          break;
        case 'rating':
          sort = { rating: -1 };
          break;
        case 'newest':
          sort = { createdAt: -1 };
          break;
        case 'name':
          sort = { name: 1 };
          break;
        default:
          sort = { createdAt: -1 };
      }

      const products = await Product.find(filter)
        .populate('reviews.user', 'firstName lastName')
        .sort(sort)
        .skip(skip)
        .limit(limit);

      const total = await Product.countDocuments(filter);
      const totalPages = Math.ceil(total / limit);

      // If DB is empty, seed with sample data
      if (total === 0 && !req.query.search) {
        await ProductsController.seedProducts();
        return ProductsController.getAll(req, res);
      }

      res.json({
        success: true,
        data: products,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: total,
          itemsPerPage: limit,
          hasNext: page < totalPages,
          hasPrev: page > 1
        }
      });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });

  static async remove(req, res) {
    try {
  static async getById(req, res) {
    try {
      const product = await Product.findById(req.params.id)
        .populate('reviews.user', 'firstName lastName avatar')
        .populate('vendor', 'firstName lastName');

      if (!product) {
        return res.status(404).json({ success: false, message: "Product not found" });
      }

      // Increment view count (you can add this field to schema)
      await Product.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } });

      res.json({ success: true, data: product });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  static async create(req, res) {
    try {
      // Generate slug from name
      if (!req.body.seo?.slug) {
        const slug = req.body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        req.body.seo = { ...req.body.seo, slug };
      }

      const product = new Product({
        ...req.body,
        vendor: req.user._id
      });

      await product.save();

      res.status(201).json({ success: true, data: product });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  static async update(req, res) {
    try {
      const product = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );

      if (!product) {
        return res.status(404).json({ success: false, message: "Product not found" });
      }

      res.json({ success: true, data: product });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  static async remove(req, res) {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);

      if (!product) {
        return res.status(404).json({ success: false, message: "Product not found" });
      }

      res.json({ success: true, message: "Product deleted successfully" });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  static async addReview(req, res) {
    try {
      const { rating, comment } = req.body;
      const product = await Product.findById(req.params.id);

      if (!product) {
        return res.status(404).json({ success: false, message: "Product not found" });
      }

      // Check if user already reviewed
      const existingReview = product.reviews.find(
        review => review.user.toString() === req.user._id.toString()
      );

      if (existingReview) {
        return res.status(400).json({ success: false, message: "Product already reviewed" });
      }

      const review = {
        user: req.user._id,
        name: req.user.fullName,
        rating: Number(rating),
        comment
      };

      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

      await product.save();
      res.status(201).json({ success: true, message: "Review added successfully" });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  static async getCategories(req, res) {
    try {
      const categories = await Product.distinct('category');
      res.json({ success: true, data: categories });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  static async getBrands(req, res) {
    try {
      const brands = await Product.distinct('brand');
      res.json({ success: true, data: brands.filter(Boolean) });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  static async getFeatured(req, res) {
    try {
      const products = await Product.find({ featured: true, status: 'active' })
        .limit(8)
        .sort({ createdAt: -1 });

      res.json({ success: true, data: products });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  static async getRelated(req, res) {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ success: false, message: "Product not found" });
      }

      const related = await Product.find({
        _id: { $ne: product._id },
        category: product.category,
        status: 'active'
      }).limit(4);

      res.json({ success: true, data: related });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  // Helper method to seed products
  static async seedProducts() {
    try {
      const filePath = path.resolve(process.cwd(), "products.json");
      if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath, "utf-8");
        const jsonProducts = JSON.parse(fileData);

        const mapped = jsonProducts.map((p) => ({
          name: p.title,
          description: p.description,
          price: p.price,
          images: [p.image],
          category: p.category,
          countInStock: Math.floor(Math.random() * 50) + 10,
          rating: p.rating || (Math.random() * 2 + 3),
          numReviews: Math.floor(Math.random() * 100),
          featured: Math.random() > 0.7,
          seo: {
            slug: p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
          }
        }));

        await Product.insertMany(mapped);
      }
    } catch (error) {
      console.error('Error seeding products:', error);
    }
  }
}

export default ProductsController;
