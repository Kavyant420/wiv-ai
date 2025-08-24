import { Button } from "@/components/ui/button";
import { ChevronDown, User, Settings, HelpCircle, LogOut } from "lucide-react";

export function UserProfile() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const user = {
    name: "User",
    avatar: null,
  };

  const profiles = [
    { name: "User", avatar: null, isKids: false },
    { name: "Kids", avatar: null, isKids: true },
  ];

  const menuItems = [
    { label: "Manage Profiles", href: "#" },
    { label: "Account", href: "#" },
    { label: "Help Center", href: "#" },
  ];

  return (
    <div className="relative">
      <Button
        variant="ghost"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center space-x-2 text-white hover:text-white p-0 h-auto"
      >
        <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center text-white text-sm font-medium">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-full h-full rounded object-cover"
            />
          ) : (
            <User className="h-4 w-4" />
          )}
        </div>
        <ChevronDown className={`h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
      </Button>

      {isDropdownOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsDropdownOpen(false)}
          />
          <div className="absolute right-0 top-full mt-1 w-56 bg-black/90 border border-white/20 rounded-sm shadow-lg z-20 backdrop-blur-sm">
            {/* Profiles Section */}
            <div className="p-4 border-b border-white/20">
              {profiles.map((profile, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 py-2 cursor-pointer hover:underline text-white text-sm"
                >
                  <div className={`w-8 h-8 rounded ${profile.isKids ? 'bg-yellow-500' : 'bg-blue-600'} flex items-center justify-center text-white text-xs font-medium`}>
                    {profile.avatar ? (
                      <img
                        src={profile.avatar}
                        alt={profile.name}
                        className="w-full h-full rounded object-cover"
                      />
                    ) : (
                      <User className="h-4 w-4" />
                    )}
                  </div>
                  <span>{profile.name}</span>
                </div>
              ))}
            </div>

            {/* Menu Items */}
            <div className="py-2">
              {menuItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="block px-4 py-2 text-sm text-white hover:underline"
                >
                  {item.label}
                </a>
              ))}
            </div>
            
            <div className="border-t border-white/20 py-2">
              <buttonclassName="block w-full text-left px-4 py-2 text-sm text-white hover:underline">
                Sign out of Netflix
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
