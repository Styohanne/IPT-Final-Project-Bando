import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/AdminMenu.css";

const initialForm = {
  name: "",
  description: "",
  price: "",
  photo: null,
  photoPreview: "",
};

export default function AdminMenu() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [menuItems, setMenuItems] = useState([]);
  const [editId, setEditId] = useState(null);

  // Fetch menu items from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/menu")
      .then((res) => res.json())
      .then((data) => setMenuItems(data));
  }, []);

  // Handle input changes
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

  // Add or update menu item
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("price", form.price);
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

  // Edit menu item
  const handleEdit = (item) => {
    setForm({
      name: item.name,
      description: item.description,
      price: item.price,
      photo: null,
      photoPreview: item.photoUrl
        ? `http://localhost:5000${item.photoUrl}`
        : "",
    });
    setEditId(item._id);
  };

  // Delete menu item
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
    <div className="admin-menu-container">
      <div className="admin-card">
        {/* Header */}
        <div className="admin-header">
          <div className="admin-emoji">🍕</div>
          <h1 className="admin-title">Admin Menu Manager</h1>
          <p className="admin-subtitle">Manage your delicious pizza menu items</p>
        </div>

        {/* Navigation buttons - place here */}
        <div style={{
  display: "flex",
  justifyContent: "center",
  gap: "16px",
  margin: "24px 0 12px 0"
}}>
  <button
    className="admin-button"
    style={{ minWidth: 120, background: window.location.pathname.includes("/admin/menu") ? "#f0f0f0" : undefined, color: window.location.pathname.includes("/admin/menu") ? "#333" : undefined }}
    disabled={window.location.pathname.includes("/admin/menu")}
    onClick={() => !window.location.pathname.includes("/admin/menu") && navigate("/admin/menu")}
  >
    Manage Menu
  </button>
  <button
    className="admin-button"
    style={{ minWidth: 120, background: window.location.pathname.includes("/admin/users") ? "#f0f0f0" : undefined, color: window.location.pathname.includes("/admin/users") ? "#333" : undefined }}
    disabled={window.location.pathname.includes("/admin/users")}
    onClick={() => !window.location.pathname.includes("/admin/users") && navigate("/admin/users")}
  >
    Manage Users
  </button>
</div>

        {/* Form Section */}
        <div className="admin-form-container">
          <h2 className="form-title">
            {editId ? "Edit Menu Item" : "Add New Menu Item"}
          </h2>
          <form onSubmit={handleSubmit} className="admin-form">
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
        </div>

        <hr className="section-divider" />

        {/* Menu Items Section */}
        <div className="menu-items-container">
          <h3 className="menu-items-title">Current Menu Items</h3>
          {menuItems.length === 0 ? (
            <div className="empty-state">
              <p>No menu items yet. Add your first delicious item above! 🍕</p>
            </div>
          ) : (
            <ul className="menu-items-list">
              {menuItems.map((item) => (
                <li key={item._id} className="menu-item">
                  <h4 className="item-name">{item.name}</h4>
                  <p className="item-price">₱{parseFloat(item.price).toFixed(2)}</p>
                  <p className="item-description">{item.description}</p>
                  {item.photoUrl && (
                    <img
                      src={`http://localhost:5000${item.photoUrl}`}
                      alt={item.name}
                      className="item-image"
                      style={{ margin: "8px 0" }}
                    />
                  )}
                  <div className="item-actions">
                    <button
                      onClick={() => handleEdit(item)}
                      className="admin-button edit-button"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="admin-button delete-button"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}