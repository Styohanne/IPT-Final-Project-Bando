import React from "react";
import "../../styles/Dashboard.css";
import brickBg from "../../assets/brick.png"; // Adjust the path if needed

export default function Dashboard() {
  return (
    <div className="dashboard">
      {/* Hero Section */}
      <section
        className="hero"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${brickBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="hero-overlay">
          <div className="hero-content">
            <h1 className="hero-title">Brick Pizza House</h1>
            <p className="hero-subtitle">Authentic Wood-Fired Pizza Since Day One</p>
            <div className="hero-buttons">
              <button className="cta-button primary">Order Now</button>
              <button className="cta-button secondary">View Menu</button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>Our Story</h2>
              <p>
                At Brick Pizza House, we've been crafting authentic wood-fired pizzas with passion and tradition. 
                Our brick oven creates the perfect crispy crust while our fresh ingredients tell the story of 
                quality in every bite.
              </p>
              <p>
                From classic Margherita to our signature specialty pizzas, each creation is made with love 
                and served with pride. Come taste the difference that real brick oven cooking makes.
              </p>
            </div>
            <div className="about-image">
              <img src="https://scontent.fcrk2-2.fna.fbcdn.net/v/t39.30808-6/494999714_714958917534798_8646547693838631410_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeG7eJyupKluvg5KdgEO4QaywMyHFRfWtbXAzIcVF9a1ta7yFo8cFRG6IWYAteyBb8oqBuMwQdxxEB8gMd4mChhj&_nc_ohc=S4jG4rFv5ssQ7kNvwErOyrp&_nc_oc=AdnnyLWhOhw-GejLJsmp_0-YHhJPD6Mb9VCgBa2FDoLDcuRhUpdCOPBW2_c-wjEZ1HAUXtGcySwGCJae_OBZgP8m&_nc_zt=23&_nc_ht=scontent.fcrk2-2.fna&_nc_gid=m_J1kXvA1-p1iltuaJH1hw&oh=00_AfL1IcNmBA-DApovjl3mfPIW4X5u1j8wT3MpHPKyE4G6qw&oe=683CC57F" alt="Pizza being made" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Pizzas */}
      <section className="featured">
        <div className="container">
          <h2>Featured Pizzas</h2>
          <div className="pizza-grid">
            <div className="pizza-card">
              <img src="https://scontent.fcrk2-4.fna.fbcdn.net/v/t39.30808-6/485001636_679053771125313_872905919527649735_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFbVMpQQCgXshLeCAGS4_s1fnB_evNeibV-cH96816JtZRgl0ko_2UPpzWbC1ZO_1ZcOs_7g_AijFIsSsHf2g46&_nc_ohc=53xG3yvGgz8Q7kNvwE6DlEo&_nc_oc=AdmNOqIEyP9emY9PRvInmE1tItC_CLouT8ZivZ8VySA5dkjVw3pf43RBCJhLhbfloYEBUy49uLKXLKJtSaIGUoEx&_nc_zt=23&_nc_ht=scontent.fcrk2-4.fna&_nc_gid=6g49lfMEQd1A-QyXOovxcw&oh=00_AfJASGsWI3EaIiuDo7R4o3BLR8ypb7aOYIHydN98XR2AOg&oe=683CF8A2" />
              <div className="pizza-info">
                <h3>Margherita</h3>
                <p>Known for its history of a lady belonging to a nobility class, Tomato sauce and mozzarella cheese</p>
                <span className="price">₱390</span>
              </div>
            </div>
            <div className="pizza-card">
              <img src="https://scontent.fcrk2-2.fna.fbcdn.net/v/t39.30808-6/484319042_679053747791982_1412460952128201089_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeH9sYhtkz1ZSrT_Iz6ooTkZr5WNXGTqbhGvlY1cZOpuEeONhL-lHjMcQC12IlV29ZOe4lYBMZWCZtubW1hW5G4e&_nc_ohc=L83zQtqLgvcQ7kNvwHQykGu&_nc_oc=Adlj8lgjVSOrXzc5k3rycKN22vejnA7waZL9T9XM5JGOKy-sdl8UtZO6J18Vo9FaBNWRE5Z9Z5-PLx2JMz7NfMOf&_nc_zt=23&_nc_ht=scontent.fcrk2-2.fna&_nc_gid=CUtq_04wmzlY0dMZYtIc2w&oh=00_AfK3O7jJ8Sq4m3Q11K7ANt7cWiwyr18g8k0nRphYKTudHw&oe=683CCF8C" />
              <div className="pizza-info">
                <h3>Pepperoni</h3>
                <p>Oh! This has always been a favorite and so popular</p>
                <span className="price">465</span>
              </div>
            </div>
            <div className="pizza-card">
              <img src="https://scontent.fcrk2-4.fna.fbcdn.net/v/t39.30808-6/486096918_682924370738253_295118607564497200_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=101&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEYEeFueTwj84YrqW7e0V-hekBRfoDlA696QFF-gOUDr5WalCCS0CuiFFCyiw-_rOqfNHReIjUR-nmzfadtCFRr&_nc_ohc=-mZsj12CSFUQ7kNvwECoLLu&_nc_oc=AdkGmy8-DSaQb_cpKOeXf2TJ5KWlWlUSAjzwmDG5rUT53DkimxwgMqpIv9DwKt8kYmN1mdWKhr3WJ-gD_Wwwadkh&_nc_zt=23&_nc_ht=scontent.fcrk2-4.fna&_nc_gid=yK3i8DwEVpwR73zAWqIZ0g&oh=00_AfJJXTiaZhSXkYUzE-YbRWnkVRHY7jZkBho7zd-1eHKgDA&oe=683CCD22" />
              <div className="pizza-info">
                <h3>Brick Pizza</h3>
                <p>Vegies, meat, topped with ourt available home grown herbs</p>
                <span className="price">₱560</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="features">
        <div className="container">
          <h2>Why Choose Brick Pizza House?</h2>
          <div className="features-grid">
            <div className="feature">
              <div className="feature-icon">🔥</div>
              <h3>Wood-Fired Authentic</h3>
              <p>Our traditional brick oven creates the perfect crispy crust with that distinctive smoky flavor</p>
            </div>
            <div className="feature">
              <div className="feature-icon">🍅</div>
              <h3>Fresh Ingredients</h3>
              <p>We source the finest local and imported ingredients for authentic Italian taste</p>
            </div>
            <div className="feature">
              <div className="feature-icon">👨‍🍳</div>
              <h3>Expert Craftsmanship</h3>
              <p>Our experienced pizza makers have perfected the art of traditional pizza making</p>
            </div>
            <div className="feature">
              <div className="feature-icon">⚡</div>
              <h3>Fast Service</h3>
              <p>Quick preparation without compromising on quality - perfect for dine-in or takeout</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Location */}
      <section className="contact">
        <div className="container">
          <div className="contact-content">
            <div className="contact-info">
              <h2>Visit Us Today</h2>
              <div className="contact-details">
                <div className="contact-item">
                  <strong>📍 Address:</strong>
                  <p>Gaddang, Solano, 3709<br />Nueva Vizcaya, Philippines</p>
                </div>
                <div className="contact-item">
                  <strong>📞 Phone:</strong>
                  <p>(+63) 15-018-0899</p>
                </div>
                <div className="contact-item">
                  <strong>🕒 Hours:</strong>
                  <p>Monday - Sunday<br />Closed on Tuesdays<br />11:00 AM - 9:00 PM</p>
                </div>
              </div>
            </div>
            <div className="restaurant-image">
              <img src="https://scontent.fcrk4-1.fna.fbcdn.net/v/t39.30808-6/482220355_676085411422149_1008108455453182938_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=f727a1&_nc_eui2=AeEvJhV694gHewmHWHb2d209FoPDhS1mQFcWg8OFLWZAV03vEOqoig1hszTtAfaBQz0Of0_jZdoKvabVWzh-uVHQ&_nc_ohc=BgyWaH19RfMQ7kNvwGMqZk4&_nc_oc=AdnrwVRfx545aKyi6DFDg2abyvI2muN92nc7YJuE6frjnRfzyFJk-H8j6bBlsyeOYeivcOxH82NsgS4aAwRC5k2b&_nc_zt=23&_nc_ht=scontent.fcrk4-1.fna&_nc_gid=H6JzwBjynVJKkTkejkZAUw&oh=00_AfJg4oiPppVFVMPNZX_hnCZyCZorNskn8pMKu9YDdze44g&oe=683CEC49" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Brick Pizza House</h3>
              <p>Authentic wood-fired pizza made with passion</p>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#menu">Menu</a></li>
                <li><a href="#about">About Us</a></li>
                <li><a href="#contact">Contact</a></li>
                <li><a href="#order">Order Online</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Follow Us</h4>
              <div className="social-links">
                <a href="#" className="social-link">Facebook</a>
                <a href="#" className="social-link">Instagram</a>
                <a href="#" className="social-link">Twitter</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 Brick Pizza House. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}