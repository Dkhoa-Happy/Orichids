import { useContext } from "react";
import { Link } from "react-router-dom";
import { Moon, Sun, User, Menu } from "lucide-react";
import { ThemeContext } from "@/ThemeContext";
import { UserAuth } from "@/configs/AuthConext";

import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";

export default function Header() {
  const { user, logOut } = UserAuth();
  const { theme, toggle, dark } = useContext(ThemeContext);

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <header
      className="bg-background border-b sticky top-0 z-50 p-5"
      style={{ backgroundColor: theme.backgroundColor, color: theme.color }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center w-40">
            <Link to="/" className="flex items-center space-x-2">
              <img
                src="src/assets/images/image-removebg-preview.png"
                alt="Orchids Logo"
                className="h-16 w-24"
              />
            </Link>
          </div>

          {/* Navigation and User Menu */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="gap-8 text-lg">
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/" className="text-lg font-medium">
                    Home
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/news" className="text-lg font-medium">
                    News
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-lg font-medium">
                  About
                </NavigationMenuTrigger>
                <NavigationMenuContent
                  className={`${
                    dark ? "bg-gray-800 text-white" : "bg-white text-black"
                  }`}
                >
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          to="/about"
                          className={`flex h-full w-full select-none flex-col justify-end rounded-md ${
                            dark
                              ? "bg-gray-700 text-white"
                              : "bg-gradient-to-b from-muted/50 to-muted"
                          } p-6 no-underline outline-none`}
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">
                            About Us
                          </div>
                          <p className="text-lg leading-tight text-muted-foreground">
                            Learn more about our passion for orchids and our
                            mission.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/natural"
                          className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors ${
                            dark
                              ? "bg-gray-600 text-white"
                              : "hover:bg-accent hover:text-accent-foreground"
                          } focus:bg-accent focus:text-accent-foreground`}
                        >
                          <div className="text-lg font-medium leading-none">
                            Origin
                          </div>
                          <p className="line-clamp-2 text-lg leading-snug text-muted-foreground">
                            Discover the special orchid velvets of our orchid
                            collection.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/contact"
                          className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors ${
                            dark
                              ? "bg-gray-600 text-white"
                              : "hover:bg-accent hover:text-accent-foreground"
                          } focus:bg-accent focus:text-accent-foreground`}
                        >
                          <div className="text-lg font-medium leading-none">
                            Contact Us
                          </div>
                          <p className="line-clamp-2 text-lg leading-snug text-muted-foreground">
                            Get in touch with our orchid experts.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggle}
              aria-label={`Switch to ${!dark ? "Dark" : "Light"} mode`}
            >
              {dark ? (
                <Sun className="h-14 w-14 text-yellow-300" />
              ) : (
                <Moon className="h-14 w-14" />
              )}
            </Button>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="h-14 w-14 cursor-pointer">
                    <AvatarImage
                      src={user.photoURL || undefined}
                      alt={user.displayName || "User avatar"}
                    />
                    <AvatarFallback>
                      {user.displayName?.[0] || <User className="h-4 w-4" />}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut}>
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                asChild
                size="sm"
                className="bg-pink-400 hover:bg-pink-700"
              >
                <Link to="/login">Sign in</Link>
              </Button>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
