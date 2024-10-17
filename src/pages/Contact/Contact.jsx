import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";
import { ThemeContext } from "@/ThemeContext";
import { useContext } from "react";

export default function ContactUs() {
  const { theme, toggle, dark } = useContext(ThemeContext);
  return (
    <div className="min-h-screen bg-gray-100 bg-gradient-to-b from-purple-100 to-white">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1
            className="text-3xl font-bold text-gray-900"
            style={{
              backgroundColor: theme.backgroundColor,
              color: theme.color,
            }}
          >
            Contact Us
          </h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/2">
                <form className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Name
                    </label>
                    <Input id="name" name="name" required className="mt-1" />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      className="mt-1"
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              </div>
              <div className="md:w-1/2 space-y-4">
                <div className="bg-white p-6 rounded-lg shadow">
                  <h2 className="text-xl font-semibold mb-4">
                    Contact Information
                  </h2>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Mail
                        className="h-5 w-5 text-gray-400 mr-2"
                        aria-label="Email"
                      />
                      <span>contact@example.com</span>
                    </div>
                    <div className="flex items-center">
                      <Phone
                        className="h-5 w-5 text-gray-400 mr-2"
                        aria-label="Phone"
                      />
                      <span>+1 (555) 123-4567</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin
                        className="h-5 w-5 text-gray-400 mr-2"
                        aria-label="Address"
                      />
                      <span>123 Example Street, City, Country</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <h2 className="text-xl font-semibold mb-4">Our Location</h2>
                  <div className="aspect-w-16 aspect-h-9">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4867.094292753151!2d106.79814837591871!3d10.875131189279744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d8a6b19d6763%3A0x143c54525028b2e!2sVNUHCM%20Student%20Cultural%20House!5e1!3m2!1sen!2s!4v1727799889906!5m2!1sen!2s"
                      width="500"
                      height="450"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      aria-label="Our Location on Map"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
