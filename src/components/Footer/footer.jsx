import { useContext } from "react";
import { ThemeContext } from "../../ThemeContext";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Flower, Home, Info, Mail, MessageSquare, Phone } from "lucide-react";
import { Separator } from "../ui/separator";

export default function Footer() {
  const { theme, toggle, dark } = useContext(ThemeContext);

  return (
    <footer
      className="bg-background text-foreground py-12 px-4 md:px-8"
      style={{ backgroundColor: theme.backgroundColor, color: theme.color }}
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">About Us</h3>
            <p className="text-muted-foreground">
              We are dedicated to providing the best service for your orchid
              needs. From consultation to purchasing, we are here to help.
            </p>
            <div className="flex space-x-4">
              <Button variant="outline" size="icon">
                <Flower className="h-4 w-4" />
                <span className="sr-only">Orchid icon</span>
              </Button>
              <Button variant="outline" size="icon">
                <Mail className="h-4 w-4" />
                <span className="sr-only">Email us</span>
              </Button>
              <Button variant="outline" size="icon">
                <Phone className="h-4 w-4" />
                <span className="sr-only">Call us</span>
              </Button>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="flex items-center hover:text-primary transition-colors"
                >
                  <Home className="h-4 w-4 mr-2" />
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="flex items-center hover:text-primary transition-colors"
                >
                  <Flower className="h-4 w-4 mr-2" />
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="flex items-center hover:text-primary transition-colors"
                >
                  <Info className="h-4 w-4 mr-2" />
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="flex items-center hover:text-primary transition-colors"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Contact Us</h3>
            <p className="flex items-center text-muted-foreground">
              <Mail className="h-4 w-4 mr-2" />
              thanhdcse182567@fpt.edu.vn
            </p>
            <p className="flex items-center text-muted-foreground">
              <Phone className="h-4 w-4 mr-2" />
              +123 456 7890
            </p>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Orchids | All Rights Reserved
        </div>
      </div>
    </footer>
  );
}
