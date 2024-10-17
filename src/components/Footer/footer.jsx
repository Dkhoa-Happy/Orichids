import { useContext } from "react";
import "./footer.scss";
import { ThemeContext } from "../../ThemeContext";

export default function Footer() {
  const { theme, toggle, dark } = useContext(ThemeContext);

  return (
    <footer
      className="footer"
      style={{
        backgroundColor: theme.backgroundColor,
        color: theme.color,
      }}
    >
      <div className="footer-content">
        <div className="footer-section about">
          <h3>About Us</h3>
          <p>
            We are dedicated to providing the best service for your orchid
            needs. From consultation to purchasing, we are here to help.
          </p>
        </div>
        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/services">Services</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </div>
        <div className="footer-section contact">
          <h3>Contact Us</h3>
          <p>Email: thanhdcse182567@fpt.edu.vn</p>
          <p>Phone: +123 456 7890</p>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Orchids | All Rights Reserved
      </div>
    </footer>
  );
}
