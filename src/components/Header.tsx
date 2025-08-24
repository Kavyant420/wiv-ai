import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/SearchInput";
import { UserProfile } from "@/components/UserProfile";
import { Search, Bell, Gift } from "lucide-react";

const navigation = [
  { name: "Home", href: "#home", category: "home" },
  { name: "TV Shows", href: "#tv", category: "tv" },
  { name: "Movies", href: "#movies", category: "movies" },
  { name: "New & Popular", href: "#new", category: "new" },
  { name: "My List", href: "#list", category: "list" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [activeCategory, setActiveCategory] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-sm"
          : "bg-gradient-to-b from-black/80 via-black/40 to-transparent"
      }`}
    >
      <div className="flex items-center justify-between h-16 px-4 lg:px-16">
        {/* Logo & Navigation */}
        <div className="flex items-center space-x-8">
          <div className="text-netflix-red text-2xl lg:text-3xl font-black tracking-tight">
            PIKUFLIX
          </div>
          
          <nav className="hidden lg:flex items-center space-x-5">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => setActiveCategory(item.category)}
                className={`text-sm font-medium transition-colors duration-200 hover:text-foreground-muted ${
                  activeCategory === item.category
                    ? "text-white"
                    : "text-foreground-subtle"
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            {showSearch ? (
              <SearchInput 
                className="w-72" 
                onBlur={() => setShowSearch(false)}
                autoFocus
              />
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowSearch(true)}
                className="text-white hover:text-foreground-muted"
              >
                <Search className="h-5 w-5" />
              </Button>
            )}
          </div>

          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:text-foreground-muted relative"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-netflix-red rounded-full"></span>
          </Button>

          {/* Gift/Kids */}
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:text-foreground-muted hidden lg:flex"
          >
            <Gift className="h-5 w-5" />
          </Button>

          {/* User Profile */}
          <UserProfile />
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden border-t border-white/10 px-4 py-2">
        <div className="flex space-x-6 overflow-x-auto">
          {navigation.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveCategory(item.category)}
              className={`text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                activeCategory === item.category
                  ? "text-white"
                  : "text-foreground-subtle"
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
