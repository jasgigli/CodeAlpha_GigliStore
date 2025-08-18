import Category from "../models/Category.model.js";
import Product from "../models/Product.model.js";

class CategoriesController {
  static async getAll(req, res) {
    try {
      const categories = await Category.find({ isActive: true })
        .populate("subcategories")
        .sort({ sortOrder: 1, name: 1 });

      res.json({ success: true, data: categories });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  static async getById(req, res) {
    try {
      const category = await Category.findById(req.params.id)
        .populate("subcategories")
        .populate("parent");

      if (!category) {
        return res
          .status(404)
          .json({ success: false, message: "Category not found" });
      }

      res.json({ success: true, data: category });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  static async getBySlug(req, res) {
    try {
      const category = await Category.findOne({
        slug: req.params.slug,
      }).populate("subcategories");

      if (!category) {
        return res
          .status(404)
          .json({ success: false, message: "Category not found" });
      }

      res.json({ success: true, data: category });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  static async create(req, res) {
    try {
      // Generate slug if not provided
      if (!req.body.slug) {
        req.body.slug = req.body.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
      }

      const category = new Category(req.body);
      await category.save();

      res.status(201).json({ success: true, data: category });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  static async update(req, res) {
    try {
      const category = await Category.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );

      if (!category) {
        return res
          .status(404)
          .json({ success: false, message: "Category not found" });
      }

      res.json({ success: true, data: category });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  static async remove(req, res) {
    try {
      const category = await Category.findById(req.params.id);

      if (!category) {
        return res
          .status(404)
          .json({ success: false, message: "Category not found" });
      }

      // Check if category has products
      const productCount = await Product.countDocuments({
        category: category.name,
      });
      if (productCount > 0) {
        return res.status(400).json({
          success: false,
          message: "Cannot delete category with existing products",
        });
      }

      await Category.findByIdAndDelete(req.params.id);
      res.json({ success: true, message: "Category deleted successfully" });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  static async getTree(req, res) {
    try {
      const categories = await Category.find({ parent: null, isActive: true })
        .populate({
          path: "subcategories",
          match: { isActive: true },
          populate: {
            path: "subcategories",
            match: { isActive: true },
          },
        })
        .sort({ sortOrder: 1, name: 1 });

      res.json({ success: true, data: categories });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
}

export default CategoriesController;
