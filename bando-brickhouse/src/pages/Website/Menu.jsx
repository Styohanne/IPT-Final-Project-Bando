import React, { useState, useEffect } from "react";
import "../../styles/Menu.css";

const categories = [
  { id: "pizza", name: "Pizzas", icon: "🍕" },
  { id: "appetizers", name: "Appetizers", icon: "🥗" },
  { id: "pasta", name: "Pasta", icon: "🍝" },
  { id: "dessert", name: "Desserts", icon: "🍰" }
];

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState("pizza");
  const [menuItems, setMenuItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/menu")
      .then((res) => res.json())
      .then((data) => setMenuItems(data));
  }, []);

  // Group items by category
  const itemsByCategory = categories.reduce((acc, cat) => {
    acc[cat.id] = menuItems.filter(item => item.category === cat.id);
    return acc;
  }, {});

  return (
    <div className="menu-page">
      {/* Hero Section */}
      <section className="menu-hero" style={{
        background: `url('https://scontent.fcrk4-2.fna.fbcdn.net/v/t39.30808-6/499528535_726547219709301_6856976483277737629_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=109&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGgd66uAB2uP62qyd4DABOLkXFgiXcsIkSRcWCJdywiRBTVWdBYu_upYVPcvj8r0kpYq16aXrthuGrpz6_Q_6zS&_nc_ohc=3hnsdo7M7lgQ7kNvwHbEBoN&_nc_oc=AdlXehVoxJdaVUmlLu4GFB_ygzeaqVb3jhMvkqn7NexC8umHLpApg0XUWKUtFSgBOUgWAg4ll92563yOesNVmPED&_nc_zt=23&_nc_ht=scontent.fcrk4-2.fna&_nc_gid=kb5--9NXPuxBz9g9128KGA&oh=00_AfIszHGSQujb8SCKzbDQNccw6BE_oXjXP4eaNA5KwSMlUA&oe=683F2E20')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100%",
        minHeight: "340px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        borderRadius: 0,
        overflow: "hidden"
      }}>
        <div className="menu-hero-content" style={{
          background: "rgba(0,0,0,0.45)",
          borderRadius: "18px",
          padding: "36px 32px",
          textAlign: "center",
          color: "#fff",
          boxShadow: "0 4px 32px rgba(0,0,0,0.18)"
        }}>
          <h1 className="menu-title">Our Menu</h1>
          <p className="menu-subtitle">Authentic Italian Flavors, Crafted with Love</p>
        </div>
      </section>

      {/* Category Navigation */}
      <nav className="category-nav">
        <div className="nav-container">
          <div className="category-buttons">
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                <span className="category-icon">{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Menu Section */}
      <section className="menu-section">
        <div className="menu-container">
          <h2 className="section-title fade-in">
            {categories.find(cat => cat.id === activeCategory)?.name}
          </h2>
          <div className="menu-grid fade-in">
            {itemsByCategory[activeCategory]?.length === 0 ? (
              <p style={{ gridColumn: "1/-1", textAlign: "center" }}>No items in this category yet.</p>
            ) : (
              itemsByCategory[activeCategory].map(item => (
                <div
                  key={item._id}
                  className="menu-item"
                  onClick={() => setSelectedItem(item)}
                  style={{ cursor: "pointer" }}
                  title="Click to view details"
                >
                  <img
                    src={item.photoUrl ? (item.photoUrl.startsWith("http") ? item.photoUrl : `http://localhost:5000${item.photoUrl}`) : ""}
                    alt={item.name}
                    className="menu-item-image"
                    style={{
                      width: "100%",
                      height: "220px",
                      objectFit: "cover",
                      borderRadius: "12px"
                    }}
                  />
                  <div className="menu-item-info">
                    <div className="item-header">
                      <h3 className="item-name">{item.name}</h3>
                      <span className="item-price">
                        ₱{parseFloat(item.price).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Modal for Item Details */}
      {selectedItem && (
        <div className="menu-modal" onClick={() => setSelectedItem(null)}>
          <div className="menu-modal-content" onClick={e => e.stopPropagation()}>
            <button className="menu-modal-close" onClick={() => setSelectedItem(null)}>
              &times;
            </button>
            <img
              src={
                selectedItem.photoUrl
                  ? (selectedItem.photoUrl.startsWith("http")
                      ? selectedItem.photoUrl
                      : `http://localhost:5000${selectedItem.photoUrl}`)
                  : ""
              }
              alt={selectedItem.name}
              className="menu-modal-image"
              style={{ width: "100%", maxWidth: 400, borderRadius: 12, marginBottom: 16 }}
            />
            <h2 style={{ marginBottom: 8 }}>{selectedItem.name}</h2>
            <span style={{ color: "#d2691e", fontWeight: "bold", fontSize: "1.2rem" }}>
              ₱{parseFloat(selectedItem.price).toFixed(2)}
            </span>
            <p style={{ marginTop: 16 }}>{selectedItem.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;