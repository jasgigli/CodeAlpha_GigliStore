import axios from "axios";
import fs from "fs";
import path from "path";
import Product from "../models/Product.model.js";

class ProductsController {
  static async getAll(req, res) {
    try {
      let products = await Product.find();
      if (products.length > 0) {
        return res.json(products);
      }
      // If DB is empty, load from products.json
      const filePath = path.resolve(process.cwd(), "products.json");
      const fileData = fs.readFileSync(filePath, "utf-8");
      const jsonProducts = JSON.parse(fileData);
      // Map fields to match Product model
      const mapped = jsonProducts.map((p) => ({
        name: p.title, // map 'title' to 'name'
        description: p.description,
        price: p.price,
        image: p.image,
        category: p.category,
        countInStock: 10, // default stock
        rating: p.rating || 4, // import rating
      }));
      // Insert into MongoDB
      await Product.insertMany(mapped);
      // Fetch again to return with _id
      products = await Product.find();
      return res.json(products);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async getById(req, res) {
    try {
      const product = await Product.findById(req.params.id);
      if (product) return res.json(product);
      // Fallback: fetch from dummyjson.com
      const { data } = await axios.get(
        `https://dummyjson.com/products/${req.params.id}`
      );
      if (data && data.id) {
        const mapped = {
          id: data.id,
          title: data.title,
          description: data.description,
          price: data.price,
          image: data.thumbnail || (data.images && data.images[0]) || "",
          category: data.category,
          rating: data.rating,
        };
        return res.json(mapped);
      }
      res.status(404).json({ message: "Product not found" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async create(req, res) {
    try {
      const product = new Product(req.body);
      await product.save();
      res.status(201).json(product);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  static async update(req, res) {
    try {
      const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!product)
        return res.status(404).json({ message: "Product not found" });
      res.json(product);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  static async remove(req, res) {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product)
        return res.status(404).json({ message: "Product not found" });
      res.json({ message: "Product deleted" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

export default ProductsController;
