import React, { useEffect, useState } from "react";
import api from "../api";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    countInStock: "",
  });
  const [formError, setFormError] = useState("");

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (err) {
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleEdit = (product) => {
    setEditing(product._id);
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      countInStock: product.countInStock,
    });
    setFormError("");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await api.delete(`/products/${id}`);
      fetchProducts();
    } catch {
      alert("Delete failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    try {
      if (editing) {
        await api.put(`/products/${editing}`, form);
      } else {
        await api.post("/products", form);
      }
      setEditing(null);
      setForm({
        name: "",
        description: "",
        price: "",
        category: "",
        countInStock: "",
      });
      fetchProducts();
    } catch (err) {
      setFormError(err.response?.data?.message || "Save failed");
    }
  };

  return (
    <div>
      <h2>Manage Products</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          type="number"
          min="0"
          required
        />
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
          required
        />
        <input
          name="countInStock"
          value={form.countInStock}
          onChange={handleChange}
          placeholder="Stock"
          type="number"
          min="0"
          required
        />
        <button type="submit">{editing ? "Update" : "Add"} Product</button>
        {editing && (
          <button
            type="button"
            onClick={() => {
              setEditing(null);
              setForm({
                name: "",
                description: "",
                price: "",
                category: "",
                countInStock: "",
              });
            }}
          >
            Cancel
          </button>
        )}
        {formError && <div className="text-red-500">{formError}</div>}
      </form>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <ul>
          {products.map((p) => (
            <li key={p._id}>
              <b>{p.name}</b> (${p.price}) - {p.category} | Stock:{" "}
              {p.countInStock}
              <button onClick={() => handleEdit(p)}>Edit</button>
              <button onClick={() => handleDelete(p._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
