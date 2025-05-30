import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/AdminMenu.css";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const initialForm = {
  name: "",
  email: "",
  role: "",
  password: "",
};

export default function Users() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [users, setUsers] = useState([]);
  const [editId, setEditId] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch users from backend
  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:5000/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .finally(() => setLoading(false));
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Add or update user
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res, newUser;
      if (editId) {
        res = await fetch(`http://localhost:5000/api/users/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        newUser = await res.json();
        if (!res.ok) {
          alert(newUser.error || "Error updating user");
          return;
        }
        setUsers(users.map((u) => (u._id === editId ? newUser : u)));
      } else {
        res = await fetch("http://localhost:5000/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        newUser = await res.json();
        if (!res.ok) {
          alert(newUser.error || "Error adding user");
          return;
        }
        setUsers([...users, newUser]);
      }
      setForm(initialForm);
      setEditId(null);
    } catch (err) {
      alert("Error saving user: " + err.message);
    }
  };

  // Edit user
  const handleEdit = (user) => {
    setForm({
      name: user.name,
      email: user.email,
      role: user.role,
      password: "", // Don't show password when editing
    });
    setEditId(user._id);
  };

  // Delete user
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      await fetch(`http://localhost:5000/api/users/${id}`, { method: "DELETE" });
      setUsers(users.filter((u) => u._id !== id));
      setForm(initialForm);
      setEditId(null);
    } catch (err) {
      alert("Error deleting user: " + err.message);
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
        <div className="admin-emoji">👤</div>
        <h1 className="admin-title">User Manager</h1>
        <p className="admin-subtitle">Manage your users</p>
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
          <h2 className="form-title">{editId ? "Edit User" : "Add New User"}</h2>
          <div className="input-group">
            <label className="input-label">Name</label>
            <input
              name="name"
              placeholder="Enter user name"
              value={form.name}
              onChange={handleChange}
              required
              className="admin-input"
            />
          </div>
          <div className="input-group">
            <label className="input-label">Email</label>
            <input
              name="email"
              type="email"
              placeholder="Enter user email"
              value={form.email}
              onChange={handleChange}
              required
              className="admin-input"
            />
          </div>
          <div className="input-group">
            <label className="input-label">Role</label>
            <input
              name="role"
              placeholder="Enter user role"
              value={form.role}
              onChange={handleChange}
              required
              className="admin-input"
            />
          </div>
          <div className="input-group">
            <label className="input-label">Password</label>
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={form.password}
                onChange={handleChange}
                required={!editId}
                className="admin-input"
                style={{ flex: 1 }}
              />
              <InputAdornment position="end">
                <IconButton
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((v) => !v)}
                  edge="end"
                  size="small"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            </div>
          </div>
          <div className="button-group">
            <button type="submit" className="admin-button">
              {editId ? "Update User" : "Add User"}
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
        {/* Right: Users List */}
        <div className="admin-menu-list concise">
          <h3 className="menu-items-title">Current Users</h3>
          {loading ? (
            <div className="empty-state"><p>Loading...</p></div>
          ) : users.length === 0 ? (
            <div className="empty-state">
              <p>No users yet. Add your first user above! 👤</p>
            </div>
          ) : (
            <div className="admin-pizza-grid concise">
              {users.map((user) => (
                <div key={user._id} className="admin-pizza-card concise">
                  <div className="admin-pizza-info">
                    <h4 className="admin-pizza-name">{user.name}</h4>
                    <span className="admin-pizza-category">{user.role}</span>
                    <span className="admin-pizza-price">{user.email}</span>
                    <div className="admin-pizza-actions">
                      <button
                        onClick={() => handleEdit(user)}
                        className="cta-button primary edit-button"
                        style={{ marginRight: 8 }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="cta-button secondary delete-button"
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