import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/AdminMenu.css";

const initialForm = {
  name: "",
  description: "",
  price: "",
  photo: null,
  photoPreview: "",
  category: "",
};

export default function AdminMenu() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [menuItems, setMenuItems] = useState([]);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:5000/api/menu")
      .then((res) => res.json())
      .then((data) => setMenuItems(data))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo" && files.length > 0) {
      setForm({
        ...form,
        photo: files[0],
        photoPreview: URL.createObjectURL(files[0]),
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("category", form.category);
    if (form.photo) formData.append("photo", form.photo);

    try {
      let res, newItem;
      if (editId) {
        res = await fetch(`http://localhost:5000/api/menu/${editId}`, {
          method: "PUT",
          body: formData,
        });
        newItem = await res.json();
        setMenuItems(
          menuItems.map((item) => (item._id === editId ? newItem : item))
        );
      } else {
        res = await fetch("http://localhost:5000/api/menu", {
          method: "POST",
          body: formData,
        });
        newItem = await res.json();
        setMenuItems([...menuItems, newItem]);
      }
      setForm(initialForm);
      setEditId(null);
    } catch (err) {
      alert("Error saving menu item: " + err.message);
    }
  };

  const handleEdit = (item) => {
    setForm({
      name: item.name,
      description: item.description,
      price: item.price,
      photo: null,
      photoPreview: item.photoUrl
        ? `http://localhost:5000${item.photoUrl}`
        : "",
      category: item.category || "",
    });
    setEditId(item._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this item?")) return;
    try {
      await fetch(`http://localhost:5000/api/menu/${id}`, { method: "DELETE" });
      setMenuItems(menuItems.filter((item) => item._id !== id));
      setForm(initialForm);
      setEditId(null);
    } catch (err) {
      alert("Error deleting menu item: " + err.message);
    }
  };

  const handleCancel = () => {
    setForm(initialForm);
    setEditId(null);
  };

  return (
    <div className="admin-fullscreen">
      <div className="admin-header concise" style={{ position: "relative" }}>
        <button
          className="admin-button logout-button"
          style={{
            position: "absolute",
            top: 24,
            right: 32,
            minWidth: 90,
            zIndex: 2,
          }}
          onClick={() => navigate("/login")}
        >
          Logout
        </button>
        <div className="admin-emoji">🍕</div>
        <h1 className="admin-title">Admin Menu Manager</h1>
        <p className="admin-subtitle">Manage your delicious pizza menu items</p>
        <div className="admin-nav-btns">
          <button
            className="admin-button"
            disabled={window.location.pathname.includes("/admin/menu")}
            onClick={() => navigate("/admin/menu")}
          >
            Manage Menu
          </button>
          <button
            className="admin-button"
            disabled={window.location.pathname.includes("/admin/users")}
            onClick={() => navigate("/admin/users")}
          >
            Manage Users
          </button>
        </div>
      </div>
      <div className="admin-content concise">
        {/* Left: Form */}
        <form onSubmit={handleSubmit} className="admin-form concise">
          <h2 className="form-title">{editId ? "Edit Menu Item" : "Add New Menu Item"}</h2>
          <div className="input-group">
            <label className="input-label">Item Name</label>
            <input
              name="name"
              placeholder="Enter menu item name"
              value={form.name}
              onChange={handleChange}
              required
              className="admin-input"
            />
          </div>
          <div className="input-group">
            <label className="input-label">Description</label>
            <textarea
              name="description"
              placeholder="Describe your delicious item"
              value={form.description}
              onChange={handleChange}
              required
              className="admin-textarea"
            />
          </div>
          <div className="input-group">
            <label className="input-label">Price (₱)</label>
            <input
              name="price"
              type="number"
              placeholder="0.00"
              value={form.price}
              onChange={handleChange}
              required
              className="admin-input"
              step="0.01"
              min="0"
            />
          </div>
          <div className="input-group">
            <label className="input-label">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className="admin-input"
            >
              <option value="">Select category</option>
              <option value="pizza">Pizza</option>
              <option value="appetizers">Appetizers</option>
              <option value="pasta">Pasta</option>
              <option value="dessert">Dessert</option>
            </select>
          </div>
          <div className="input-group">
            <label className="input-label">Photo</label>
            <input
              name="photo"
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="file-input"
            />
            {form.photoPreview && (
              <img
                src={form.photoPreview}
                alt="Preview"
                className="preview-image"
                style={{ marginTop: 8 }}
              />
            )}
          </div>
          <div className="button-group">
            <button type="submit" className="admin-button">
              {editId ? "Update Item" : "Add Item"}
            </button>
            {editId && (
              <button
                type="button"
                onClick={handleCancel}
                className="admin-button cancel-button"
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>
        {/* Right: Menu Items */}
        <div className="admin-menu-list concise">
          <h3 className="menu-items-title">Current Menu Items</h3>
          {loading ? (
            <div className="empty-state">
              <p>Loading...</p>
            </div>
          ) : menuItems.length === 0 ? (
            <div className="empty-state">
              <p>No menu items yet. Add your first delicious item above! 🍕</p>
            </div>
          ) : (
            <div className="admin-pizza-grid concise">
              {menuItems.map((item) => (
                <div key={item._id} className="admin-pizza-card concise">
                  <img
                    src={item.photoUrl ? `http://localhost:5000${item.photoUrl}` : ""}
                    alt={item.name}
                    className="admin-pizza-img"
                  />
                  <div className="admin-pizza-info">
                    <h4 className="admin-pizza-name">{item.name}</h4>
                    <span className="admin-pizza-price">
                      ₱{parseFloat(item.price).toFixed(2)}
                    </span>
                    <span className="admin-pizza-category">{item.category}</span>
                    <div className="admin-pizza-actions">
                      <button
                        onClick={() => handleEdit(item)}
                        className="edit-button"
                        style={{ marginRight: 8 }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="delete-button"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}